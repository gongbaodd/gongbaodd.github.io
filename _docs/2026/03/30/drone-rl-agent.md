---
type: post
category: tech
series:
    name: Master Thesis
    slug: master
    number: 3
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1774882926/Screen_Recording_2026-03-23_163639.mp4_20260330_180108.753_jiilcz.png
    alt: training process
tag:
  - Unity
  - ML
  - drone
  - AI
---

# Drone Agent: A RL Implementation for Self-Leveling drones

## 1. Introduction

While Proportional-Integral-Derivative (PID) controllers are the industry standard for stable piloting—offering a simple, "white-box" solution—they often struggle with complex, non-linear dynamics where the Integral term alone is insufficient. Recently, Reinforcement Learning (RL) has gained traction as a robust "black-box" alternative. To reduce the computational burden on onboard systems, reinforcement learning has increasingly been adopted as a key approach for autonomous obstacle avoidance (Yu et al., 2025).

While many RL solutions bridge the gap from computer vision to control, this chapter explores a "target-to-target" approach. Using Unity’s ML-Agents toolkit, I aim to develop a training pipeline that investigates the efficacy of RL for precise drone hovering.

## 2. Fundamentals of Reinforcement Learning

The concept of implementing RL in computing is among the earliest visions of AI. In a 1948 report, Alan Turing described a design for a pleasure-pain system (Barto, 2019). Modern RL defines a framework where an agent learns behavior through trial-and-error interactions with a dynamic environment (Kaelbling et al., 1996). Unlike supervised learning, the agent is not provided with "correct" answers. Instead, it receives a scalar reinforcement signal (reward or punishment) and must discover actions that maximize its long-term cumulative reward.

### 2.1. Markov Decision Processes (MDPs)

MDPs provide the mathematical foundation for RL. In an MDP, an agent’s actions influence both the immediate reward and the subsequent state of the environment. An MDP is formally defined by:

* A set of states (S): Possible environment configurations.
* A set of actions (A): Choices available to the agent.
* A reward function (R): $R: S \times A \to \mathbb{R}$, specifying the instantaneous reward.
* A state transition function (T): $T: S \times A \to \Delta(S)$, defining the probability of transitioning to state $s'$ given action $a$ in state $s$.

![Markov Decision Process diagram](https://res.cloudinary.com/dmq8ipket/image/upload/v1774889820/1_the1cXDp1idTpZEvv1piAQ_qtccne.webp)

## 3. Implementation with Unity ML-Agents

### 3.1. Introduction of ML-Agents

ML-Agents enable games and simulations to serve as environments for training intelligent agents in Unity. Training can be done with reinforcement learning, imitation learning, neuroevolution, or any other methods. Trained agents can be used for many use cases, including controlling NPC behavior (in a variety of settings such as multi-agent and adversarial), automated testing of game builds and evaluating different game design decisions pre-release.

Every Learning Environment will always have one Agent for every character in the scene. While each Agent must be linked to a Behavior, it is possible for Agents that have similar observations and actions to have the same Behavior.

![Simplified ML-Agents Scene Block Diagram](https://docs.unity3d.com/Packages/com.unity.ml-agents@4.0/manual/images/learning_environment_example.png)

For this research, each Drone Agent includes:

* Agent Script: Handles `OnActionReceived` (processing "joystick" inputs), `CollectObservations` (monitoring states), and `Heuristic` (manual control for debugging).
* Behavior Parameters: Defines the vector space for actions and observations.
* Decision Requester: Controls the frequency of actions. By limiting the request rate, we can simulate more "human-like" reaction times, making the agent a better tutor for human pilots.

### 3.2. The Hovering Task

We implemented a 1D control mission: regulating the drone's vertical position ($y$) within a target band $[H - R, H + R]$, where $H$ is the `targetHeight` and $R$ is the `acceptableRadius`.

#### 3.2.1. Observation Space (Size: 2)

1. **Normalized Height Error:** $\text{clip}(\frac{y - H}{R}, -k, k) / k$ (where $k$ is `errorClampK`). This maps the error to a $[-1, 1]$ range, preventing extreme spikes from destabilizing the gradient.
2. **Vertical Velocity:** $v_y / v_{\text{ref}}$, clipped to $[-1, 1]$.

#### 3.2.2 Action Space

The agent uses **one continuous action** in the range $[0, 1]$, representing the throttle input.

### 3.3. Reward design

Rewards are calculated at each decision step ($\Delta t$):

* Event-based: A `firstArrivalReward` is granted upon entering the target band for the first time per episode.
* Dense/Steady-state: A `livingRewardPerSecond` is granted while maintaining position within the band.
* Shaping: A penalty proportional to the normalized excess $(|e|-R)/R$ is applied when outside the band to discourage drifting.

### 3.4. Proximal Policy Optimization (PPO)

We utilized Proximal Policy Optimization (PPO), an on-policy actor-critic algorithm that updates policies in small, clipped steps to ensure stability (OpenAI, 2017). PPO is particularly effective for drones learning to navigate complex environments (Yu et al., 2025).

The optimization objective is defined as:
$$L^{CLIP}(\theta) = \hat{\mathbb{E}}_t [ \min(r_t(\theta)\hat{A}_t, \text{text{clip}}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t) ]$$

* $\theta$ is the policy parameter
* $\hat{E}_t$ denotes the empirical expectation over timesteps
* $r_t$ is the ratio of the probability under the new and old policies, respectively
* $\hat{A}_t$ is the estimated advantage at time t
* $\epsilon$ is a hyperparameter, usually 0.1 or 0.2

#### 3.4.1 Training Configuration

The agent was trained for $5 \times 10^5$ steps using the following hyperparameters:

* Clip epsilon ($\epsilon$): 0.2
* GAE ($\lambda$, $\gamma$): 0.99
* Neural Network: 2-layer MLP with 128 hidden units.
* Learning Rate: $3 \times 10^{-4}$ (linear decay).

#### 3.4.2 Results and Visual Feedback

To monitor progress, we implemented a color-coded feedback system:

* **Yellow:** Below target.
* **Orange:** Above target.
* **Blue:** Stable hovering.

![trainig process](https://res.cloudinary.com/dmq8ipket/image/upload/v1774882926/Screen_Recording_2026-03-23_163639.mp4_20260330_180108.753_jiilcz.png)

* Cumulative Reward: Showed steady growth after 100k steps, plateauing at 400k.
* Episode Length: Positively correlated with rewards; as the agent improved, it survived longer without crashing (falling too low).
* Environment/Cumulative Reward Histograms: also shows when training time raises, reward start to raise.

![Result](https://res.cloudinary.com/dmq8ipket/image/upload/v1774888648/image-1_si4wom.png)

## 4. Tutoring UI

The RL agent successfully learned to hover with high precision. By adjusting the `DecisionRequester`, we created a smoother control hint for the UI, matching the pace of human perception.

![UI](https://res.cloudinary.com/dmq8ipket/image/upload/v1774882436/image_tzf01u.png)

Future studies may explore the integration of Large Language Models (LLMs) for high-level mission planning and piloting.

---

Yu, H., De Wagter, C., & De Croon, G. C. H. E. (2025). Depth Transfer: Learning to See Like a Simulator for Real-World Drone Navigation. IEEE Robotics and Automation Letters, 10(11), 11848–11855. https://doi.org/10.1109/LRA.2025.3617729

Kaelbling, L. P., Littman, M. L., Moore, A. W., & Hall, S. (1996). Reinforcement Learning: A Survey. Reinforcement Learning. https://doi.org/10.1613/jair.301

Barto, A. G. (2019). Reinforcement Learning: Connections, Surprises, Challenges. AI Magazine, 40(1), 3–15. https://doi.org/10.1609/aimag.v40i1.2844

Unity Technologies. (n.d.). ML-Agents overview (Version 4.0). Unity Manual. Retrieved [Insert Month Day, Year], from https://docs.unity3d.com/Packages/com.unity.ml-agents@4.0/manual/index.html

OpenAI. (2017, July 20). Proximal policy optimization. https://openai.com/index/openai-baselines-ppo/
