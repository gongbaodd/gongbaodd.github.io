---
type: post
category: fe
---
# 完成了30个kotlin安卓挑战

去年逛IT邦看到了关于Kotlin的铁人赛，30个安卓demo．毕竟不是我的原创，这里贴上原地址

https://ithelp.ithome.com.tw/users/20107329/ironman/1286

再贴上我的代码地址

http://gongbushang.com:3000/gongbushang/kotlinPlayground

## 我的测试机

说来我的测试机，可是我当年拿实习工资买的魅蓝，后来跑步摔碎了，现在打开更新下居然还能用，也是奇迹了．

![](https://wx2.sinaimg.cn/mw690/89d0a2e1ly1fnt8xpefslj20qo0zkwin.jpg)

## 01TapCounter

最简单的计数器

Kotlin 的 lamda 表达式的使用,
使用 kotlin 的一个好处，
获取 button 或者 textEdit 之类的组件不需要使用 findViewById 了

```kotlin
this.tapButton.setOnClickListener {
    currentNumber += 1
    numberTextView.text = currentNumber.toString()
}
```

## 02seekBarPercentage

progressBar 的使用

## 03ImgePicker

获取相机

```kotlin
val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

startActivityForResult(intent, ACTION_CAMERA_REQUEST_CODE)
```

获取相册

```kotlin
val intent = Intent(Intent.ACTION_PICK)
intent.type = "image/*"
startActivityForResult(intent, ACTION_ALBUM_REQUEST_CODE)
```

## 04ScalableImageView

自定义一个 ImageView

## 05WebSearch

webView

```kotlin
webview.webViewClient = webViewClient
webview.loadUrl("https://www.bing.com")
```

## 06ImageList

fragment 的高度要固定

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="260dp">
</android.support.constraint.ConstraintLayout>
```

## 07MyLocation

没法用谷歌地图, 改用高德地图, 主要还是要很多权限

```xml

    <!--允许程序打开网络套接字-->
    <uses-permission android:name="android.permission.INTERNET" />
    <!--允许程序设置内置sd卡的写权限-->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <!--允许程序获取网络状态-->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <!--允许程序访问WiFi网络信息-->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <!--允许程序读写手机状态和身份-->
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <!--允许程序访问CellID或WiFi热点来获取粗略的位置-->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

## 08BottomNavigation

没啥意思就是底部导航栏

## 09ImageSlider

ImageSlider的使用

## 10ProgressControl

控制 progressBar

## 11ActivitySchedule

日期弹框

```kotlin
  DatePickerDialog(
                    this,
                    DatePickerDialog.OnDateSetListener { _, year, month, date ->
                        cal.set(Calendar.YEAR, year)
                        cal.set(Calendar.MONTH, month)
                        cal.set(Calendar.DATE, date)

                        val time = SimpleDateFormat("yyyy-MM-dd", Locale.CHINA)
                        dateTextView.text = time.format(cal.time)
                    },
                    cal.get(Calendar.YEAR),
                    cal.get(Calendar.MONTH),
                    cal.get(Calendar.DATE)
            ).show()
```

时间弹框

```kotlin
TimePickerDialog(
                    this,
                    TimePickerDialog.OnTimeSetListener { _, hour, minute ->
                        cal.set(Calendar.HOUR_OF_DAY, hour)
                        cal.set(Calendar.MINUTE, minute)

                        val time = SimpleDateFormat("HH:mm", Locale.CHINA)
                        timeTextView.text = time.format(cal.time)
                    },
                    cal.get(Calendar.HOUR_OF_DAY),
                    cal.get(Calendar.MINUTE),
                    true
            ).show()
```

## 12GitHubStars

OkHttpClient

```kotlin
val client = OkHttpClient()
            val request = Request.Builder()
                    .url("https://api.github.com/users/$username/starred")
                    .build()

            client.newCall(request).enqueue(object: Callback {
                override fun onFailure(call: Call?, e: IOException?) {
                    Toast.makeText(this@MainActivity, "get data failed", Toast.LENGTH_SHORT).show()
                }

                override fun onResponse(call: Call?, response: Response?) {}
            })
```

## 13LocalStorage

存

```kotlin
val preference = PreferenceManager.getDefaultSharedPreferences(this)
            val editor = preference.edit()
            editor.putString("login_name", name)
            editor.apply()

```

取

```kotlin
val preference = PreferenceManager.getDefaultSharedPreferences(this)
            val name = preference.getString("login_name", "")
            if (name.isEmpty()) {
                Toast.makeText(this, "name is empty", Toast.LENGTH_SHORT).show()
            }
            nameTextView.text = name
```

## 14Ball

```kotlin
animator = ObjectAnimator.ofFloat(imageView4, "translationX", 0f, 600f, 0f)
animator.duration = 1500
animator.interpolator = AccelerateInterpolator()
animator.start()
```

## 15Notification

其实大部分API魅族都给砍了,所以加title啥的就没有必要了

```kotlin
val notify = NotificationCompat.Builder(this, "channel id test")
                    .setSmallIcon(R.drawable.img)
                    .setLargeIcon(BitmapFactory.decodeResource(resources, R.drawable.img))
                    .setContentTitle("Notification")
                    .setContentText("It's time")
                    .setVibrate(longArrayOf(300, 600, 300, 600))
                    .setLights(Color.RED, 1000, 1000)
                    .build()
            val noticeManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            noticeManager.notify(1, notify)
```

## 16PushMessaging

```kotlin
val intent = Intent("gongMsg")
intent.putExtra("message", text)
broadcast.sendBroadcast(intent)
```

## 17PullToRequest

fragment记得加高度

## 18SideMenu

安卓常见的左滑目录

## 19Sound

音乐播放器,还是用默认的style吧,换一个卡得不行

## 20ActivityTransition

Activity转场动画

## 21LayoutSwitcher

Grid布局变化

## 22LocalDatabase

本地的SQL

## 23speech

TTS, 魅族居然不支持

## 24Painter

Canvas

## 25Face

人脸检测, 但是并没检测出来我

## 26ActionRecieve - ActionSend

```kotlin
val intent = Intent()
intent.action = Intent.ACTION_SEND
intent.putExtra(Intent.EXTRA_TEXT, textEdit.text.toString())
intent.type = "text/plain"
startActivity(intent)
```

接受的时候 intentfilter 需要加入

```kotlin
<action android:name="android.intent.action.SEND" />
<category android:name="android.intent.category.DEFAULT" />
<data android:mimeType="text/plain" />
```

## 27ShakeIt

摇一摇

## 28Tabs

顶部 tab

## 29Floats

自定义悬浮框 和 右下角悬浮按键

## 30Video

和播放器其实类似
