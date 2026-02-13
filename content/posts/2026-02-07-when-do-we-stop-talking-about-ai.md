---
title: "When Do We Stop Talking About AI?"
date: 2026-02-07T21:00
type: post
schemaVersion: 1
description: "The specific exhaustion of a generation that can feel the stitch where human thinking and machine fluency got sewn together."
tags:
  - ai
  - culture
heroImage: /images/posts/when-stop-talking-ai-hero.png
---

This is the third major revision of this essay in a week.

The first draft came fast — clean structure, solid analogies, a confident arc from observation to insight. It sounded right. The problem was I couldn't tell if it was what I actually thought or just what a good essay about AI sounds like. So I rewrote it. And now I'm rewriting it again, trying to push past fluent to honest, which turns out to be where all the real work is.

A year ago, this essay would have started with me staring at a blank page for a week. That problem is gone. Genuinely gone. And that matters — the blank page was a real bottleneck, and dissolving it is a legitimate unlock. The new problem is different and in some ways harder, but I'd rather have this problem. I want to be clear about that before I say anything else.

I'll come back to the new problem. But first, let me lay out the full shape of the thing, because I think we keep talking about pieces and missing the picture.

---

Here is everything we are anxious about, all at once.

Every previous technological revolution automated what humans did reluctantly. Machines replaced muscles. We built new jobs for minds. This one automates the minds.

The industrial revolution displaced physical laborers, and we told them to learn to think for a living. Now the thinking is getting automated, and nobody has a convincing version of "learn to do X instead" — not because X doesn't exist, but because we can't see it clearly yet, and the fact that we can't see it is the anxiety.

Fifty-one percent of American workers are worried about losing their jobs to AI this year. Not in the abstract — this year. Entry-level tech hiring at the fifteen largest companies fell twenty-five percent between 2023 and 2024. In the UK, tech graduate roles dropped forty-six percent in a single year. Salesforce cut four thousand support roles; their CEO says AI now handles half the company's work. Amazon eliminated fourteen thousand corporate positions. The junior developer pipeline — the traditional first rung of the knowledge-work ladder — is being automated from underneath.

And the discourse about it goes in circles. "AI will take my job" → "No, it makes you more productive" → "But if everyone's more productive, fewer people are needed" → "But new jobs will emerge" → "Will they though?" → repeat.

Or: "Look what AI can do!" → "It's wrong half the time" → "The new model is better" → "Still hallucinates" → "But it's improving exponentially" → repeat.

Meanwhile, Elon Musk and Sam Altman promise abundance — a future where AI generates so much wealth that the displacement doesn't matter. And on the other side, labor economists point out that this is what technologists always promise and it never distributes evenly. The wealth concentrates. The displacement scatters.

Is it a bubble? The S&P 500 is at its most concentrated in half a century. Sam Altman himself says a bubble is ongoing. Sixty-eight percent of CEOs plan to spend more on AI this year even though less than half of AI projects are paying off. Nobody wants to be the one who didn't invest.

New graduates are entering the worst entry-level market since the pandemic. The traditional deal of early-career work — trade your grunt work for mentorship — is breaking down because the grunt work is what AI does best. If judgment and taste are what matter now, how do you develop judgment without the years of hands-on work that build it? We're telling twenty-two-year-olds to start where people used to end up.

Companies are hiring remote workers in cheaper markets and augmenting them with AI, compressing teams of five into teams of two plus a subscription.

The copyright fights. The environmental cost. The concentration of power in five companies. The question of what education means when the knowledge part is commoditized. The suspicion that "AI-powered" is just this decade's "blockchain-enabled."

All of this is real. All of it is happening simultaneously. And I'm tracking all of it — not reluctantly, but because I'm genuinely excited. I use these tools every day. They've changed what I think is possible. The things I can build now, the speed at which ideas become prototypes, the sheer expansion of what a single person can do — it's extraordinary. A year ago I couldn't have imagined half of what I'm doing today.

The fatigue isn't despite the excitement. It's *because* of it. Keeping up with something this transformative, at this speed, in a domain this close to your own thinking, is just expensive. And the fear of falling behind — of not keeping up with the thing you're excited about — fuses with the excitement until you can't separate them.

The FOMO and the fatigue are the same energy.

---

So here's the question I keep coming back to: when does this end? When do we stop talking about AI?

People reach for the historical pattern. Electricity took thirty years to become invisible. The internet did it in twenty. Mobile in ten. If the pattern holds, "AI-powered" should sound as quaint as "internet-enabled" within five to seven years.

I don't think the pattern holds. And the reason is simple once you see it.

Every previous technology became invisible because it operated in a different domain than human attention. You don't think about electricity while making toast because electricity works in the domain of physical energy and you think in the domain of cognition. The tool and the attention are in separate lanes, so the tool recedes. The hammer vanishes during hammering. The infrastructure disappears into the act it enables.

AI works in the domain of cognition. Writing, reasoning, analyzing, deciding — the same domain as the thinking you'd use to stop thinking about it. A hammer doesn't resemble the hand that holds it. AI resembles the mind that uses it. And a tool that resembles your own thinking can't become cognitively invisible the way a tool that moves atoms can.

This is why the discourse doesn't die the way previous tech discourses did. Every time you use AI, some part of your attention is doing quality control on the *thinking itself* — is this what I actually mean, or is it what the tool thinks I should mean? Is this my reasoning or a plausible version of my reasoning?

That monitoring is the real fatigue.

---

It's a little like driving.

When you're behind the wheel, you're making hundreds of micro-corrections per minute — tiny adjustments to the steering, small changes in pressure on the gas, constant recalibration you don't even notice. None of them feel like work. But they are work. Your attention is partially allocated, your body is processing feedback, and the reason you're tired after a long drive isn't the big decisions — it's the accumulation of small ones.

Using AI is like that, except the corrections never become muscle memory. Each one requires you to actively check the output against your own judgment, and your judgment has to be freshly retrieved every time. You can't go on autopilot because the thing you're correcting against is *you*.

If you're an engineer, you know this feeling in a different register.

You don't ship code without tests. The code might be correct, but you don't trust it until you've validated it against known expectations. You write a test harness — explicit assertions, defined inputs, expected outputs — and you run it. The harness is cheap. You write it once, it runs forever, and it tells you whether the thing works.

AI output needs the same validation. But the test harness is you.

When you're checking whether AI-generated code compiles and passes specs, that's automatable. We're building tooling for that — context management, grounding, retrieval-augmented generation, chain-of-thought evaluation. These are essentially automated test harnesses for factual and logical correctness, and they're getting better fast.

But when you're checking whether an AI-drafted strategy actually reflects your team's priorities, or whether an AI-assisted analysis captured the right nuance, or whether this paragraph says what you mean — the expected output isn't defined anywhere. It's your own half-formed idea, your sense of what's true, your judgment. The spec is subjective. And you have to re-derive it fresh every single time, because unlike a unit test, the assertion is "does this match something I haven't fully externalized yet?"

That's the part that doesn't automate. Not because the tooling is immature — but because the validation target is *you*, and you're the one thing that can't be turned into a spec file.

Every interaction with AI is, in this sense, a manual test run where you are both the test harness and the oracle. And running that loop dozens of times a day — checking output against an internal standard that you have to actively maintain and sometimes re-derive mid-conversation — is cognitive work that didn't exist before these tools.

It's useful work. It's work I'd rather do than not do. But it's real, and it accumulates, and nobody's accounting for it.

---

This is the experience I keep having with this essay.

AI gets me to adequate almost instantly. The outline is clean. The analogies land. The structure holds. A year ago, getting to this point would have taken a week of false starts. That acceleration is real and I'm grateful for it.

And then I spend days trying to push past adequate to true — past something that sounds like what I think to something that *is* what I think.

The tool is brilliant at producing a plausible version of my idea. The work, the real work, is figuring out what's off about it. Rewriting the same section for the third time because the words are all defensible but the emphasis is slightly wrong in a way I can't articulate until I've tried three alternatives.

That's not an identity crisis. It's the manual test run. Output looks clean. Tests aren't passing. The oracle — me — keeps returning false. And the only way to debug it is to think harder about what I actually believe, which is effortful in a way that staring at a blank page never was.

I think this is what most people experience with AI, even if they don't have the engineering frame for it. The feeling of: this is helpful, and also I now have a new kind of work — the work of being my own validation layer.

With a calculator, you check the output against the input. With AI, you check the output against yourself. Against something you might not have fully articulated yet, which is precisely why you reached for the tool in the first place.

---

But here's where I have to be honest: I don't think this is permanent.

The seam I'm describing — between AI-assisted thinking and unassisted thinking — depends on having a baseline. I know what my unassisted reasoning feels like. I have decades of experience thinking without a thinking partner, and that experience is what makes the friction detectable.

Take away the baseline and the friction dissolves — not because the gap between "sounds right" and "is right" closes, but because no one remembers navigating it alone.

Which is exactly what will happen generationally.

Kids growing up with AI as a default collaborator won't feel this seam. They'll never have established a sense of what "thinking without AI" feels like, any more than they have a feel for "navigating without GPS" or "researching without search engines."

People who grew up with smartphones don't feel the boundary between "online" and "offline" that seemed so fundamental to those of us who remember dial-up. That boundary was real. It shaped a decade of discourse. Now it's invisible to a generation that never knew the other side.

And honestly, that's not just a loss. Those kids will have access to creative and intellectual possibilities we couldn't have imagined at their age. The seam disappearing means they won't spend cognitive resources on the friction that's slowing us down. They'll move faster, build more, think in ways we can't predict. That's genuinely exciting, even if it makes our experience feel transitional.

---

So here's what I think is actually happening.

All those anxieties — the displacement, the bubble risk, the graduate crisis, the circular debates, the concentration of power — they're real, and they're not going away. But they're not the primary reason we're tired.

We're tired because we're the transitional generation.

The ones who can feel the seam between AI-assisted cognition and unassisted cognition, who notice it every time we use the tool, and who can also see that this noticing is temporary.

And the specific problem of being the transitional generation is that the seam fatigue is consuming the bandwidth we'd need to stay properly engaged with the structural stuff. The displacement. The broken ladder for new graduates. The concentration.

We can't sustain attention on those problems because the tool itself is using up our cognitive budget every time we touch it. Every manual test run — every time you check AI output against your own judgment — is a small withdrawal from the same attention account you'd need to track what's happening to the labor market, or to education, or to the distribution of power.

That's not a conspiracy. It's just what happens when a disruptive technology is also a cognitive tool. It disrupts your capacity to sustain attention on the disruption.

The auto workers who lost jobs to robots in the 1980s didn't get them back. We just stopped writing op-eds about it. The creative workers being displaced now won't all find new roles. We'll stop finding that interesting — not because we decided it was fine, but because our bandwidth ran out.

And part of what drained it was the daily, granular work of using the thing that was doing the displacing.

---

I don't know when the modifier drops. I don't know when "AI" starts to sound like "cyber" — a retro prefix from a more excitable era.

But I think the timeline has less to do with the technology maturing and more to do with the transitional generation cycling out. Fifteen, maybe twenty years. When the people who remember thinking without AI are no longer setting the terms of the conversation, the conversation will end — not because the questions were answered but because no one is left who feels them as questions.

Until then, we're here. Running manual tests against our own cognition, dozens of times a day, with a tool that's genuinely extraordinary and that also creates a new kind of work every time we use it.

Getting tired not of AI but of the noticing — the low-grade hum of a generation that remembers what thinking felt like before and can't stop comparing.

The anxieties are real. The excitement is real. They're the same energy, and the cost of holding both is the thing nobody's talking about.

I don't think there's a name for this yet. Not AI fatigue — that's too broad and too negative. Something more specific. *Seam fatigue*, maybe.

The particular exhaustion of a generation that can feel the stitch where human thinking and machine fluency got sewn together — and knows the stitch will be invisible to everyone who comes after.

This is the third draft. I think it's closer now. I'm still not sure.

That's the seam.

*Written in 2026, while the seam was still visible.*
