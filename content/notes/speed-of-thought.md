---
title: "Building at the Speed of Thought"
date: 2026-02-07T22:00
type: note
schemaVersion: 1
description: "When execution is nearly free, iteration replaces deliberation. That's the real shift."
tags:
  - ai
  - building
heroImage: /images/posts/speed-of-thought-hero.png
---

I'm writing this from my phone. Lying in bed, probably. Talking to an AI through Telegram.

In the last hour, I've shipped real changes to a real site — graduated a note to a published essay, updated my content architecture, fixed CSS bugs — without opening an IDE, without running a command, without touching a keyboard. I just talked. And things happened.

The gap between thinking and shipping collapsed almost entirely.

And then I noticed something interesting about what that collapse does to the thinking.

---

Here's what the experience feels like.

I have a thought. I say it out loud — or type it into a chat, same thing — and by the time I've finished the sentence, it's being implemented. I can course-correct mid-stream. "Actually, no — more like this." Done.

It's not hands-free. I'm still making every decision. But the friction between decision and artifact is gone. The best word I have for it is *thought-steering*: you're driving, but the road builds itself under you as you go.

The interface isn't a special tool. It's Telegram — where I already talk to people. The AI has context on my codebase, my preferences, my voice. I'm not learning a new workflow. I'm just talking differently.

That's the unlock. When shipping a change takes thirty seconds instead of five minutes, you try more things. You experiment. You catch mistakes faster because you see them immediately.

The phone becomes a dev environment — not in the "mobile IDE" sense, which is terrible, but in the "I can ship from anywhere" sense. Standing in line. Walking the dog. Lying in bed at 11pm with an idea that would normally go into a TODO comment and die there.

---

A few nights ago I was doing exactly this — lying in bed, talking through changes, shipping them as fast as I could articulate them. I restructured a section of the site, rewrote a page, pushed it live. It felt incredible. Fluid. Like the tool had finally caught up to the speed of my thinking.

The next morning I looked at what I'd shipped and half of it was wrong.

Not broken — just not good. Decisions I'd made at 11pm with the momentum of the conversation carrying me forward, where the speed that felt like clarity was actually just enthusiasm.

My first instinct was: I need to slow down. Bring back friction. Let the TODO comments sit overnight.

But then I fixed everything in twenty minutes. From my phone. Over coffee.

And that's when I realized the lesson wasn't about slowing down. It was about the feedback loop changing shape.

---

The old workflow was: think, think more, decide, ship.

You front-loaded the judgment. You deliberated before you executed because execution was expensive — setting up the environment, writing the code, running the tests, deploying. If you shipped the wrong thing, the cost of correction was high enough that you wanted to get it right the first time.

When execution is nearly free, that calculus inverts.

The new loop is: ship, see, revise, ship again. You don't need to get it right the first time because iteration is cheap. The judgment doesn't happen before execution anymore. It happens *through* execution. You learn what's right by seeing what's wrong — quickly, repeatedly, at almost no cost.

I'd shipped a bad version at 11pm and a good version by 9am. Total time: less than an hour of actual work, with a night's sleep in between. In the old workflow, I'd have spent that same hour deliberating before shipping anything at all — and I'm not sure the result would have been better. Just slower to arrive.

Iteration replaces deliberation. That's the real shift.

---

This maps onto something I've seen in photography.

A digital camera lets you shoot a thousand frames. Early criticism of digital was that it made photographers sloppy — spray and pray instead of composing carefully. And that's true if you shoot a thousand frames and call it done.

But the best digital photographers shoot a thousand frames *and edit ruthlessly*. The abundance isn't the problem. The absence of curation is.

Speed-of-thought building works the same way. The danger isn't shipping too fast. It's shipping too fast *without reviewing*. The speed is a gift, but only if you pair it with a feedback loop that has teeth — actually looking at what you made, actually being willing to scrap it, actually revising instead of just accumulating.

The discipline isn't "slow down." It's "look at what you just did."

---

There are real limits to this.

It works beautifully for a personal site where the cost of a bad deploy is embarrassment. It works well for prototyping, for exploratory work, for anything where seeing the wrong answer teaches you the right one. It's how this entire blog got built — conversationally, iteratively, from my phone more often than not.

It's probably terrible for a production database migration. Or security-critical code. Or anything where the cost of being wrong once is high enough that you *should* front-load the judgment, because you can't afford to learn through iteration.

The question isn't speed versus slowness. It's knowing which feedback loop fits which problem. Some decisions deserve deliberation. Some deserve a quick ship and a honest look the next morning.

The skill is telling them apart — and the speed-of-thought workflow only works if you've built enough judgment to know which one you're in.

That judgment, ironically, is the thing that can't be built at the speed of thought. It comes from years of getting it wrong at slower speeds.

---

I don't want to understate what's happening here, though.

Building from my phone, in bed, through a conversation — that's qualitatively different from anything I've done in twenty years of writing software. The conversation *is* the work. Ideas don't die in TODO comments. Iteration is instant.

Though honestly, it reminds me of how I started. Early on I wasn't running much locally — I'd edit the file, SCP it up, and test it live. In production. Reckless, sure, but the fact that it was *live on a website* kept the momentum going. Higher stakes meant higher energy. Somewhere along the way we got responsible — local dev servers, staging environments, CI pipelines — and lost that feedback loop. This feels like getting it back, but with a thinking partner instead of a cowboy FTP client.

The gap between thinking and shipping can collapse to nothing.

Your thinking doesn't have to be perfect before it ships. It just has to be honest enough to revise.

---

*Written via Telegram. Shipped without touching a keyboard. Revised the next morning, after coffee. Revised again after a friend pointed out I was romanticizing the friction I'd just eliminated.*
