---
title: "Rapid Generative Prototyping: Design in the Post-Figma Era"
date: 2026-02-06T10:00
type: post
schemaVersion: 1
draft: false
description: "Design is no longer artifact creation—it's constraint architecture. The three-layer model for the agentic economy."
heroImage: /images/posts/rapid-generative-prototyping-hero.png
tags:
  - design
  - ai
  - architecture
---

*Applying the three-layer model from [[Code Owns Truth]] to design: what happens when constraints replace mockups.*

---

Design has been running on print-era assumptions. The designer produces a static layout. A developer manually translates it into code. The handoff takes five to ten days. The designer's value is measured by speed in Figma — how fast they can push pixels into a mockup that someone else will rebuild from scratch.

AI broke this model. Not slowly, not partially — the economics flipped. Tools like v0.dev, Lovable, Cursor, and Figma Make can generate "good enough" visual design in seconds. The mockup is no longer scarce. The handoff is no longer necessary. The pixel-pushing throughput that defined a designer's value is now the cheapest part of the stack.

This doesn't mean designers are obsolete. The best ones I've worked with have already adapted — they use generative tools to explore more options faster, then apply judgment to curate. More creativity, not less.

But the role is changing. The question isn't whether AI replaces designers. It's what design *becomes* when the artifact is no longer the bottleneck.

Figma's own 2025 AI Report captures the tension: developers use AI for core work at nearly double the rate designers do. Code generation works. Design generation is catching up but isn't reliable yet — 78% of practitioners say AI enhances efficiency, but only 32% say they can trust the output.

That gap is where the new discipline lives.

---

In [[Code Owns Truth]] I proposed a three-layer model: constraints bound the mutation space, prompts express intent, code is the source of truth. Design is where this model gets concrete.

The **prompt layer** is how humans talk to machines. "Make a card with a header and call-to-action." That's useful, but prompts alone produce unacceptable variance. Every generation is different. Some are good, some are garbage, and there's no systematic way to tell the machine what "good" means.

The **constraint layer** is the designer's new job. Not drawing the card — defining what a card *can be*. What's required, what's optional, what's forbidden. The token hierarchies, the spacing rules, the typography scales, the allowable states. The physics that makes prompts reliable.

The **code layer** is what ships. Generated within constraints, validated against them, versioned and testable. No ambiguity.

The designer's role inverts. From pixel-pushing author of static layouts to architect of constraint systems that govern generative UI. The deliverable isn't a Figma file. It's a set of rules that tell AI what's allowed — and more importantly, what isn't.

---

What does a constraint system actually look like? Let me walk through one example fully rather than gesture at several.

A **design token architecture** has three tiers. Primitives are raw physical values — `--gray-900: #111111`, a specific hex code. You never use these directly in components. Semantics are context-aware mappings — `--surface-base` points to `--gray-900` in dark mode and `--white` in light mode. The meaning is stable even as the value changes. Components are scoped overrides — `--card-bg` points to `--surface-layer`, which is itself a semantic token.

The designer's job is engineering this hierarchy. Not picking colors for individual mockups — building the system of relationships that makes every generated component automatically consistent. When the token architecture is right, you can change your entire color palette by editing primitives, and every component inherits the change correctly. When it's wrong, every generated component is a one-off that drifts from everything else.

On top of the token architecture, you define what I'm calling **generative grammars** — machine-readable schemas that specify the structure of allowable UI. A card, for example: header and body are required, image and footer and CTA are optional. The header can't exceed 60 characters. The CTA can only be primary, secondary, or ghost variant.

The LLM can generate infinite variations of this card. But it can only generate *valid* cards. Invalid structures fail validation automatically.

And then **variance budgets** — mathematical bounds on the output. Headline length between 40 and 80 characters. Tone constrained to formal, terse, or warm. Color values must come from semantic tokens, never hardcoded hex. Spacing must use scale values only.

If a generated component violates the budget, it fails. No human review needed for the mechanical checks.

The designer ships these three things — token architecture, generative grammars, variance budgets — instead of mockups. The constraints are the deliverable. The artifacts flow from them.

---

This changes the workflow fundamentally.

The old process: PM writes requirements, designer interprets into mockup, engineer interprets mockup into code. Two handoffs, each losing roughly 40% of the original intent. Five to ten days per iteration. By the time you see working code, the requirements have often changed.

The new process: strategy becomes design physics (the constraints), a prompt generates code within those constraints, validation checks the output against the rules, and you ship or reject. Minutes, not weeks. And because the constraints are explicit and machine-readable, there's no interpretation loss. The system either passes or it doesn't.

This is what I mean by rapid generative prototyping. You're not designing screens. You're designing the rules that generate screens — and then generating ten or twenty variations in the time it used to take to mockup one. The exploration space explodes. The curation becomes the craft.

---

I want to be honest about where this thinking is.

I believe the framework is right. I've started working this way on smaller projects and the speed difference is real — constraints plus generation plus validation is dramatically faster than the mockup-to-handoff pipeline.

But I haven't battle-tested it at scale. I don't know yet where it breaks, where the constraints need to be tighter than I expect, where human review can't be automated away.

What I do know: "constraints are crystallized taste" is the sentence I keep coming back to. Constraints don't write themselves. Someone has to decide what matters, what's non-negotiable, what variance is acceptable, where the system should be tight and where it should be loose. That's judgment. That's strategy. That's the thing AI can't do yet — and it's the thing most design education doesn't teach, because the old model valued execution speed over constraint quality.

The post-Figma designer might not open Figma at all. They write design physics before anyone touches a screen. They define grammars that make bad designs impossible. They tune variance budgets until generation is reliable. They review outputs, not mockups.

Figma becomes optional — a polish tool, a legacy bridge for stakeholders who need to see the design. But not the source of truth. The source of truth is the constraint system. The artifacts flow from it.

---

I'll keep updating this as I learn more. The framework is a stake in the ground, not a finished building.

But the direction feels clear: design is moving from artifact creation to constraint architecture. The designers who thrive will be the ones who realize their value was never in the pixels. It was in the judgment that made the pixels right.

That judgment doesn't go away when AI generates the artifacts. It becomes the only thing that matters.
