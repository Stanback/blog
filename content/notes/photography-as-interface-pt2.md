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

## The Viewfinder Is a UI

Before digital screens, cameras had viewfinders — optical systems that showed you what the lens saw. You pressed your eye to the camera and the world narrowed to a rectangle.

That rectangle was the first interface decision. Not the whole visual field — a *frame*. Edges that said: this matters, that doesn't. The viewfinder didn't show you reality. It showed you a **proposal** for reality. A version you might choose to keep.

Every interface does this. A dashboard isn't your business — it's a proposal about what matters in your business. A feed isn't the world — it's a frame around a sliver of it. The interface decides what's inside the rectangle. Everything else disappears.

The question isn't whether to frame. You can't not frame. The question is whether you're intentional about what you include — and honest about what you're excluding.

## Framing Is Viewport Design

In photography, "composition" sounds artistic. But it's really information architecture.

Where do you put the subject? The rule of thirds exists because edge placement creates tension; center placement creates stability. A face in the corner asks a question. A face dead center answers it.

This is viewport design. What's above the fold? What requires scrolling? Where does the eye land first, and where does it travel next?

I learned more about landing page design from studying Henri Cartier-Bresson than from any UX book. He understood that a frame isn't neutral. *Where* you place information changes *what* it means. A product in the center says "buy this." A product in the corner, with a human using it taking center stage, says "become this person."

Same content. Different frame. Different meaning.

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

**1. Every interface is a frame.** It includes some information and excludes the rest. Be intentional about both.

**2. Hierarchy is attention design.** Blur the unimportant. Sharpen the essential. Don't make users find focus — guide them to it.

**3. Exposure matters.** Too little information and users are lost. Too much and they're overwhelmed. Find the dynamic range where signal is legible.

**4. Feedback loops determine learning speed.** The tighter the loop, the faster users (and builders) improve.

**5. Tools shape perception.** The interfaces we use train how we see the world. Design accordingly.

**6. Constraints enable creativity.** A well-chosen limitation isn't a prison — it's a focusing lens.

---

The camera is the oldest interface I know. A hundred and fifty years of humans designing machines for seeing, iterating through countless form factors, controls, and paradigms.

Every interface problem we face in software — attention, hierarchy, information density, feedback, constraint — photography solved first. Or at least, explored first. The solutions are there, encoded in aperture rings and viewfinders and the hard-won wisdom of a century of visual thinkers.

I still learn more from studying cameras than from reading UX blogs. The fundamentals don't change. Light is information. The frame is a choice. The interface shapes the perception.

Everything else is implementation detail.

---

*Previously: [[What Cameras Taught Me About Software (and Life)]] — the gear arc from divergence to convergence.*
