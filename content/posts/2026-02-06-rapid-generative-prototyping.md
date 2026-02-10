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

I rebuilt this blog's design system three times in a week. Not because I'm indecisive — because the first two times, I opened Figma.

The first attempt was muscle memory. I mocked up a full homepage, type scale, color palette, component library. Five hours of pixel-pushing. Then I pasted the mockup into Cursor as a reference and asked it to build. The result looked 60% right and felt 0% right. The spacing was off, the color relationships were wrong, the typography didn't breathe. Cursor couldn't see what I saw in the Figma file because what I saw was relationships between elements, not the elements themselves.

The second attempt, I skipped the mockup and wrote a detailed prompt describing what I wanted. Better — the code was closer to usable. But every generation was different. Some had warm, editorial energy. Some looked like a SaaS landing page. There was no systematic way to tell the machine what "good" meant.

The third time, I didn't design anything. I wrote constraints. A token architecture: `--color-surface-warm` mapped to a specific OKLCH value, `--space-content` set to a 4px base unit, `--font-body` locked to Inter at 18px. Generative grammars: a post card must have a title and date, may have a description, cannot have more than three tags displayed. Variance budgets: headline length between 40 and 80 characters, content width exactly 720px, spacing from the scale only.

Then I ran the same sloppy prompt from attempt two. The output was consistent, on-brand, and buildable — because "on-brand" was no longer a feeling. It was a set of rules the machine could check.

---

Design has been running on print-era assumptions. The designer produces a static layout. A developer manually translates it into code. The handoff takes five to ten days. The designer's value is measured by speed in Figma — how fast they can push pixels into a mockup that someone else will rebuild from scratch.

AI broke this model. Tools like v0.dev, Lovable, Cursor, and Figma Make can generate "good enough" visual design in seconds. The mockup is no longer scarce. The handoff is no longer necessary. The pixel-pushing throughput that defined a designer's value is now the cheapest part of the stack.

This doesn't mean designers are obsolete. The best ones I've worked with have already adapted — they use generative tools to explore more options faster, then apply judgment to curate. More creativity, not less.

But the role is changing. The question isn't whether AI replaces designers. It's what design *becomes* when the artifact is no longer the bottleneck.

Figma's own 2025 AI Report captures the tension: developers use AI for core work at nearly double the rate designers do. Code generation works. Design generation is catching up but isn't reliable yet — 78% of practitioners say AI enhances efficiency, but only 32% say they can trust the output.

That gap — between efficiency and trust — is exactly where constraints live.

---

In [[Code Owns Truth]] I proposed a three-layer model: constraints bound the mutation space, prompts express intent, code is the source of truth. My blog redesign was where this model stopped being abstract.

The **prompt layer** is how humans talk to machines. "Make a card with a header and call-to-action." Useful, but prompts alone produce the kind of variance that sent me back to Figma the first time. Every generation is different. Some are good, some are garbage, and there's no systematic way to tell the machine what "good" means.

The **constraint layer** is the designer's new job. Not drawing the card — defining what a card *can be*. What's required, what's optional, what's forbidden. The token hierarchies, the spacing rules, the typography scales, the allowable states. The physics that makes prompts reliable.

The **code layer** is what ships. Generated within constraints, validated against them, versioned and testable. No ambiguity.

---

My token architecture has three tiers, and the hierarchy is doing most of the work. Primitives are raw physical values — `--gray-900: #111111`, a specific hex code. You never use these directly in components. Semantics are context-aware mappings — `--surface-base` points to `--gray-900` in dark mode and `--white` in light mode. The meaning is stable even as the value changes. Components are scoped overrides — `--card-bg` points to `--surface-layer`, which is itself a semantic token.

When the token architecture is right, you can change your entire color palette by editing primitives, and every component inherits the change correctly. When it's wrong — like my first two attempts — every generated component is a one-off that drifts from everything else.

On top of the tokens, **generative grammars** specify the structure of allowable UI. A card: header and body are required, image and footer and CTA are optional. The header can't exceed 60 characters. The CTA can only be primary, secondary, or ghost variant. The LLM can generate infinite variations. But it can only generate *valid* ones.

And then **variance budgets** — mathematical bounds on the output. Headline length between 40 and 80 characters. Tone constrained to formal, terse, or warm. Color values must come from semantic tokens, never hardcoded hex. Spacing must use scale values only. If a generated component violates the budget, it fails. No human review needed for the mechanical checks.

The designer ships these three things — token architecture, generative grammars, variance budgets — instead of mockups. The constraints are the deliverable.

---

This changes the workflow fundamentally.

The old process: PM writes requirements, designer interprets into mockup, engineer interprets mockup into code. Two handoffs, each losing roughly 40% of the original intent. Five to ten days per iteration. By the time you see working code, the requirements have often changed.

The new process: strategy becomes design physics (the constraints), a prompt generates code within those constraints, validation checks the output against the rules, and you ship or reject. Minutes, not weeks. The constraints are explicit and machine-readable — there's no interpretation loss. The system either passes or it doesn't.

That's what I mean by rapid generative prototyping. You're not designing screens. You're designing the rules that generate screens — and then generating ten or twenty variations in the time it used to take to mockup one. The exploration space explodes. The curation becomes the craft.

---

I've been working this way on smaller projects — this blog, a few internal tools — and the speed difference is real. Constraints plus generation plus validation is dramatically faster than the mockup-to-handoff pipeline. Where it breaks, I'm not sure yet. Probably at scale, where the constraints need to be tighter than I expect, where human review can't be automated away.

But "constraints are crystallized taste" is the sentence I keep coming back to. Constraints don't write themselves. Someone has to decide what matters, what's non-negotiable, what variance is acceptable. That's judgment. That's the thing AI can't do yet — and it's the thing most design education doesn't teach, because the old model valued execution speed over constraint quality.

The post-Figma designer might not open Figma at all. They write design physics before anyone touches a screen. They define grammars that make bad designs impossible. They review outputs, not mockups.

The source of truth is the constraint system. The artifacts flow from it. The judgment that made the pixels right — that doesn't go away when AI generates the artifacts. It becomes the only thing that matters.
