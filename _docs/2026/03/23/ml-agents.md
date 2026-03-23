---
type: post
category: fe
tag:
    - ML
    - AI
    - Unity
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1774257310/balance_zrqbdj.png
    alt: training
---

# ML-Agents on M-Series Macs


Let’s be honest: setting up a Machine Learning environment on Apple Silicon (M1/M2/M3) can feel like a marathon. Recently, I’ve been diving into ML training, and doing it on a Mac Mini is... let's say, an "adventure." 🧗‍♂️

The silver lining? My Mac Mini is **dead silent** 🤫 compared to the jet-engine roar of a Windows gaming rig during training.

If you're struggling to get Unity's ML-Agents up and running, here is my battle-tested, step-by-step guide to making it actually work.

---

## 🛠 Phase 1: The Initial Setup

First, head over to the [Official Unity ML-Agents Installation Guide](https://docs.unity3d.com/Packages/com.unity.ml-agents@4.0/manual/Installation.html). 

> **Pro Tip:** Follow the **Advanced Installation** path. You’ll need the source files for the dependencies to play nice later on.

Once installed, open the example files (found in the `Project` folder) in Unity. If you're new to the workflow, check out the [official sample guide](https://docs.unity3d.com/Packages/com.unity.ml-agents@4.0/manual/Sample.html) on how to train a model.

---

## 🐍 Phase 2: Solving the Dependency Headache

When you first try to run the training command:

```shell
mlagents-learn config/ppo/3DBall.yaml --run-id=3DBall
```

...you’ll likely hit a wall because `onnxscript` is missing. 🛑 

Go ahead and install the necessary dependencies. You might see some terrifying red text regarding version conflicts—**just ignore them for now** and push through:

```shell
python -m pip install onnx onnxscript onnxruntime
```

Next, you **must** downgrade/reinstall `protobuf` to a specific version, or the internal communication will fail:

```shell
python -m pip install protobuf==3.20.3
```

Verify the installation by running:

```shell
mlagents-learn --help
```

If you see the help menu, you’re halfway there! 🎉

---

## 🛠 Phase 3: The Secret Fix

Here is the part that drives everyone crazy. If you don't do this, the `.onnx` file generated after training will be unreadable by Unity. 📄🚫 

This happens because modern PyTorch uses a new exporter called **Dynamo**, while Unity's importer expects the legacy format. You need to manually patch the ML-Agents library.

Locate this file in your environment:
`/opt/miniconda3/envs/mlagents/lib/python3.10/site-packages/mlagents/trainers/torch_entities/model_serialization.py`

Find the `torch.onnx.export` call and add `dynamo=False` as shown below:

```python
with exporting_to_onnx():
    torch.onnx.export(
        self.policy.actor,
        self.dummy_input,
        onnx_output_path,
        dynamo=False,  # <--- ADD THIS LINE HERE TO FIX UNITY COMPATIBILITY
        opset_version=SerializationSettings.onnx_opset,
        input_names=self.input_names,
        output_names=self.output_names,
        dynamic_axes=self.dynamic_axes,
    )
    logger.info(f"Exported {onnx_output_path}")
```

---

## 🚀 Phase 4: Training & Implementation

Now you're ready!

1. Run your training command. 🏃‍♂️💨
2. Once finished, grab the generated `.onnx` file from the `results` folder.
3. Drag it into your Unity project.
4. Assign it to the **Model** field in the **Behavior Parameters** component of your Agent.

Happy training! 🎓🤖