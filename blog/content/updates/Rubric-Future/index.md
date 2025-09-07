---
title: "Rubric: Where It Is Today and Where We're Taking It Next"
date: "2025-09-06"
description: "The current state of the Rubric DSL and our plans for making it more versatile"
type: "update"
published: true
---

## **Where Rubric Is Today** 
Rubric today is deliberately rigid and limited. We built it to prove a point: that immutable constraints, even inflexible ones, produce better AI-generated code than no constraints at all. It's a proof-of-concept, [first introduced here](https://namin.seas.harvard.edu/pubs/lmpl-modularity.pdf). 

This rigidity has been revealing. It's shown us that AI, when truly constrained, can generate remarkably clean architecture. But it's also shown us that codebase architecture should not be prescribed — it should evolve with the code, adapt to the project's business needs, and suit the team working with it.

### **The Current Reality**
Right now, Rubric works. If you add to your codebase and use it as instructed, your AI will generate modular code with pretty solid architecture. 

But...

- It only works with the Cursor IDE
- The patterns are hardcoded — no custom pattern registry 
- No configuration
- Validation is still brittle, relying on regex

### **What's Next**

Now that we've convinced ourselves that a system like Rubric significantly improves AI's adherence to architectural rules, we're invested in pushing it further.

We're developing Rubric slowly, testing along the way, and iterating to ensure that every addition and modification is maximally beneficial to the system as a whole. 

In no particular order, here's where we see Rubric going next:

***Configuration***

Teams will be able to define their own "constraint tolerance" — how strict or flexible their architectural rules should be

Imagine a spectrum:

- Strict Mode: Current Rubric. Immutable constraints, no exceptions.
- Standard Mode: Constraints with documented override capabilities. Each override requires justification that becomes part of the code review process.
- Flexible Mode: Constraints as strong suggestions with warnings rather than errors.

Teams will also be able to define which constraints matter most to them. 

A financial services team might prioritize security constraints above all else. A startup prototyping quickly might focus on architectural boundaries while allowing more flexibility in implementation details.

***Adaptation***

We want Rubric to respect that different projects and teams have different needs:

- **Project Maturity Levels**: A greenfield project might start with flexible constraints to enable rapid development, then gradually tighten them as the architecture solidifies. A legacy modernization project might enforce strict constraints only on new code while gradually bringing old code into compliance.

- **Team-Specific Rules**: Each team will be able to define their own constraint profiles. The platform team might enforce strict infrastructure boundaries. The feature teams might have more flexibility in UI components. The security team might have override authority for security-related constraints.

***Language and Framework Agnosticism***

Rubric today focuses on JavaScript/TypeScript. We want to rewrite it to constrain any language AI can generate. Python services with proper separation. Go microservices with clean boundaries. Rust systems with memory safety constraints. The principle remains constant: constraints are law, regardless of syntax.

***Project-based Pattern Registry***

We're moving beyond hardcoded patterns to enable teams to define their own domain-specific constraints. Financial teams can create security.pci_compliant patterns. Healthcare teams can enforce privacy.hipaa_required. Gaming companies can define performance.frame_rate_critical. These patterns become first-class citizens in Rubric, validated and enforced just like built-in constraints. 

***IDE Integration and Tooling***

Imagine seeing architectural boundaries directly in your editor. Red highlights when AI is about to violate a constraint. Autocomplete that only suggests valid imports. Real-time validation as you type. We're building VS Code extensions and CLI tools that make constraints visible and friction-free. AI won't just be constrained — it will be guided toward correct architecture from the first character.


## **The Vision: Constraints as Collaboration**
Our ultimate goal is to make Rubric feel less like an intruder in your codebase and more like a transluscent engine that runs quietly between your prompt and the AI's code generation. It should integrate seamlessly into your workflow and adapt to your project's and team's needs. 

___ 
<br>

*[Try Rubric](https://github.com/graciolli-f/Rubric) for yourself. It's open source. We welcome contributions.*