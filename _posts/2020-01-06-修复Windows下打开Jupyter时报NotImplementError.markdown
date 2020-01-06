---
type: post
category: tech
---
# 修复Windows下打开Jupyter报NotImplementError

打开```/c/Users/{USER_NAME}/AppData/Local/Programs/Python/Python38/Lib/asyncio/__init__/py```.

修改

```python
if sys.platform == 'win32':
    from .windows_event import *
    __all__ += windows_events.__all__
```

改为如下

```python
import asyncio

if sys.platform == 'win32':
    from .windows_event import *
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    __all__ += windows_events.__all__
```