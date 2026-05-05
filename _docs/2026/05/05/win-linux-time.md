---
type: post
category: tech
---
# Linux use RTC

when using dual boot, Windows and linux. The time is shown differently, as Windows uses RTC and Linux uses UTC. There are few hour difference.

Running the following command to adjust Linux to use RTC can fix this.

```sh
timedatectl set-local-rtc 1 --adjust-system-clock
```