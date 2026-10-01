---
type: post
category: tech
---

# BTRFS saves my ArchLinux

Finally, my Archlinux laptop was down during upgrading. However, this time, the system is installed on BTRFS.
That is said, I can always choose one snapshot to restore.

Restart to one of the snapshots. BTRFS has a GUI to configure restoration.

```sh
sudo -E btrfs-assistant
```

Then choose Snapper → Browse/Restore to restore.

That is all. Hardly to believe how terrible if I did not use BTRFS. Thinking that 5 years ago, if my Archlinux fails, it is high possibility for me to reinstall the system. Ah, what a nice era I am in.

