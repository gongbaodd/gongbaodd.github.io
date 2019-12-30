---
type: post
category: tech
---
# 为Windows Terminal 2添加git bash的profile

粘贴以下代码到settings中。

```JSON
        {
            "guid": "{00000000-0000-0000-ba54-000000000002}",
            "commandline" : "\"%PROGRAMFILES%\\git\\usr\\bin\\bash.exe\" -i -l",
            "name" : "Bash",
            "startingDirectory" : "%USERPROFILE%",
            "icon" : "ms-appx:///ProfileIcons/{0caa0dad-35be-5f56-a8ff-afceeeaa6101}.png"
        }

```