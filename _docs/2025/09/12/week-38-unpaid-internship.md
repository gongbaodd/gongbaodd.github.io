---
type: post
category: plan
series:
    name: "website-rebuild"
    slug: "website-rebuild"
---

# Week 38: Interns are UNPAID in Estonia?!

Wow, I'm genuinely shocked! 🤯 I just found out that unpaid internships are a super common thing here in Estonia. It explains so much—like why all the recent internship offers I turned down were unpaid. For a minute there, I was wondering what was wrong with these companies, but then my professor set me straight.

I was lucky enough to have two paid internships back when I was an undergrad in China, and I even got to mentor two paid interns myself. I originally thought maybe it was just a "communism thing," but then I talked to friends in Thailand, Pakistan, and Nigeria, and they all said paid internships are the norm there, too. Some countries even have laws protecting interns' rights to get paid!

I threw a question up on [Reddit](https://www.reddit.com/r/Eesti/comments/1n9gsyy/is_unpaid_internship_common/), and most Estonians there said the issue might be with the schools. So, I checked my school's plan: 156 hours for an internship. That's super short—in China, that's like a two-week workload. An experienced programmer could maybe finish a small tutorial project in that time, with no bug fixes or retrospectives. Honestly, I get it; I wouldn't pay for that kind of internship either. 🤷‍♂️

---

## 🤔 A Deeper Dive into the Unpaid Gig Economy

This whole thing has me thinking. Maybe it's because when you hit 30, you start caring more about society, even if it's not your own. People in Europe often complain that immigrants are taking their jobs (now it's AI), but let's be real. If you're a young European kid, would you rather take an unpaid tech internship or a paid gig as a delivery driver or Uber driver?

And if you're not getting trained through an internship, how are you supposed to compete with people from developing countries who are already pre-trained? It's not that immigrants are taking their jobs; it's that people are giving them away. It's pure capitalism, man. 💸

I still really want to find an internship here in Tallinn. I've done plenty of remote work, but it's not the same. It'll be tough, though. No one wants to mentor someone with twice or three times their experience—I've seen it happen at hackathons over the past few years. So, I'll probably start looking for a full-time job, which a Redditor actually suggested. The worst-case scenario? I end up doing remote work for my friends' companies back in China. Ugh, I really don't want to come all the way to Europe just to keep working on Chinese projects.

---

With only a month to find an internship, I've decided to build a web version of my resume. I used to create a custom resume for every company as a sign of respect, but after years, I've realized most recruiters just look at your LinkedIn profile anyway. 🙄

## 🖨️ Bringing the Web to Print with `@media print`

I totally forgot that I used to have a web-based resume! Back in 2018, I even wrote [a blog post](/fe/2018/08/05/css-grid-layout) about using `@media print` to make a website printable with a clean layout. I was reminded of it recently while reading [Martin Tournoij's blog](https://www.arp242.net/); he has his CV right there on his website. So, I decided to do the same and rebuilt my web CV for this new site.

So agian, I picked up [the web CV](/resume) and remade it in this new website rebuild.

It seems `@media print` really took off around 2018. Many libraries, like the one I almost used and then ditched, `paper.css`, stopped getting updates after that. Since the CSS library is pretty old, it's probably better to just copy-paste the code instead of installing it globally, just in case some body attributes mess with your personal settings.

To hide components I don't want in the printed version (like a search bar on a PDF), I simply hide everything under the body and then reveal only the content I want, positioning it `absolute`.

```CSS

@media print {
    body * {
        visibility: hidden;
    }

    .content {
        position: absolute;
        left: 0;
        top: 0;
    }

    .content,
    .content * {
        visibility: visible;

    }
}
```

There is still compatibility problem. In Firefox, a flex box wrap will cause a new page. But it is easy to fix. Thank god no one uses IE any more 👀.