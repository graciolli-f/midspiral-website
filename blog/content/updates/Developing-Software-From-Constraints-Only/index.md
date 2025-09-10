---
title: "AI Generated Software From Constraints Only"
date: "2025-09-09"
description: "We asked AI to generate an app from only constraint files (no prompts)"
type: "update"
published: true
---

After our most recent [improvement to Rubric](https://github.com/graciolli-f/Rubric/releases/tag/v1.1.0), a simple question popped up: can AI write an app from a set of rux constraint files only (no prompt)? 

This turned out to be a fun little experiment with a pretty cool result. You can find the code [here](https://github.com/graciolli-f/rux-only-test).  

## **Simple Process**
Our starting directory consisted only of the Rubric folder with core files, a set of 4 pre-written rubric files (Header.rux, TodoItem.rux, TodoList.rux and Todo.rux for types), and the .cursorrules file. The intent was to make a simple To Do app. 

Our prompt: "Create an app based on the rux files"

After a single run, we had a fully functional To Do app one `npm i && npm run dev` away from using. 

![Screenshot of the generated To Do app](./images/todo-app-screenshot1.png)

## **The Takeaway**
We didn't test this, but I would be willing to bet that with even a simple prompt that described some of the features and constraints we had in the files in natural language, the AI could have easily created a To Do app in one run. LLMs excel at To Do apps and this was so simple feature-wise that a vanilla LLM could have handled the task.

However, we weren't comparing to prompting here. We were asking the question: can the LLM handle this task *without* a natural language prompt? Can it read the rux files, and generate code that not only meets the rux file constraints but fills in the unspecified blanks? 

The AI interpreted vague patterns like `pattern.state-management` and `pattern.accessibility` correctly without explicit definitions. It also added reasonable extras not specified (CSS modules, main.tsx, error boundaries with detailed UI).

One point of failure was that the AI did violate some basic Rubric rules. For example, it created a main.tsx file without first creating a corresponding rux file. It also violated the GlobalSpecs.rux constraint `deny io.console.*` and added `console.error` to a presentation-only component (not the worst of sins).

Otherwise, this small, simple app was well-architected and fully-functional after one run, and had a reasonably pleasant UI. 

## More Questions We're Exploring
- How much architectural detail is useful to specify? Is there a point of diminishing returns? 
- Can this approach scale beyond toy examples?
- What patterns are worth prioritizing as constraints?
- Can we validate not only the rux syntax and the code, but also the LLM's adherence to the process?

This is just an experiment to see if architectural constraints can be both machine-checkable and useful for code generation. We don't know yet if this approach has practical value.
  
___ 
<br>

*[Try Rubric](https://github.com/graciolli-f/Rubric) for yourself. It's open source. We welcome contributions*

*[Read our recent paper](https://namin.seas.harvard.edu/pubs/lmpl-modularity.pdf): "The Modular Imperative: Rethinking LLMs for Maintainable Software"*