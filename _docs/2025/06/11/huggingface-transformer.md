---
type: post
category: fe
tag:
    - AI
    - huggingface
cover:
    url: https://huggingface.co/blog/assets/infrastructure-alerting/thumbnail.jpg
    alt: huggingface icon
---
# HuggingFace Transformer.js

Finally, I am able to talk about the [huggingface transformer.js project](https://github.com/huggingface/transformers.js). This project uses [ONNX](https://github.com/onnx) to make it possible to run HuggingFace models in the browser. 

Just calling the API is boring, there is [a react translation tutorial](https://huggingface.co/docs/transformers.js/tutorials/react) which is the best way to get started.

Download the model: in the model, they used a worker.js to download the model. the progress_callback is used to show the progress of the download.

```js
this.instance ??= pipeline(this.task, this.model, { progress_callback });
```

The `pipeline` function is used to create a pipeline for the model. You can add parameter `dtype: "fp32"` for higher precision, but the file will be bigger.

`device: "webgpu"` is used to run the model on the GPU.

the `progress_callback` will return the progress event. The structure is like this.

```js
{
    status: "initiate" | "progress" | "done" | "ready",
    data: {
        file: string, // file name
        progress: number, // progress percentage
        ...
    }
}
```

The following code shows how to stream the result. If you are using typescript, you may get errors, maybe the type definition is wrong.

```js
// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  // Retrieve the translation pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  const translator = await MyTranslationPipeline.getInstance(x => {
      // We also add a progress callback to the pipeline so that we can
      // track model loading.
      self.postMessage(x);
  });

  // Capture partial output as it streams from the pipeline
  const streamer = new TextStreamer(translator.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      callback_function: function (text) {
          self.postMessage({
              status: 'update',
              output: text
          });
      }
  });

  // Actually perform the translation
  const output = await translator(event.data.text, {
      tgt_lang: event.data.tgt_lang,
      src_lang: event.data.src_lang,

      // Allows for partial output to be captured
      streamer,
  });

  // Send the output back to the main thread
  self.postMessage({
      status: 'complete',
      output,
  });
});
```

I can download the model and load locally.

```js
import { env } from '@huggingface/transformers';
env.allowRemoteModels = false;
env.localModelPath = '/path/to/local/models/';
```

Most important is [the pipelines](https://huggingface.co/docs/transformers.js/api/pipelines). It is a list of pipelines that defines what it can do and what it cannot do.

| pipeline | category | example models | input | output |
|----------|----------|----------------|-------|--------|
| TextClassificationPipeline| sentiment-analysis | Xenova/distilbert-base-uncased-finetuned-sst-2-english | 'I love transformers!' | [{ label: 'POSITIVE', score: 0.999788761138916 }] |
| | text-classification | Xenova/toxic-bert | 'I hate you!' | [{ label: 'toxic', score: 0.9593140482902527 },... ] |
| TokenClassificationPipeline |token-classification | Xenova/bert-base-NER | 'My name is Sarah and I live in London' | [{ entity: 'B-PER', score: 0.9980202913284302, index: 4, word: 'Sarah' },{ entity: 'B-LOC', score: 0.9994474053382874, index: 9, word: 'London' }] |
| QuestionAnsweringPipeline | question-answering | Xenova/distilbert-base-uncased-distilled-squad | const question = 'Who was Jim Henson?'; const context = 'Jim Henson was a nice puppet.'; |{answer: "a nice puppet", score: 0.5768911502526741}|
| FillMaskPipeline | fill-mask | Xenova/bert-base-cased | 'The goal of life is [MASK].' | [{ token_str: 'survival', score: 0.06137419492006302, token: 8115, sequence: 'The goal of life is survival.' }, { token_str: 'love', score: 0.03902450203895569, token: 1567, sequence: 'The goal of life is love.' }, { token_str: 'happiness', score: 0.03253183513879776, token: 9266, sequence: 'The goal of life is happiness.' }, { token_str: 'freedom', score: 0.018736306577920914, token: 4438, sequence: 'The goal of life is freedom.' }, { token_str: 'life', score: 0.01859794743359089, token: 1297, sequence: 'The goal of life is life.' }] |
| Text2TextGenerationPipeline | text2text-generation | Xenova/LaMini-Flan-T5-783M | 'how can I become more healthy?', {max_new_tokens: 100} |  [{ generated_text: "To become more healthy, you can: 1. Eat a balanced diet with plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. 2. Stay hydrated by drinking plenty of water. 3. Get enough sleep and manage stress levels. 4. Avoid smoking and excessive alcohol consumption. 5. Regularly exercise and maintain a healthy weight. 6. Practice good hygiene and sanitation. 7. Seek medical attention if you experience any health issues." }] |
|SummarizationPipeline| summarization | Xenova/distilbart-cnn-6-6 | text, {max_new_tokens: 100} | [{ summary_text: ' The Eiffel Tower is about the same height as an 81-storey building and the tallest structure in Paris. It is the second tallest free-standing structure in France after the Millau Viaduct.' }] |
| TranslationPipeline | translation | Xenova/nllb-200-distilled-600M | 'जीवन एक चॉकलेट बॉक्स की तरह है।', {src_lang: 'hin_Deva', tgt_lang: 'fra_Latn' } | [{ translation_text: 'La vie est comme une boîte à chocolat.' }] |
| TextGenerationPipeline | text-generation |  Xenova/distilgpt2 | I enjoy walking with my cute dog, |  [{ generated_text: "I enjoy walking with my cute dog, and I love to play with the other dogs." }] |
| ZeroShotClassificationPipeline | 'zero-shot-classification | Xenova/mobilebert-uncased-mnli | const text = 'Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.'; const labels = [ 'mobile', 'billing', 'website', 'account access' ]; | {sequence: 'Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.', labels: [ 'mobile', 'website', 'billing', 'account access' ], scores: [ 0.5562091040482018, 0.1843621307860853, 0.13942646639336376, 0.12000229877234923 ]} |
|FeatureExtractionPipeline|feature-extraction|Xenova/bert-base-uncased|This is a simple test.| Tensor {type: 'float32', data: Float32Array [0.05939924716949463, 0.021655935794115067, ...], dims: [1, 8, 768] }|
|ImageFeatureExtractionPipeline| image-feature-extraction | Xenova/vit-base-patch16-224-in21k | image_url | Tensor { dims: [ 1, 197, 768 ], type: 'float32', data: Float32Array(151296) [ ... ], size: 151296 } |
| AudioClassificationPipeline | audio-classification | 'Xenova/wav2vec2-large-xlsr-53-gender-recognition-librispeech' | audio_url | [{ label: 'male', score: 0.9981542229652405 }, { label: 'female', score: 0.001845747814513743 }] |
| ZeroShotAudioClassificationPipeline | zero-shot-audio-classification | Xenova/clap-htsat-unfused | audio_url, { candidate_labels: ['dog', 'cat', 'bird'] } | [{ score: 0.9993992447853088, label: 'dog' },{ score: 0.0006007603369653225, label: 'vaccum cleaner' }] |
|AutomaticSpeechRecognitionPipeline| automatic-speech-recognition | Xenova/whisper-tiny.en | audio_url | { text: 'Hello, how are you?' } |
| ImageToTextPipeline | image-to-text | Xenova/blip2-opt-2.7b | image_url | [{ generated_text: 'A person is sitting on a bench in a park.' }] |
| ImageClassificationPipeline | image-classification | 'Xenova/vit-base-patch16-224 | image_url | [{ label: 'n02123045 tabby, tabby cat', score: 0.9999998807907104 }] |
|ImageSegmentationPipeline| image-segmentation | Xenova/detr-resnet-50-panoptic | image_url | [{ label: 'cat', score: 0.9999998807907104, mask: RawImage { ... } }] |
|BackgroundRemovalPipeline| background-removal | 'Xenova/modnet' | image_url | [RawImage { data: Uint8ClampedArray(648000) [ ... ], width: 360, height: 450, channels: 4 }]|
|ZeroShotImageClassificationPipeline|zero-shot-image-classification|Xenova/clip-vit-base-patch32.| url, ['tiger', 'horse', 'dog'] | [{ label: 'tiger', score: 0.9999998807907104 }, { label: 'horse', score: 0.00000011920928955078125 }, { label: 'dog', score: 0.00000011920928955078125 }] |
|ObjectDetectionPipeline|object-detection|Xenova/detr-resnet-50| img, { threshold: 0.9 }| [{score: 0.9976370930671692, label: "remote", box: { xmin: 31, ymin: 68, xmax: 190, ymax: 118 }},... ]|
|ZeroShotObjectDetectionPipeline|Zero-shot object detection| Xenova/owlvit-base-patch32 | img, { candidate_labels: ['remote', 'cat', 'dog'] } | [{ score: 0.9999998807907104, label: 'remote', box: { xmin: 31, ymin: 68, xmax: 190, ymax: 118 } }, ... ] |
|DocumentQuestionAnsweringPipeline|document-question-answering| image, 'What is the invoice number?' |  [{ answer: 'us-001' }] |
|TextToAudioPipeline|text-to-speech|Xenova/speecht5_tts|'Hello, my dog is cute', { speaker_embeddings: 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin' } | RawAudio { audio: Float32Array(26112) [-0.00005657337896991521, 0.00020583874720614403, ...],sampling_rate: 16000} |

- ImageToImagePipeline： enlarger an image
- DepthEstimationPipeline: make depth graph
