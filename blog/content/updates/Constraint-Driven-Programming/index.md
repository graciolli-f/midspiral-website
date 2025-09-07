---
title: "Constraint-Driven Programming: Making AI Architecturally \"Aware\" Through Immutable Rules"
date: "2025-09-06"
description: "How AI approaches code architecture and how immutable constraints will transform AI programming."
type: "update"
published: true
---

## **The Hidden Cost of AI-Generated Code**
We're in the middle of an AI coding revolution. [76% of developers](https://survey.stackoverflow.co/2024/) now use AI tools for code generation, and for good reason. AI can produce working code in seconds that might take humans hours to write. But there's a problem we're not talking about enough: AI doesn't understand software architecture.

In our recent collaboration with researchers at Harvard University ([Kravchuk-Kirilyuk et al.](https://namin.seas.harvard.edu/pubs/lmpl-modularity.pdf)), we observed AI modifying four separate files, breaking encapsulation by accessing private members, and turning a simple `App.js` component into a test showcase — all to implement what should have been a single-module change.

The code worked. The tests passed. But the architecture was destroyed and boundaries were violated.

This is the paradox of AI-generated code: it optimizes for immediate functionality over long-term maintainability. It's simply pattern-matching its way to the most efficient working solution, leaving heaps of technical debt along the way.  

## **The Architectural Blindness of LLMs**
To understand why this happens, we need to examine how LLMs approach code generation. Large language models are essentially sophisticated pattern-matching engines. They've seen millions of code examples and learned to recognize and reproduce patterns that appear to work.

But architecture isn't about patterns, it's about principles. Architecture is nuanced. It evolves. It's project-, team-, and phase-specific. A human developer can approach a codebase with intuition and infer architectural principles from the existing setup. An LLM does not infer, it mimics.  

Our paper documents this phenomenon in detail. We call it "architectural mimicry." LLMs create code with the surface appearance of good architecture while violating more nuanced underlying principles.

Consider this real example: We gave an AI a simple, well-architected Todo application with about 100 lines of code. Each module had one responsibility, clean interfaces between modules, and proper encapsulation with private members. We then asked the AI to "add functionality to get statistics about todos."

A human developer would recognize this as a perfect use case for a new, dedicated statistics module. The AI's response? It added the statistics functionality directly to the TodoStore, modified multiple other files, and in one test run, introduced a breaking change by modifying the `add()` method signature.

It was clear that, even when given an existing, well-structured codebase as a starting point, the AI simply didn't understand that architectural boundaries existed to be preserved, not crossed or circumvented.

## **The Rubric Solution: Immutable Constraints**
This is where [Rubric](rubric.midspiral.com) comes in. Rubric is a constraint-driven language specifically designed to make architectural rules immutable. Rubric presents constraints as unchangeable laws that AI must respect, not suggestions it can bypass. 

The core principle is simple: *You cannot modify constraints to fit your code. You must modify your code to fit constraints.*

Here's how it works in practice. Before any code generation, the AI breaks the prompt down into architectural constraints in .rux files (these can also be written by a human developer):


```
module TodoComponent {
    type: "presentation"
    
    constraints {
        deny io.console.*
        deny io.network.*
        deny imports ["../stores/", "../services/"]
    }
}
```

These constraints aren't documentation. They're not guidelines. They're laws that are validated before the code surfaces to the user. When AI tries to generate code that violates these constraints, it fails validation and is forced to find another approach that passes the validation.

## **The Console.log Problem: An Example**
Let's walk through a concrete example that illustrates how immutable constraints transform AI code generation.

The Scenario: You ask AI to add debugging output to a React component.

**Without Constraints**: The AI simply adds console.log statements throughout the component. Quick, easy, and — let's say in this team's architectural philosophy — wrong. Presentation components shouldn't have side effects.

**With Rubric Constraints**: The component has deny `io.console.*` in its corresponding .rux file constraints. The AI cannot add console.log directly. Instead, it must:

- Recognize the constraint violation (via the executable validation)
- Create a new debugger.rux file with allow io.console.*
- Generate a proper debugging module
- Import and use that module from the component

The result? More code, yes. But also:
- Centralized debugging that can be toggled on/off
- Presentation component remains pure
- Clear separation of concerns
- Testable debugging logic

The constraint didn't just prevent bad code — it forced the AI to adhere to an existing architectural philosophy.

## **The Pros and Cons of Immutable Constraints**
Let's be honest about what this approach means for AI-assisted development. If you are looking to spin up a quick-and-dirty prototype that just works and will never need to be inspected under the hood, something like Rubric may be overkill. But, if there's any intent of future codebase expansion, collaboration, or if you are planning to eventually ship to production, starting clean and staying clean will save tons of time and headache a few weeks or months down the line.

**The Downsides**

*Increased Initial Complexity*

Every AI interaction requires more context and uses more tokens. The AI isn't just consuming your prompt and spitting out code. It's consuming your prompt, all the relevant instruction and .rux files, writing new .rux files, running a validation script, and iterating on the results of the validation. It's a longer, more expensive process initially. 

*Slower Initial Development*

The AI can't take shortcuts and put a full application inside a single 1000 LOC html file. What might have been a 15-second generation becomes several minutes as the AI works through validation failures and generates proper architectural solutions.

*Some Patterns Become Impossible*
Certain quick-and-dirty solutions that developers might use for prototyping simply can't exist. The AI cannot generate them even if explicitly asked.

**The Benefits**
*Architectural Integrity Over Time*

Six months later, your AI-generated code still respects the same boundaries it did on day one. No gradual decay, no creeping violations.

*Predictable AI Behavior*

Once constraints are defined, you know exactly what the AI can and cannot do. No surprises, no unexpected modifications to unrelated files. 

*Reduced Review Burden*

When you know AI literally cannot violate certain architectural rules, code review becomes focused on business logic rather than architectural compliance.


## **Real-World Results**
In our experiments comparing AI code generation with and without Rubric constraints, the differences were dramatic:

**Experiment 1**: Simple Intra-Module Edit

*Task: "Add priority field validation to the Todo model"*

- Without Rubric: AI modified all four files in the application
- With Rubric: AI modified only todo.js as expected

**Experiment 2**: Complex Feature Addition

*Task: "Make the store support filtering todos by any field dynamically"*

- Without Rubric: AI modified multiple files, added complex query DSL, modified the renderer, turned App.js into a test showcase
- With Rubric: AI modified only store.js with a clean, focused implementation

**Experiment 3**: Architectural Recognition

*Task: "Add functionality to get statistics about todos"*

- Without Rubric: AI added the feature directly to TodoStore, modified multiple files, introduced breaking changes
- With Rubric: AI created a new, properly isolated statistics module

**Experiment 4**: Module Integration

*Task: "Add a new stats module that counts todos by status"*

- Without Rubric: AI violated encapsulation by directly accessing private store members (_nextId and _todos)
- With Rubric: AI properly used the public API, maintaining encapsulation

## **The Mindset Shift**
Adopting immutable constraints requires a fundamental shift in how we think about AI code generation. Instead of asking "How can I get AI to generate this quickly?" we ask "How can I constrain AI to generate this correctly?"

This is uncomfortable at first. Rubric turns AI into something more like a compiler — powerful but rigid, capable but constrained.

But this rigidity is the point. Just as we don't want compilers that sometimes ignore syntax rules, we shouldn't want AI that sometimes ignores architecture rules.

## **The Future of AI-Assisted Development**
As AI becomes more powerful, the temptation will be to give it more freedom — to let it handle larger refactoring tasks, generate entire systems, and make architectural decisions. This is the wrong direction. Because LLMs are not designed for system-wide tasks. We need scaffolding that ensures the LLMs power is being wielded correctly.

The goal isn't to make AI a better architect. It's to make architecture so explicit that AI doesn't need to understand it, it just needs to follow it. 

Right now, every engineering team working with AI is solving the same problem in isolation.

I've talked to countless talented engineers who have crafted elaborate solutions to maintain code quality when working with LLMs. They write detailed architectural guides in markdown. They create complex prompt templates. They build custom CI/CD pipelines to catch AI violations. They maintain extensive documentation about "how we use AI here."
Every team is reinventing the wheel. 

## **The Markdown Illusion**
The current state of AI architectural guidance is essentially sophisticated prompting. Teams write ARCHITECTURE.md files explaining their patterns. They create CONTRIBUTING.md documents outlining their rules. They maintain AI_GUIDELINES.md describing what the AI should and shouldn't do.

But markdown files are just fancy prompts. They're suggestions dressed up as documentation. They have three fundamental flaws:

- They're not validatable. You can write "never access private members" in your guidelines, but there's no way to automatically verify the AI followed this rule. Code review becomes a game of spot-the-violation.
- They're inconsistently applied. Every AI interaction requires including the right context, remembering the right guidelines, prompting the right way. Miss one step, and your architectural rules vanish.
- They degrade over time. As codebases evolve, these documents become outdated. The AI follows yesterday's patterns while the team has moved on. The guidelines become technical debt themselves.

Imagine if architectural rules weren't prompts but protocols. Not suggestions but specifications. Not documentation but executable contracts that AI cannot violate.

This is where the industry needs to go. Just as we don't expect every team to build their own compiler, we shouldn't expect every team to build their own AI constraint system. Constraints should be infrastructure — standardized, reliable, and invisible when working correctly.

Whether these constraints are eventually embedded directly in LLMs or remain as external scaffolding, the principle remains: architectural integrity must be guaranteed, not requested. The current approach of hoping AI respects your markdown guidelines is like hoping your database respects your mental model of the schema. 


## **The Principle Behind the Practice**
The principle of immutable constraints is fundamental for the age of AI-assisted development. When we make architectural rules immutable, we transform AI from a clever but chaotic code generator into a disciplined, predictable development partner.

Yes, it's harder at first. Yes, it's initially more expensive. Yes, it feels restrictive.

But it's also the only way to ensure that the code AI generates today won't become the technical debt you're fighting tomorrow.   

___ 
<br>

*[Try Rubric](https://github.com/graciolli-f/Rubric) for yourself. It's open source. We welcome contributions*

*[Read the paper](https://namin.seas.harvard.edu/pubs/lmpl-modularity.pdf): "The Modular Imperative: Rethinking LLMs for Maintainable Software"*