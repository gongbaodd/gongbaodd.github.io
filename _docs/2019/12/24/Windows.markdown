---
type: post
category: life
---
# Windows命令行默认使用英语

今年我给我买了圣诞礼物，Inspiron 7391 2in1。其实也不是特意买的，主要是因为我的XPS自杀（经查，应该是主板电池没电，然后XPS自己设计有个问题导致无法开机也无法充电...WTF）。

在给这个机器装系统的时候我惊讶地发现，原来给中国提供的Windows是经过阉割过的Windows家庭版，只能用中文！窝里割打草...因为开发关系，希望系统能是英文版，这可怎么办？

搜了一下，其实命令行时可以使用英文的，只需要执行下面命令。

```shell
chcp 437
```

如果想改成中文将437改成936即可。

另外，还搞到一个神操作，可以让Windows更新更新应用为英语。修改注册表```HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Nls\Language```中InstallLanguage将0804改成0409，后来更新进来的应用就变成英文的了。