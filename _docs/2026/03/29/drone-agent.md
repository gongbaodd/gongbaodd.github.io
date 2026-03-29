---
type: post
category: tech
series:
    name: Master Thesis
    slug: master
    number: 2
---

# Drone Agent, a PID implementation

Proportional integral derivative (PID) is a type of controller that is most commonly used and applied in mechanical systems (Idrissi et al., 2022).

The controller consists of three main components:

* Proportional ($K_p$): Acts like a virtual spring that pulls the system toward the desired position; the control action increases as the error gets larger.

* Integral ($K_i$): Accumulates the error over time to eliminate steady-state error, ensuring the drone reaches the exact target even in the presence of disturbances like gravity.

* Derivative ($K_d$): Acts as a virtual damper to reduce oscillations and prevent the system from overshooting its target.

$$u(t) = K_p e(t) + K_i \int e(t) dt + K_d \frac{de(t)}{dt}$$

The goal of this chapter is to implement a closed-loop mission controller. it turns **world-frame goals** (position on a path, altitude, yaw) into **RC-style stick commands** that the existing **Yue drone physics** already understands.

![Path Design](https://res.cloudinary.com/dmq8ipket/image/upload/v1774818351/image_dnjbva.png)

The drone will take off in the green point, and fly to the red waypoint, then turn back, the path will be a bezier curve.

>>>

## What this folder implements

The PID folder is a **closed-loop mission controller**: it turns **world-frame goals** (position on a path, altitude, yaw) into **RC-style stick commands** that the existing **Yue drone physics** already understands. It does **not** replace the flight model; it sits **above** `YueInputModule` / `YueDronePhysics` via `PIDDroneEmulator`.

**Data flow (paper-friendly):**

`TeardropPathGenerator` → polyline → `PathFollower` (lookahead target) → `DronePIDFlightController` (PIDs → sticks) → `PIDDroneEmulator` → `YueInputModule` → `YueDronePhysics`.

So “PID mode” here means: **the agent’s policy is explicitly a stack of PID loops + path geometry**, not a learned policy.

---

## 1. `PIDController.cs` — baseline discrete PID

- **Inputs:** error \(e(t)\), `deltaTime`.
- **Terms:** standard P, I (with **integral clamp** `maxIntegral`), D on **error derivative** \((e_k - e_{k-1})/\Delta t\) with first-frame guard.
- **Output:** clamped to `maxOutput`; `Reset()` and `ClearIntegral()` for phase changes / anti-windup near setpoint.

This is the **mathematical core** you can cite as “implemented PID with output saturation and integral limiting.”

---

## 2. `DronePIDFlightController.cs` — the “agent” behavior

**Execution order:** `[DefaultExecutionOrder(-100)]` so it tends to run **early** and publish stick targets before other scripts consume them.

**Flight phases:** `Idle` → `TakeOff` → `FollowPath` → `Landing` → `Complete`.  
`StartMission()` sets takeoff target, resets PIDs, and advances phases when distance thresholds are met.

**Two control modes:**

| Phase | Control |
|--------|--------|
| Takeoff / Landing | **Position PID only** (`ApplyPositionPidSticks`): errors in X, Y, Z → roll/pitch/throttle sticks (after scaling by each PID’s `maxOutput`). |
| Follow path | **Cascade PID** (`ApplyCascadePidSticks`): outer loop (position error) → **desired velocity**; inner loop (velocity error in body frame) → **attitude sticks**. Horizontal desired velocity is **capped** by `cruiseSpeed`. |

**Axes mapping (important for the paper):**

- World **X** error → inner loop “side” → **roll** stick (`pidVx` on lateral velocity error).
- World **Z** error → “along” forward → **pitch** stick (`pidVz` on forward velocity error).
- **Altitude** → `pidVy` on vertical velocity error → **throttle** (via `SignedThrottleToLeftVertical01`: maps roughly −1..1 PID units to 0..1 stick, 0.5 = neutral/hover conceptually).

**Yaw:** When horizontal speed is non-trivial, yaw tracks **velocity direction** in the XZ plane (`ApplyYawStick` + `pidYaw` on `Mathf.DeltaAngle`).

**Altitude anti-windup:** Near the altitude setpoint (`altitudeIntegralDeadband`), `pidY.ClearIntegral()`; when still **below** target, vertical PID output is **floored at 0** so damping does not command “down throttle” while climbing.

**Property `IsPidDrivingInputs`:** true during TakeOff, FollowPath, Landing — this is what `PIDDroneEmulator` uses to decide **autopilot vs keyboard**.

---

## 3. `PathFollower.cs` — path tracking (not PID)

- Maintains a **polyline**; each frame finds a **closest segment point** with **limited backward search** (`closestPointSearchBack`) for lateral recovery.
- **Tie-breaking** when start and end share the same XZ (teardrop returns home): uses `maxPathIndexVisited` and `tiePreferHigherAfterPathFraction` so the drone does not **snap to the end** right after takeoff.
- **Lookahead:** walks forward along the polyline until **arc length** ≥ `lookAheadDistance` → **pure pursuit–style** target (a classic reference for papers).
- **Completion:** near last point, above `minCompletionPathFraction` of indices visited, within `pathCompleteThreshold`.

For a paper: PID stabilizes **toward a moving point**; path geometry + lookahead define **the reference**, not the PID block itself.

---

## 4. `TeardropPathGenerator.cs` — reference trajectory

- Builds a **teardrop** from `homePoint` → `waypointTarget` → back to home using **two cubic Bézier segments** (outbound right bulge, return left bulge).
- Parameters: `widthRatio`, `bulgePosition`, sampling `pointsPerSegment` / `sampleStride`.
- `DronePIDFlightController` then **sets path altitude** to current height (`AdjustPathAltitude`) so the path is essentially **2D in XZ** at cruise altitude.

---

## 5. `PIDDroneEmulator.cs` — glue (“agent interface”)

- If `preferPidMissionInputs` and `IsPidDrivingInputs`, copies `DronePIDFlightController` outputs into `YueInputModule`.
- **Throttle mapping:** `OutRawLeftVertical` is 0..1; converted to `rawLeftVertical` in −1..1 as `2 * value - 1` to match `YueInputModule` expectations.
- Otherwise **keyboard** axes drive the same module (manual / baseline).

So “PID mode” = **same actuation path as human input**, different **signal source** — good for comparing **rule-based autopilot vs manual** or vs **other agents** (e.g. RL) in the same simulator.

---

## 6. `DroneDebugUI.cs` — runtime experiment UI

- Starts mission, shows height and path progress, optional **live Kp/Ki/Kd** sliders for `pidX` / `pidY` — useful to describe **tuning methodology** or ablation in a paper.

---

## Angles for your paper

1. **Hierarchical control:** mission phases; **cascade** position→velocity→attitude during path follow; **SISO** PIDs per axis with explicit saturation.
2. **Reference generation:** Bézier teardrop + lookahead follower; known limitation: **no explicit path curvature feedforward** (only point tracking).
3. **Practical robustness:** integral deadband/clear on altitude, velocity cap, tie logic on closed paths.
4. **“Agent” framing:** the **policy** is deterministic, interpretable, and **parameterized** (gains, lookahead, speeds) — contrast with learned policies where gains are implicit in weights.
5. **Evaluation hooks:** distance to lookahead point, phase transitions, `PathFollower.GetProgress()`, plus physics from `YueDronePhysics`.

If you want, the next step is a **short “Methods” subsection** in paper style (equations + one diagram of the cascade) tailored to your venue (robotics vs simulation vs education).

---

Lynch, K. M., & Park, F. C. (2017). Modern Robotics: Mechanics, Planning, and Control (1st ed.). Cambridge University Press. https://doi.org/10.1017/9781316661239
