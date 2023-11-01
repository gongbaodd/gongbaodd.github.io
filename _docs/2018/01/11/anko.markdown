---
type: post
category: tech
---

# 使用 anko 布局安卓应用

## build.gradle 配置

如[wiki](https://github.com/Kotlin/anko)修改两处

```groovy
// app(Module)
dependencies {
    implementation "org.jetbrains.anko:anko:$anko_version"
    implementation "org.jetbrains.anko:anko:$anko_version"
    implementation "org.jetbrains.anko:anko-commons:$anko_version"
    implementation "org.jetbrains.anko:anko-appcompat-v7:$anko_version"
    implementation "org.jetbrains.anko:anko-recyclerview-v7:${anko_version}"

}
```

```groovy
// app(Project)
buildscript {
    ext.kotlin_version = '1.2.10'
}
```

## 使用 ConstraintLayout

修改 build

https://github.com/AckeeCZ/anko-constraint-layout

```groovy
dependencies {
    implementation 'com.android.support.constraint:constraint-layout:1.1.0-beta4'
    implementation 'cz.ackee:anko-constraint-layout:0.6.5'
}
```

## 如何使用

```kotlin
class MainActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState bundle?) {
        super.onCreate(bundle)

        verticalLayout {
            val name = editText()
            button("sayHello") {
                onClick { ctx.toast("Hello, ${name.text}") }
            }
        }
    }
}
```

## 缺点

anko 里面除了简单的布局有 DSL 其它的需要去找(毕竟不是官方的)用起来还真不是特别方便
