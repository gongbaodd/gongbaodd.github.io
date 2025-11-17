---
type: post
category: plan
cover:
  url: https://res.cloudinary.com/dmq8ipket/image/upload/v1762341638/ComfyUI_00001_assjl_1762341207_i59jrn.png
  alt: VTON
tag:
  - wikidata
  - triplydb
  - sparql
  - VTON
  - RunningHub
  - pokemon
  - portfolio
---
# Week 46: Exploring WikiData, TriplyDB & VTON

This week, I dived into two interesting projects: using **WikiData** for garment exploration with VTON models, and building a small **Pokémon game** with TriplyDB. Here’s a recap of my experiments and findings.

---

## Part 1: WikiData & Virtual Try-On (VTON) 👗

My first idea was to **search garments in WikiData** and use a VTON model to generate a “put-on” result. The notebook for this experiment is [here](https://colab.research.google.com/drive/1vhLRL2xoSoNOfFk9szlfnXF2wtiy191l?usp=sharing).

### Setup

First, install SPARQL wrapper for Python:

```bash
!pip install SPARQLWrapper
```

You can test SPARQL queries interactively [here](https://query.wikidata.org/).

### SPARQL Query Template

```sql
SELECT DISTINCT ?item ?itemLabel ?image ?inception ?countryLabel ?bodyPartLabel WHERE {{
  ?item wdt:P31/wdt:P279* wd:{qid} .

  OPTIONAL {{ ?item wdt:P18 ?image. }}
  OPTIONAL {{ ?item wdt:P571 ?inception. }}
  OPTIONAL {{ ?item wdt:P495 ?country. }}
  OPTIONAL {{ ?item wdt:P17 ?country. }}
  OPTIONAL {{ ?item wdt:P366 ?bodyPart. }}

  FILTER(bound(?image))
  FILTER(bound(?country))

  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
ORDER BY ?inception
LIMIT 200
```

### Python Code Example

```python
from SPARQLWrapper import SPARQLWrapper, JSON
import pandas as pd

ENDPOINT_URL = "https://query.wikidata.org/sparql"
sparql = SPARQLWrapper(ENDPOINT_URL)

# Clothing categories
clothing_classes = [
    ("Shirt", "Q76768"),
    ("Jacket", "Q849964"),
    ("Top clothing", "Q1435365"),
    ("Coat", "Q152574"),
    ("Body armour", "Q485027"),
    ("Trousers", "Q39908"),
    ("Skirt", "Q2160801"),
]

def query_wikidata(qid: str):
    """Run a Wikidata SPARQL query for a specific clothing QID."""
    query = QUERY_TEMPLATE.format(qid=qid)
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    rows = []
    for r in results["results"]["bindings"]:
        image_url = r.get("image", {}).get("value", "")
        rows.append({
            "Label": r.get("itemLabel", {}).get("value"),
            "Image": f'<a href="{image_url}" target="_blank"><img src="{image_url}" width="80"/></a>' if image_url else "",
            "Inception": r.get("inception", {}).get("value", ""),
            "Country": r.get("countryLabel", {}).get("value", ""),
            "Body Part": r.get("bodyPartLabel", {}).get("value", ""),
            "Item URL": r.get("item", {}).get("value", ""),
        })

    return pd.DataFrame(rows)
```

### Example: Querying Jackets 🧥

```python
name, qid = clothing_classes[1]  # Jacket
print(f"🧵 Querying for: {name} ({qid})")
df = query_wikidata(qid)
df.style.set_properties(**{'text-align': 'left'}).hide(axis="index")
```


<table id="T_5eb49" class="dataframe">
  <thead>
    <tr>
      <th id="T_5eb49_level0_col0" class="col_heading level0 col0">Label</th>
      <th id="T_5eb49_level0_col1" class="col_heading level0 col1">Image</th>
      <th id="T_5eb49_level0_col2" class="col_heading level0 col2">Inception</th>
      <th id="T_5eb49_level0_col3" class="col_heading level0 col3">Country</th>
      <th id="T_5eb49_level0_col4" class="col_heading level0 col4">Body Part</th>
      <th id="T_5eb49_level0_col5" class="col_heading level0 col5">Item URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="T_5eb49_row0_col0" class="data row0 col0">Semi-formal Jacket Worn by Princess Deokon</td>
      <td id="T_5eb49_row0_col1" class="data row0 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/%EB%8D%95%EC%98%A8%EA%B3%B5%EC%A3%BC%20%EB%8B%B9%EC%9D%98.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/%EB%8D%95%EC%98%A8%EA%B3%B5%EC%A3%BC%20%EB%8B%B9%EC%9D%98.jpg" width="80"></a></td>
      <td id="T_5eb49_row0_col2" class="data row0 col2"></td>
      <td id="T_5eb49_row0_col3" class="data row0 col3">South Korea</td>
      <td id="T_5eb49_row0_col4" class="data row0 col4"></td>
      <td id="T_5eb49_row0_col5" class="data row0 col5">http://www.wikidata.org/entity/Q12592827</td>
    </tr>
    <tr>
      <td id="T_5eb49_row1_col0" class="data row1 col0">cotte de mailles, brigandine, jacque and ex-voto armour elements of the dauphin Jean, son of Charles VI (treasure)</td>
      <td id="T_5eb49_row1_col1" class="data row1 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/%C3%89l%C3%A9ments%20d%27armure%20du%20tr%C3%A9sor%2C%20chapelle%20Saint-Piat%20de%20la%20cath%C3%A9drale%20de%20Chartres%20%28Eure-et-Loir%2C%20France%29.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/%C3%89l%C3%A9ments%20d%27armure%20du%20tr%C3%A9sor%2C%20chapelle%20Saint-Piat%20de%20la%20cath%C3%A9drale%20de%20Chartres%20%28Eure-et-Loir%2C%20France%29.jpg" width="80"></a></td>
      <td id="T_5eb49_row1_col2" class="data row1 col2">1500-01-01T00:00:00Z</td>
      <td id="T_5eb49_row1_col3" class="data row1 col3">France</td>
      <td id="T_5eb49_row1_col4" class="data row1 col4"></td>
      <td id="T_5eb49_row1_col5" class="data row1 col5">http://www.wikidata.org/entity/Q29161206</td>
    </tr>
    <tr>
      <td id="T_5eb49_row2_col0" class="data row2 col0">Q108460457</td>
      <td id="T_5eb49_row2_col1" class="data row2 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Gr%C3%BCne%20Hausjacke.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Gr%C3%BCne%20Hausjacke.jpg" width="80"></a></td>
      <td id="T_5eb49_row2_col2" class="data row2 col2">1600-01-01T00:00:00Z</td>
      <td id="T_5eb49_row2_col3" class="data row2 col3">Germany</td>
      <td id="T_5eb49_row2_col4" class="data row2 col4"></td>
      <td id="T_5eb49_row2_col5" class="data row2 col5">http://www.wikidata.org/entity/Q108460457</td>
    </tr>
    <tr>
      <td id="T_5eb49_row3_col0" class="data row3 col0">Jacket</td>
      <td id="T_5eb49_row3_col1" class="data row3 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Jacket%20MET%20DT409.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Jacket%20MET%20DT409.jpg" width="80"></a></td>
      <td id="T_5eb49_row3_col2" class="data row3 col2">1616-01-01T00:00:00Z</td>
      <td id="T_5eb49_row3_col3" class="data row3 col3">United Kingdom</td>
      <td id="T_5eb49_row3_col4" class="data row3 col4"></td>
      <td id="T_5eb49_row3_col5" class="data row3 col5">http://www.wikidata.org/entity/Q29383426</td>
    </tr>
    <tr>
      <td id="T_5eb49_row4_col0" class="data row4 col0">Doublet</td>
      <td id="T_5eb49_row4_col1" class="data row4 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Doublet%20MET%20DT6135.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Doublet%20MET%20DT6135.jpg" width="80"></a></td>
      <td id="T_5eb49_row4_col2" class="data row4 col2">1622-01-01T00:00:00Z</td>
      <td id="T_5eb49_row4_col3" class="data row4 col3">France</td>
      <td id="T_5eb49_row4_col4" class="data row4 col4"></td>
      <td id="T_5eb49_row4_col5" class="data row4 col5">http://www.wikidata.org/entity/Q29383454</td>
    </tr>
    <tr>
      <td id="T_5eb49_row5_col0" class="data row5 col0">Caraco</td>
      <td id="T_5eb49_row5_col1" class="data row5 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Caraco%20MET%20DT4670.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Caraco%20MET%20DT4670.jpg" width="80"></a></td>
      <td id="T_5eb49_row5_col2" class="data row5 col2">1760-01-01T00:00:00Z</td>
      <td id="T_5eb49_row5_col3" class="data row5 col3">Netherlands</td>
      <td id="T_5eb49_row5_col4" class="data row5 col4"></td>
      <td id="T_5eb49_row5_col5" class="data row5 col5">http://www.wikidata.org/entity/Q99800503</td>
    </tr>
    <tr>
      <td id="T_5eb49_row6_col0" class="data row6 col0">Riding coat</td>
      <td id="T_5eb49_row6_col1" class="data row6 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Riding%20coat%20MET%201976.147.1%201976.147.2.jpeg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Riding%20coat%20MET%201976.147.1%201976.147.2.jpeg" width="80"></a></td>
      <td id="T_5eb49_row6_col2" class="data row6 col2">1760-01-01T00:00:00Z</td>
      <td id="T_5eb49_row6_col3" class="data row6 col3">United Kingdom</td>
      <td id="T_5eb49_row6_col4" class="data row6 col4"></td>
      <td id="T_5eb49_row6_col5" class="data row6 col5">http://www.wikidata.org/entity/Q29383456</td>
    </tr>
    <tr>
      <td id="T_5eb49_row7_col0" class="data row7 col0">Jacket</td>
      <td id="T_5eb49_row7_col1" class="data row7 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Jacket%20MET%20DT4313.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Jacket%20MET%20DT4313.jpg" width="80"></a></td>
      <td id="T_5eb49_row7_col2" class="data row7 col2">1785-01-01T00:00:00Z</td>
      <td id="T_5eb49_row7_col3" class="data row7 col3">France</td>
      <td id="T_5eb49_row7_col4" class="data row7 col4"></td>
      <td id="T_5eb49_row7_col5" class="data row7 col5">http://www.wikidata.org/entity/Q29383396</td>
    </tr>
    <tr>
      <td id="T_5eb49_row8_col0" class="data row8 col0">Dressing jacket</td>
      <td id="T_5eb49_row8_col1" class="data row8 col1"><a href="http://commons.wikimedia.org/wiki/Special:FilePath/Dressing%20jacket%20MET%201982.82.7%20F.jpg" target="_blank"><img src="http://commons.wikimedia.org/wiki/Special:FilePath/Dressing%20jacket%20MET%201982.82.7%20F.jpg" width="80"></a></td>
      <td id="T_5eb49_row8_col2" class="data row8 col2">1860-01-01T00:00:00Z</td>
      <td id="T_5eb49_row8_col3" class="data row8 col3">United States</td>
      <td id="T_5eb49_row8_col4" class="data row8 col4"></td>
      <td id="T_5eb49_row8_col5" class="data row8 col5">http://www.wikidata.org/entity/Q100347695</td>
    </tr>
  </tbody>
</table>

You can see a table of jackets with images, countries, and other metadata.

### VTON Model Test

I used [RunningHub](https://www.runninghub.cn/) to test the **FLUX CAT VTON model**.

<table><thead><tr><th>Input Person</th><th>Input Garment</th><th>Result</th></tr></thead><tbody><tr><td>
  <img src="https://res.cloudinary.com/dmq8ipket/image/upload/v1762339768/Telsa-CEO-Elon-Musk-2014_caktxx.webp" alt="Person" width=400>
</td>
<td>
  <img src="https://res.cloudinary.com/dmq8ipket/image/upload/v1762339767/Jacket_MET_DT409_cldxvl.jpg" alt="Jacket" width=400>
</td>
<td>
  <img src="https://res.cloudinary.com/dmq8ipket/image/upload/v1762339770/ComfyUI_00001_bpukq_1762339293_ddgkqm.jpg" alt="Result" width=400>
</td>
</tr>
<tr>
<td>
  <img src="https://res.cloudinary.com/dmq8ipket/image/upload/v1762341285/IMGP6788_sppuvd.jpg" alt="Person" width=400>
</td>
<td>
  <img src="https://res.cloudinary.com/dmq8ipket/image/upload/v1762341281/Armor_of_Emperor_Ferdinand_I__1503_1564__MET_DT773_duyy9u.jpg" alt="Armour" width=400>
</td>
<td>
  <img src="https://res.cloudinary.com/dmq8ipket/image/upload/v1762341638/ComfyUI_00001_assjl_1762341207_i59jrn.png" alt="Result" width=400>
</td>
</tr></tbody></table>

**Conclusion:**

* WikiData has limited clothing data; sufficient for a game prototype but not for a full-fledged tool.
* FLUX CAT VTON takes **2–10 minutes to generate**, and results can be inconsistent. It’s too slow for real-time API use.

---

## Part 2: Pokémon Game with TriplyDB 🎮⚡

After experimenting with garments, I switched to **TriplyDB** to make a Pokémon game. The notebook is [here](https://colab.research.google.com/drive/1LdDz2K-eVXI9QXqpdTNtoD9Jas7H4Kkh?usp=sharing).

### Listing Pokémon from the Database

```python
from SPARQLWrapper import SPARQLWrapper, JSON
import pandas as pd

ENDPOINT_URL = "https://api.triplydb.com/datasets/academy/pokemon/services/jena/sparql"
sparql = SPARQLWrapper(ENDPOINT_URL)

QUERY_TEMPLATE = """
PREFIX pokémon: <https://triplydb.com/academy/pokemon/id/pokemon/>
PREFIX vocab:   <https://triplydb.com/academy/pokemon/vocab/>
PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf:    <http://xmlns.com/foaf/0.1/>

SELECT ?pokemon ?name ?image ?typeLabel
WHERE {
  ?pokemon foaf:depiction ?image ;
           rdfs:label ?name ;
           vocab:type ?type .
  ?type rdfs:label ?typeLabel .
}
LIMIT 10
"""

query = QUERY_TEMPLATE
sparql.setQuery(query)
sparql.setReturnFormat(JSON)
results = sparql.query().convert()

rows = []
for result in results["results"]["bindings"]:
    image_url = result.get("image", {}).get("value", "")
    rows.append({
        "Pokemon": result["name"]["value"],
        "Image URL": f'<a href="{image_url}" target="_blank"><img src="{image_url}" width="80"/></a>' if image_url else "",
        "Type": result["typeLabel"]["value"]
    })

df = pd.DataFrame(rows)
df.style.set_properties(**{'text-align': 'left'}).hide(axis="index")
```

This generates a table with Pokémon names, images, and types.


<table id="T_a98b1" class="dataframe">
  <thead>
    <tr>
      <th id="T_a98b1_level0_col0" class="col_heading level0 col0">Pokemon</th>
      <th id="T_a98b1_level0_col1" class="col_heading level0 col1">Image URL</th>
      <th id="T_a98b1_level0_col2" class="col_heading level0 col2">Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="T_a98b1_row0_col0" class="data row0 col0">Silcoon</td>
      <td id="T_a98b1_row0_col1" class="data row0 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=silcoon.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=silcoon.png" width="80"></a></td>
      <td id="T_a98b1_row0_col2" class="data row0 col2">Bug Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row1_col0" class="data row1 col0">Relicanth</td>
      <td id="T_a98b1_row1_col1" class="data row1 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=relicanth.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=relicanth.png" width="80"></a></td>
      <td id="T_a98b1_row1_col2" class="data row1 col2">Rock Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row2_col0" class="data row2 col0">Relicanth</td>
      <td id="T_a98b1_row2_col1" class="data row2 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=relicanth.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=relicanth.png" width="80"></a></td>
      <td id="T_a98b1_row2_col2" class="data row2 col2">Water Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row3_col0" class="data row3 col0">Volbeat</td>
      <td id="T_a98b1_row3_col1" class="data row3 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=volbeat.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=volbeat.png" width="80"></a></td>
      <td id="T_a98b1_row3_col2" class="data row3 col2">Bug Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row4_col0" class="data row4 col0">Palkia</td>
      <td id="T_a98b1_row4_col1" class="data row4 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=palkia.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=palkia.png" width="80"></a></td>
      <td id="T_a98b1_row4_col2" class="data row4 col2">Water Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row5_col0" class="data row5 col0">Palkia</td>
      <td id="T_a98b1_row5_col1" class="data row5 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=palkia.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=palkia.png" width="80"></a></td>
      <td id="T_a98b1_row5_col2" class="data row5 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row6_col0" class="data row6 col0">Goldeen</td>
      <td id="T_a98b1_row6_col1" class="data row6 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=goldeen.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=goldeen.png" width="80"></a></td>
      <td id="T_a98b1_row6_col2" class="data row6 col2">Water Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row7_col0" class="data row7 col0">Snorlax</td>
      <td id="T_a98b1_row7_col1" class="data row7 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=snorlax.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=snorlax.png" width="80"></a></td>
      <td id="T_a98b1_row7_col2" class="data row7 col2">Normal Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row8_col0" class="data row8 col0">Cranidos</td>
      <td id="T_a98b1_row8_col1" class="data row8 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=cranidos.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=cranidos.png" width="80"></a></td>
      <td id="T_a98b1_row8_col2" class="data row8 col2">Rock Type</td>
    </tr>
    <tr>
      <td id="T_a98b1_row9_col0" class="data row9 col0">Kangaskhan</td>
      <td id="T_a98b1_row9_col1" class="data row9 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=kangaskhan.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=kangaskhan.png" width="80"></a></td>
      <td id="T_a98b1_row9_col2" class="data row9 col2">Normal Type</td>
    </tr>
  </tbody>
</table>

### Collecting Pokémon Types

```python
QUERY_TYPES = """
PREFIX vocab: <https://triplydb.com/academy/pokemon/vocab/>
PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?typeLabel WHERE {
  ?pokemon vocab:type ?type .
  ?type rdfs:label ?typeLabel .
}
ORDER BY ?typeLabel
"""
sparql.setQuery(QUERY_TYPES)
sparql.setReturnFormat(JSON)
results = sparql.query().convert()

types = [result["typeLabel"]["value"] for result in results["results"]["bindings"]]
print(types)
```

**Types found:**

`['Bug Type', 'Dark Type', 'Dragon Type', 'Electric Type', 'Fighting Type', 'Fire Type', 'Flying Type', 'Ghost Type', 'Grass Type', 'Ground Type', 'Ice Type', 'Normal Type', 'Poison Type', 'Psychic Type', 'Rock Type', 'Steel Type', 'Water Type']`

### Searching Pokémon by Type 🐉

```python
def search_pokemon_by_type(pokemon_type, limit=50):
    query = f"""
    PREFIX pokémon: <https://triplydb.com/academy/pokemon/id/pokemon/>
    PREFIX vocab:   <https://triplydb.com/academy/pokemon/vocab/>
    PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX foaf:    <http://xmlns.com/foaf/0.1/>

    SELECT ?pokemon ?name ?image ?typeLabel
    WHERE {{
      ?pokemon foaf:depiction ?image ;
               rdfs:label ?name ;
               vocab:type ?type .
      ?type rdfs:label ?typeLabel .
      FILTER(LCASE(?typeLabel) = "{pokemon_type.lower()}")
    }}
    LIMIT {limit}
    """
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    data = []
    for result in results["results"]["bindings"]:
        image_url = result.get("image", {}).get("value", "")
        data.append({
            "name": result["name"]["value"],
            "image": f'<a href="{image_url}" target="_blank"><img src="{image_url}" width="80"/></a>' if image_url else "",
            "type": result["typeLabel"]["value"]
        })
    return pd.DataFrame(data)
```

Example: **List 10 Dragon Type Pokémon**


```python
df = search_pokemon_by_type(types[2], 10)
df.style.set_properties(**{'text-align': 'left'}).hide(axis="index")
```

<table id="T_bacd6" class="dataframe">
  <thead>
    <tr>
      <th id="T_bacd6_level0_col0" class="col_heading level0 col0">name</th>
      <th id="T_bacd6_level0_col1" class="col_heading level0 col1">image</th>
      <th id="T_bacd6_level0_col2" class="col_heading level0 col2">type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="T_bacd6_row0_col0" class="data row0 col0">Palkia</td>
      <td id="T_bacd6_row0_col1" class="data row0 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=palkia.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=palkia.png" width="80"></a></td>
      <td id="T_bacd6_row0_col2" class="data row0 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row1_col0" class="data row1 col0">Dialga</td>
      <td id="T_bacd6_row1_col1" class="data row1 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dialga.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dialga.png" width="80"></a></td>
      <td id="T_bacd6_row1_col2" class="data row1 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row2_col0" class="data row2 col0">Dragonair</td>
      <td id="T_bacd6_row2_col1" class="data row2 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dragonair.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dragonair.png" width="80"></a></td>
      <td id="T_bacd6_row2_col2" class="data row2 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row3_col0" class="data row3 col0">Bagon</td>
      <td id="T_bacd6_row3_col1" class="data row3 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=bagon.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=bagon.png" width="80"></a></td>
      <td id="T_bacd6_row3_col2" class="data row3 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row4_col0" class="data row4 col0">Dratini</td>
      <td id="T_bacd6_row4_col1" class="data row4 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dratini.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dratini.png" width="80"></a></td>
      <td id="T_bacd6_row4_col2" class="data row4 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row5_col0" class="data row5 col0">Kingdra</td>
      <td id="T_bacd6_row5_col1" class="data row5 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=kingdra.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=kingdra.png" width="80"></a></td>
      <td id="T_bacd6_row5_col2" class="data row5 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row6_col0" class="data row6 col0">Dragonite</td>
      <td id="T_bacd6_row6_col1" class="data row6 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dragonite.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=dragonite.png" width="80"></a></td>
      <td id="T_bacd6_row6_col2" class="data row6 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row7_col0" class="data row7 col0">Vibrava</td>
      <td id="T_bacd6_row7_col1" class="data row7 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=vibrava.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=vibrava.png" width="80"></a></td>
      <td id="T_bacd6_row7_col2" class="data row7 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row8_col0" class="data row8 col0">Giratina</td>
      <td id="T_bacd6_row8_col1" class="data row8 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=giratina.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=giratina.png" width="80"></a></td>
      <td id="T_bacd6_row8_col2" class="data row8 col2">Dragon Type</td>
    </tr>
    <tr>
      <td id="T_bacd6_row9_col0" class="data row9 col0">Altaria</td>
      <td id="T_bacd6_row9_col1" class="data row9 col1"><a href="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=altaria.png" target="_blank"><img src="https://api.triplydb.com/datasets/academy/pokemon/assets/download?fileName=altaria.png" width="80"></a></td>
      <td id="T_bacd6_row9_col2" class="data row9 col2">Dragon Type</td>
    </tr>
  </tbody>
</table>


**Conclusion:**

* With these queries, a **simple Pokémon game** can be made quickly.
* TriplyDB provides structured data with images and types, making it ideal for game prototyping.
