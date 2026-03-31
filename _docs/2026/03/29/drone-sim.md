---
type: post
category: tech
series:
    name: Master Thesis
    slug: master
    number: 1
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1774817120/44436976-4ccd-407e-ad8e-64fae8094b38_dlyfmx.webp
    alt: Yue's Ultimate Drone
tag:
  - Unity
  - drone
---

# Implementation of Drone Physics: A Case Study of Yue’s Ultimate Drone

This section examines the flight dynamics and control implementation found in the *Yue’s Ultimate Drone* physics model. The system architecture separates pilot input normalization from the underlying Proportional-Derivative (PD) control loops.

![Yue's Ultimate Drone](https://res.cloudinary.com/dmq8ipket/image/upload/v1774817120/44436976-4ccd-407e-ad8e-64fae8094b38_dlyfmx.webp)

## 1. Control Input and Joystick Shaping

The flight controller distinguishes between **unipolar** throttle inputs and **bipolar** command sticks (Roll, Pitch, and Yaw):

* **Throttle ($T$):** Mapped to a normalized range of $[0, 1]$.
* **Attitude Commands ($\theta, \phi, \psi$):** Mapped to a range of $[-1, 1]$.

To refine the pilot's control over the aircraft, the system utilizes a non-linear control curve for joystick calculation. As Lovesay (2003) observes:

> A good quality force tracking controller has a linear output, with joystick force directly proportional to sight velocity, but many systems shape the joystick voltage output, to achieve fine control and greater tracking accuracy as the joystick output approaches zero, whilst retaining the same maximum output capability.

In this implementation, "shaping" is achieved by combining proportional ($p$) and exponential ($e$) components to calculate the target angular rate ($\tau$) from the raw angular rate ($u$):

$$\tau = p \cdot u + e \cdot \text{sgn}(u) \cdot u^{2}$$

### 1.1 Axis Transformations

The specific rates for the rotational axes are calculated as follows:

* **Yaw Rate ($\tau_\psi$):** $\tau_\psi = p \cdot u_\psi + e \cdot \text{sgn}(u_\psi) \cdot u_\psi^{2}$
* **Roll Rate ($\tau_\phi$):** $\tau_\phi = p \cdot u_\phi + e \cdot \text{sgn}(u_\phi) \cdot u_\phi^{2}$
* **Pitch Rate ($\tau_\theta$):** $\tau_\theta = p \cdot u_\theta + e \cdot \text{sgn}(u_\theta) \cdot u_\theta^{2}$

The raw gamepad throttle $u_T \in [-1, 1]$ is normalized to a linear thrust scalar:

$$T = \frac{u_T + 1}{2}$$

## 2. Flight Modes and Orientation Logic

Since the Unity engine utilizes the FixedUpdate method for physics calculations, the drone's target orientation is updated discretely at every physics timestep ($\Delta t$).

### 2.1 Acro Mode

In Acro mode, the joystick inputs command the angular rate of change. The drone's target orientation $q_{\text{target}}$ is an accumulation of these rates over time. The orientation is updated by integrating the processed angular rates ($\tau_\phi, \tau_\theta, \tau_\psi$):

$$q_{\Delta} = \text{Quaternion.Euler}(\tau_\theta \Delta t, \tau_\phi \Delta t, \tau_\psi \Delta t)$$
$$q_{\text{target}, k} = q_{\text{target}, k-1} \cdot q_{\Delta}$$

### 2.2 Self-Leveling Mode

In Self-Leveling mode, intended to prevent crashing and ease navigation, the pitch and roll sticks command a specific angle rather than a rate. Given a predefined maximum bank angle for pitch ($\theta_{\max}$) and roll ($\phi_{\max}$), the target values are calculated as:

$$\theta_{\text{target}} = u_\theta \cdot \theta_{\max}, \quad \phi_{\text{target}} = u_\phi \cdot \phi_{\max}$$

The yaw axis typically remains in rate-integration mode to allow for continuous 360-degree rotation:

$$
q_{\text{target}} =  \text{Quaternion.Euler}(\tau_\theta \cdot \theta_{\max}, \tau_\phi \cdot \phi_{\max}, \tau_\psi \Delta t)
$$

## 3. Physics Calculation and PD Torque

The simulation applies two primary vectors to the drone's `Rigidbody`: `appliedForce` (Thrust) and `appliedTorque` (Attitude Control).

### 3.1 Thrust

The total thrust force $\mathbf{F}_{\text{thrust}}$ is applied along the vehicle's local "up" vector ($\hat{\mathbf{u}}_{\text{up}}$). The magnitude is governed by the throttle $T$ and the maximum thrust constant $F_{\max}$:

$$\mathbf{F}_{\text{thrust}} = (T \cdot F_{\max}) \cdot \hat{\mathbf{u}}_{\text{up}}$$

### 3.2 PD Control

Proportional integral derivative (PID) is a type of controller that is most commonly used and applied in mechanical systems (Idrissi et al., 2022).

The controller consists of three main components:

* Proportional ($K_p$): Acts like a virtual spring that pulls the system toward the desired position; the control action increases as the error gets larger.

* Integral ($K_i$): Accumulates the error over time to eliminate steady-state error, ensuring the drone reaches the exact target even in the presence of disturbances like gravity.

* Derivative ($K_d$): Acts as a virtual damper to reduce oscillations and prevent the system from overshooting its target.

$$u(t) = K_p e(t) + K_i \int e(t) dt + K_d \frac{de(t)}{dt}$$

![Comparison of PID and PD](https://res.cloudinary.com/dmq8ipket/image/upload/v1774817054/image_m87sc3.png)

For basic flight stabilization where the full dynamic behavior of the plant is not realized, a simple PD action can provide satisfactory performance

### 3.3 Attitude Control

The error between the target orientation $q_{\text{target}}$ and the current body orientation $q_{\text{body}}$ is defined as:

$$\Delta q = q_{\text{target}} \cdot q_{\text{body}}^{-1}$$

Using Unity’s `ToAngleAxis` method, this relative rotation is converted into an angle $\phi$ and an axis $\mathbf{n}$. The error vector $\mathbf{e}$ is then:

$$\mathbf{e} = \phi \cdot \mathbf{n}$$

The controller applies a PD loop (Proportional-Derivative) to generate corrective torque.

$$\boldsymbol{\tau}_{\text{world}} = K_p \cdot \mathbf{e} + K_d \cdot \frac{\mathbf{e} - \mathbf{e}_{k-1}}{\Delta t}$$

Finally, the world-space torque is transformed into the body frame ($R_{\text{wb}}$) for the physics simulation:

$$\boldsymbol{\tau}_{\text{body}} = R_{\text{wb}} \cdot \boldsymbol{\tau}_{\text{world}}$$

---

Yuetility-Studios. (2022). Yue Ultimate FPV Drone Physics (Version 1.0) [Computer software]. Unity Asset Store. https://assetstore.unity.com/packages/tools/physics/yue-ultimate-fpv-drone-physics-231651

Lovesay, E. J. (Ed.). (2003). Contemporary ergonomics 1993. CRC Press.

Idrissi, M., Salami, M., & Annaz, F. (2022). A Review of Quadrotor Unmanned Aerial Vehicles: Applications, Architectural Design and Control Algorithms. Journal of Intelligent & Robotic Systems, 104(2), 22. https://doi.org/10.1007/s10846-021-01527-7

Lynch, K. M., & Park, F. C. (2017). Modern Robotics: Mechanics, Planning, and Control (1st ed.). Cambridge University Press. https://doi.org/10.1017/9781316661239
