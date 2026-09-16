---
type: post
category: tech
tag:
    - agent
---

# Week 37: Pi Agent for Emails

This is my another try on automation email agents. I used to use IFTTT, Dify, n8n and openclaw to do automation to read my emails. But they didn't last long.

This time I am trying to use [pi agent](https://pi.dev) with deepseek.

Like openclaw, pi also supports many packages. But it is so light that did not even provide one UI. I installed [Pi web](https://pi-web.dev) for the web UI. However, it is quite unessesary, the UI is like a simple chatbox. Anyway, it provides the agent to run as a daemon.

`pi-mcp-adapter` and `pi-web-access` are two must install. Then I use `@patimweb/pi-email`, `@fookhsu/pi-scheduler` and `git:github.com/badlogic/pi-telegram` to read emails, send me summary with a cron job.

Different Email service has different ways to integrate:

- Gmail, need to generate App Passwords, then in the setting to give IMAP permission on this App
- Outlook, need to make an OAuth for a self made App in [Microsoft Entra Admin Center](https://entra.microsoft.com). Then give this client ID to pi agent.
- QQMail, QQ has IMAP service can open in settings

On telegram @BotFather to build a new bot. It will give you a string to connect pi.

Then I made a skill to summarize these emails. The notifications will be sent to me summary of emails every 10 A.M. and 10 P.M. I use deepseek v4 flash to do all the work. Even with the configuration, the total cost was lower than 2 yuan. The summarization token usage was not even shown on the deepseek dashboard. So I have to use langfuse to watch the usage. `pi install npm:pi-langfuse`, just use the online account is fine.

Eventually, one summarization uses `213,616 → 6,601 (Σ 220,217)` tokens, and assume using `$0.004956` money.