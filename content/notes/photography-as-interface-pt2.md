---
title: "Photography as Interface"
description: "What camera mechanics teach us about designing for attention, perception, and control."
date: 2026-02-07T14:00
type: note
schemaVersion: 1
draft: true
heroImage: /images/posts/photography-interfaces-hero.png
tags:
  - craft
  - interfaces
  - photography
  - design
tension: "The camera is a UI for reality. What does that mean for the UIs we build?"
---

*Part 2 of [[What Cameras Taught Me About Software (and Life)|What Cameras Taught Me]]*

---

In [[What Cameras Taught Me About Software (and Life)|Part 1]], I wrote about the gear arc — diverging through every lens and light modifier, then converging back to simplicity. But there's another layer to what cameras taught me. Not about the *tools*, but about the *interface itself*.

A camera is a machine for seeing. More precisely: it's a **user interface for reality**. Every design decision — the viewfinder, the controls, the constraints — shapes not just what you capture, but how you perceive.

I've spent twenty years building software interfaces. The deeper I go, the more I realize the camera already solved many of the problems we keep rediscovering.

## Every Interface Inherits Constraints

The 35mm film frame — that 2:3 rectangle that defined photography for decades — wasn't a design decision. It was an accident of industrial history. Oskar Barnack built the first Leica by repurposing cinema film stock, which happened to be 24mm wide. He doubled the cinema frame length to get a bigger image, and landed on 24×36mm.

That's it. That's where the 2:3 aspect ratio came from. Not aesthetic theory. Not human vision research. Leftover movie film.

And then millions of photographers learned to *see* in 2:3. The constraint became the vocabulary.

This is how interfaces work. You don't design from a blank slate. You inherit constraints — technical, historical, sometimes arbitrary — and those constraints shape what's *thinkable*. The frame comes first. Perception follows.

**Some camera constraints that became creative vocabulary:**

- **Film size → aspect ratio.** 35mm gave us 2:3. Medium format gave us 1:1 squares and 4:5 rectangles. Each feels different — 2:3 has directionality, 1:1 is balanced and static. Instagram trained a generation to see in squares, then pivoted to 4:5 for portraits.

- **Viewfinder mechanics → how you relate to the image.** Early rangefinders showed you the scene *around* frame lines — you saw what was about to enter. SLRs showed you *exactly* what the lens saw — total immersion. Waist-level finders made you look *down*, reversed left-to-right, more contemplative. Each viewfinder type created a different cognitive relationship to reality.

- **Shutter mechanics → discrete moments.** You couldn't capture continuous motion until video existed. Photography was inherently about *choosing the moment* — a constraint that became the entire art form.

**The same pattern shows up everywhere:**

| Photography | UI | API |
|-------------|-------|-----|
| Film size → aspect ratio | Screen size → viewport | JSON format → data shape |
| Viewfinder type → how you see | Mobile vs desktop → interaction mode | REST verbs → action vocabulary |
| Shutter → discrete moments | Request/response → discrete interactions | Rate limits → finite calls |
| Lens mount → what glass fits | Platform → what components work | Schema → what shapes are valid |

The interesting question isn't "what did they choose?" It's "what did the constraints make possible — and what did they make invisible?"

## The Viewfinder Is a Mode of Perception

Before digital screens, you experienced a camera through its viewfinder — and the viewfinder type shaped how you thought about images.

**Rangefinders** (Leica, Contax) showed you the scene through a separate optical window, with bright frame lines overlaid. You saw *more* than the lens would capture. The world existed around your frame; you were selecting from abundance. This made you aware of edges — what was about to enter, what was about to leave.

**SLRs** (your Canons, Nikons) used a mirror and pentaprism to show you exactly what the lens saw. Nothing more, nothing less. The world *became* the rectangle. This felt like immersion — like being inside the photograph. But you lost peripheral awareness. The frame wasn't a selection from reality; it *was* reality.

**Waist-level finders** (Hasselblads, twin-lens Rolleiflexes) made you look *down* at a ground glass. The image was reversed left-to-right. This forced slower, more deliberate composition — your brain had to work harder, which made you more conscious of what you were doing.

Each viewfinder was an interface that shaped perception differently. Same photographer, same scene, different viewfinder — different photographs. The tool wasn't neutral.

The software parallel: mobile vs desktop isn't just a screen size change. It's a different *mode* of interaction. Thumb-scrolling on a subway vs. mouse-clicking at a desk. The "viewport" changes behavior, not just layout.

## Framing Is Information Architecture

In photography, "composition" sounds artistic. But it's really information architecture.

Where do you put the subject? The rule of thirds exists because edge placement creates tension; center placement creates stability. A face in the corner asks a question. A face dead center answers it.

This is viewport design. What's above the fold? What requires scrolling? Where does the eye land first, and where does it travel next?

I learned more about landing page design from studying Henri Cartier-Bresson than from any UX book. He understood that a frame isn't neutral. *Where* you place information changes *what* it means. A product in the center says "buy this." A product in the corner, with a human using it taking center stage, says "become this person."

Same content. Different frame. Different meaning.

The API version: the shape of your JSON response is a frame. What's at the top level? What's nested? What's included by default vs. requiring an extra call? These aren't just technical decisions — they're *information architecture*. They tell consumers what matters and what's secondary.

## Depth of Field Is Attention Design

A wide aperture (f/1.4, f/2) gives you shallow depth of field. The subject is sharp; the background dissolves into blur. A narrow aperture (f/11, f/16) keeps everything in focus — foreground to infinity.

This isn't just an aesthetic choice. It's **attention design**.

Shallow depth of field says: *look here, ignore that*. It's visual hierarchy enforced by physics. The blur isn't decorative — it's information architecture. It tells your eye what matters.

Deep depth of field says: *everything matters equally*. It trusts the viewer to find their own focus. It's democratic but demanding — more cognitive load, less guidance.

Every interface makes this choice. Do you spotlight one action and blur the rest? Or present everything with equal weight and let users decide? 

The best interfaces do both — clear hierarchy for the primary task, but depth available when you need it. Like a photograph where the subject is sharp but the context is still *there*, soft but legible, ready if you look.

## Exposure Is Information Density

Exposure is how much light hits the sensor. Too little and the image is dark — shadows swallow detail. Too much and it's blown out — highlights become featureless white.

Good exposure preserves **dynamic range**: detail in the shadows *and* the highlights. The full spectrum of information, captured and legible.

I think about this with dashboards. Underexposed: not enough data, you can't see what's happening. Overexposed: too much data, the signal is washed out by noise. The art is finding the range where information is *present but not overwhelming*.

Most analytics tools are overexposed. They show everything, which means they show nothing. The important signal is buried in a wall of metrics that all seem equally bright.

The best tools are properly exposed. They show you the full dynamic range — the highs and the lows, the signal and enough context to interpret it — without blowing out into noise.

## Focus Isn't Always the Goal

There's a reason portrait photographers love soft focus. A tack-sharp image shows every pore, every imperfection. Sometimes that's what you want — documentary honesty. But sometimes you want the dream, not the document.

Soft focus hides what doesn't matter and lets the viewer's imagination fill in the rest. It's an abstraction. You're not showing less — you're showing *differently*. The information is still there, just... gentler.

I think about this when designing interfaces. Not everything needs to be pixel-precise. "About 5 minutes ago" is often more useful than "4 minutes 37 seconds." A sparkline tells you the trend without drowning you in data points. A progress bar that says "almost done" can be more honest than one that says "94.7%."

I should probably mention: I have mild nearsightedness (-1.5) and some astigmatism. I technically should wear glasses, but I usually don't unless I'm driving at night. Most of the time, I navigate the world in soft focus. And it's... fine? My brain fills in what my eyes blur. I recognize faces, read signs (close enough), live my life. The abstraction works.

That's the point. Precision matters when the stakes are high — night driving, reading medication labels, debugging production. But for most of life? The soft version is sufficient. Maybe even preferable. Less noise, more gestalt.

Precision isn't always clarity. Sometimes the soft version communicates better than the sharp one. Sometimes the abstraction is the feature.

## Focal Length Is Perspective

A 24mm wide-angle lens exaggerates distance. Things close look huge; things far look tiny. The world feels expansive, dramatic, slightly distorted.

A 200mm telephoto compresses distance. Foreground and background seem to stack together. The world feels flattened, intimate, stacked.

Same scene. Different lens. Different *meaning*.

This is zoom level in interface design. The strategic view (wide) shows the ecosystem — how everything connects, where you fit in the bigger picture. More context, more cognitive load, less detail on any single thing.

The tactical view (telephoto) isolates the task. Less context, more focus. You see the thing clearly but lose the surroundings.

Neither is right. Both are tools. The question is: what does the user need *right now*? And can you let them zoom?

## The Sensitivity/Noise Tradeoff

ISO controls sensor sensitivity. Crank it up and you can shoot in near darkness — the sensor amplifies faint light into visible image. But amplification has a cost: noise. The higher the ISO, the grainier the image.

This tradeoff is everywhere in systems design.

Want to catch every potential fraud case? Turn up the sensitivity. But you'll also flag a lot of legitimate transactions — noise. Want to reduce false positives? Turn down the sensitivity. But you'll miss some real fraud — lost signal.

Alerting systems, anomaly detection, spam filters — they all live on this curve. There's no free lunch. More sensitivity means more noise. Less noise means missed signals.

The art is knowing where to set the dial for your context. A hospital monitor should be sensitive — false alarms are better than missed emergencies. A notification system should be quieter — alert fatigue is real. Match the ISO to the stakes.

## Time and Motion (A Stretch, But...)

Shutter speed controls how time collapses into a single frame. Fast shutter (1/1000s) freezes motion — a hummingbird's wing, a water droplet, a moment crystallized. Slow shutter (1s) blurs motion — car lights become streaks, waterfalls become silk, time becomes visible.

The software parallel is real but less direct: do you show the instant or the trend?

A real-time dashboard is a fast shutter — here's what's happening *right now*. A trailing average is a slow shutter — here's the motion over time, smoothed into a pattern.

Point-in-time snapshots are useful for debugging. Trends are useful for understanding. Most good analytics do both — the instant and the blur, the moment and the motion.

This one's a stretch, I know. But there's something there about how we collapse time into legible form. Photography does it with shutter speed. Interfaces do it with aggregation windows and refresh rates.

---

## Controls Shape Perception

Here's the part that took me years to understand: **using a camera changes how you see without the camera.**

After enough time with a 35mm lens, I started *seeing* in 35mm. Walking down the street, I'd notice frames — "that would work at f/2, that needs f/8." The interface had trained my perception.

After shooting manual exposure for years, I started noticing light differently. The quality of window light at different times of day. The way a single overhead bulb creates harsh shadows. I wasn't just using the camera's interface — I was *internalizing* it.

This is the deepest lesson: **we become what we interface with.**

Use Excel every day and you start seeing the world in rows and columns. Use Twitter every day and you start thinking in hot takes. Use Figma every day and you start noticing spacing and alignment everywhere.

The tools we use shape the thoughts we think. Not just while using them — afterward. The interface trains a way of seeing that persists.

This is power. And responsibility. When you design an interface, you're not just designing a tool. You're designing a *mode of perception* that users will carry with them.

## Film vs. Digital: Waterfall vs. CI

The transition from film to digital wasn't just a technology upgrade. It was a paradigm shift in feedback loops.

With film, you shot blind. You made your choices — exposure, composition, moment — and then you waited. Days, sometimes weeks, until the lab returned your prints. The feedback loop was long. You learned slowly, in batches. You had to be *right* before you pressed the shutter, because you couldn't iterate in real time.

This is waterfall development. Plan everything, execute, hope it works. Learn from the postmortem.

Digital changed everything. Shoot, review, adjust, shoot again. The feedback loop collapsed to seconds. You could experiment in real time. Make mistakes cheaply. Learn by doing, not by planning.

This is CI/CD. Ship small, get feedback fast, iterate continuously.

I became a better photographer in one year of digital than in five years of film. Not because digital is better — film has qualities digital still can't match — but because the **feedback loop** was tighter. I could learn faster.

The lesson for software is obvious but easy to forget: the speed of your feedback loop is the speed of your learning. Anything that lengthens the loop (slow builds, manual QA, delayed deploys) is a tax on improvement. Anything that shortens it (hot reload, feature flags, observability) is an investment in getting better faster.

## The Camera as Constraint System

Every camera is a system of constraints.

The lens constrains your angle of view. The aperture constrains your depth of field. The shutter speed constrains motion. The ISO constrains noise. You work within these constraints or you fight them.

But here's what I learned from [[What Cameras Taught Me About Software (and Life)|converging to simpler gear]]: **the right constraints don't limit you. They focus you.**

A fixed 35mm lens means you can't zoom. So you move. You get closer or farther. You engage with the scene physically instead of optically. The constraint forces a different kind of seeing.

A single softbox means you can't light from every angle. So you learn what one light can do. You discover Rembrandt lighting, split lighting, all the techniques that masters used for centuries with nothing more than a window.

The constraints aren't bugs. They're features. They're the frame that makes composition possible.

---

## What Interfaces Taught Me

Cameras taught me to see interfaces differently:

1. **Every interface is a frame.** It includes some information and excludes the rest. Be intentional about both.

2. **Hierarchy is attention design.** Blur the unimportant. Sharpen the essential. Don't make users find focus — guide them to it.

3. **Sharpness isn't always clarity.** Sometimes the abstraction communicates better than the precision. "Almost done" can be more honest than "94.7%."

4. **Zoom level changes meaning.** Wide shows context; telephoto shows detail. Neither is right. Let users choose their perspective.

5. **Sensitivity has a noise cost.** Every detection system trades false positives against missed signals. Match the dial to the stakes.

6. **Exposure matters.** Too little information and users are lost. Too much and they're overwhelmed. Find the dynamic range where signal is legible.

7. **Feedback loops determine learning speed.** The tighter the loop, the faster users (and builders) improve.

8. **Tools shape perception.** The interfaces we use train how we see the world. Design accordingly.

9. **Constraints enable creativity.** A well-chosen limitation isn't a prison — it's a focusing lens.

---

The camera is the oldest interface I know. A hundred and fifty years of humans designing machines for seeing, iterating through countless form factors, controls, and paradigms.

Every interface problem we face in software — attention, hierarchy, information density, feedback, constraint — photography solved first. Or at least, explored first. The solutions are there, encoded in aperture rings and viewfinders and the hard-won wisdom of a century of visual thinkers.

I still learn more from studying cameras than from reading UX blogs. The fundamentals don't change. Light is information. The frame is a choice. The interface shapes the perception.

Everything else is implementation detail.

---

*Previously: [[What Cameras Taught Me About Software (and Life)]] — the gear arc from divergence to convergence.*
