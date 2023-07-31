Hello! I am Anton. And I will tell you about vue.js

**_What can we say about Vue?_**

Vue is a JavaScript framework for building user interfaces.
It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

**_Who developed framework?_**

Vue was created by Evan You. When he worked in Google, he came to the conclusion. That there are no ready-made solutions of rapid prototyping of complex web application user interfaces. At that time react was at an early stage of development. The main tools were complex frameworks such as Angular. To solve this problem Evan started development Vue.
Vue 3.0 was released on 18 September 2020. According to the developers improved productivity and integration with TypeScript. In addition, the whole code was rewritten to TypeScript, which gives advantages in flexible development.

Okey, let’s start with the simplest example of usage.
We create message variable with value “ Hello vue” and then mount vue component to the DOM to the 'div' with id app.

**_Vue has some Special features:_**

- Template Syntax
- Reactivity Fundaments
- Components
- Props
- Lifecycle Hooks

**_Template syntax_**

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. Under the hood, Vue compiles the templates into highly-optimized JavaScript code.

The double mustaches interpret the data as plain text, not HTML. In order to output real HTML, you will need to use the v-html directive:

Mustaches cannot be used inside HTML attributes. Instead, use a v-bind directive:

**_Reactivity Fundaments_**

In Composition API, the recommended way to declare reactive state is using the ref() function:

ref() takes the argument and returns it wrapped within a ref object with a .value property:

To access refs in a component's template, declare and return them from a component's setup() function:

You can also mutate a ref directly in event handlers:

When you use a ref in a template, and change the ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system.

**_Components_**

Components allow us to split the UI into independent and reusable pieces, and think about each piece in isolation. It's common for an app to be organized into a tree of nested components:

This is very similar to how we nest native HTML elements, but Vue implements its own component model that allow us to encapsulate custom content and logic in each component.

**_Props_**

Vue components require explicit props declaration so that Vue knows what external props passed to the component should be treated as fallthrough attributes.
In single fall components using 'script setup', props can be declared using the defineProps() macro:

In non 'script setup' components, props are declared using the props option:

In addition to declaring props using an array of strings, we can also use the object syntax:

**_Lifecycle Hooks_**

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.
Diagram for the instance lifecycle:

**_Thank you for your attention!_**
