---
type: post
category: tech
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1781525220/Screenshot_20260615_150539_txn28b.png
    alt: museum match
---

# Museum Suggestion using DKT

Not only for exams, [DKT](/tech/2026/06/12/deep-knowledge-tracing) can do much more out side of the education area.

Rather than a question's correctness, it can be one's favorness of a product. For example, museums.

|A|B|C|D|
|-|-|-|-|
| like | not like | not like |like |

So before the visitor go to the museum E, would he like it or not?

You can try [this demo](https://dkt-museum-demo.growgen.xyz).

## Implementation

[The Estonian Museum Card website](https://muuseumikaart.ee/en/museums/) provides 120 museums' description. I used `Qwen3-Embedding-0.6B-GGUF` to embedding them then use k-means to separate them into 11 clusters.

Then I use Google Gemma 4-e4b to label the clusters:

|cluster|cluster_name|museum_count |
| ------| -----------| ---------- |
|0 | Pärnu art and nature | 5 |
| 1 | Coastal and regional museums | 10 |
|2 | Tallinn cultural institutions | 25 |
| 3 |Tallinn city history museums | 15 |
| 4 | Transport history museums | 2 |
| 5 | Haapsalu history museums| 7 |
| 6 | Rural life and farming museums | 8| 
| 7|Saaremaa museum| 1|
| 8 | Virtual time travel experiences | 2|
| 9 | Tartu cultural and academic sites | 16 |
| 10 | Rural and Local History Museums | 30 |

Then randomly generate the training data. ***In reality this should be done by real data.***

![training data](https://res.cloudinary.com/dmq8ipket/image/upload/v1781525404/lmuseum_q9gsqj.png)

Then the other processes are the original DKT training process. Use LSTM to build the network. Use binary cross entropy to make the loss function.

Then you can check the [result](https://dkt-museum-demo.growgen.xyz).

## Note

The model uses randomly generated data rather than real-world datasets. The cluster is labeled with Google Gemma-4-e4b, so the labeling is questionable. Consequently, the model's predictions are not accurate and are intended solely to demonstrate the technology within a browser environment.
