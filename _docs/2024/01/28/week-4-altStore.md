---
type: post
category: plan
tags:
    - altstore
    - ios
    - ipa
    - moon
    - monorepo
---
# Week 4: AltStore

Since I can't be an Apple Developer, and I can't sell my phone and watch to change back to android. I tried to hack it in last week.

I finally found a way to install apps on my phone without being an Apple Developer. It's called [AltStore](https://altstore.io/). Thanks to the flutter app, [Blackhole](https://sangwan5688.github.io/). 

## How to pack a .*ipa file

In Xcode, you need a developer account to build or pack `*.ipa` files. But you can go round this by using `xcodebuild` command line tool. 

After a bit of research, I found the solution from [MrKai777](https://github.com/MrKai77/Export-unsigned-ipa-files)

### Firstly, make the project

I majorly work on multi-platform frameworks. If it is ionic or react native, then there is an `ios` folder. If it is expo, run `expo prebuild` to make the folder. I am not planning to use flutter for now, but I think it should be the same.

### Secondly, find the scheme

using the command find the scheme from `.xcodeproj` file.

```bash
xcodebuild -list -project <project_name>.xcodeproj
```

### Thirdly, Make an archive

Besides the `.xcodeproj` file there should be a `.xcworkspace` file. Use the scheme to make an archive.

```bash
xcodebuild -workspace <project_name>.xcworkspace -scheme <scheme_name> -configuration Release clean archive -archivePath unsigned.xcarchive CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO
```

then, you will get an `unsigned.xcarchive` file.

### Finally, make the ipa file

1. right click the `unsigned.xcarchive` click `Show Package Contents`.
2. Enter the `Products` folder rename `Application` to `Payload`
3. Compress `Payload` to make a `*.zip` file
4. Rename the `Payload.zip` to `<app_name>.ipa`

## How to install the ipa file

Just install the `*.ipa` in iOS won't work. You need to sign it first. If it just signing, there is a well known app (in mainland China) called [i4Tools](https://www.i4.cn/).

But there is a more convinient way to do this. Use [AltStore](https://altstore.io/).

I am using a PC. I will install it on Windows. 

1. Install iTunes and iCloud, not the microsoft Store version. Make sure to login in.
2. Install [the server](https://faq.altstore.io/getting-started/how-to-install-altstore-windows).
3. Start the server with Administrator permission.
4. Sometime it keeps to ask for the apple id login, just copy the `SQLite3.dll` file from iTune folder to AltStore folder.
5. connect the phone to the PC, it will install AltStore on the phone.
6. Open it on the phone, it will ask for a developer mode. It was in Settings -> Privacy -> Developer Mode. Turn it on.
7. Trust the developer in Settings -> General -> Device Management -> Developer App.

In the App, in MyApp Tab, click the `+` button, to install the `*.ipa` file. Every signed App can stay for 7 days. After that, you need to resign it again. And you can only have 3 signed apps at the same time.

## Working Experience

I work on a PC. To use a Mac fluently, I installed a Linux which runs VMware with Sonoma(14). That means to pack an App, I need to restart repeatedly. I tried Catalina(10.15) and Big Sur(11) on Windows. Big Sur is a little lagged, but still affordable. I am thinking to pack apps with a lower version Mac without rebooting. Or, maybe I will try to use github action for that. 

## Something Else

[moon](https://github.com/moonrepo/moon) a monorepo tool. Yes, I have used Nx for a while, there is still something uncomfortable. I am trying this new monorepo tool.

Paying rent in Thailand need to write a cheque. Honestly, it is my first time to write a cheque. Just go to the bank counter, ask for a number, remember to select English for Chinese. Or they will call you in Thai. Then give them the passport, the account and the money, sign the cheque, done.