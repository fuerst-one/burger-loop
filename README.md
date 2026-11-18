# Burger Loop

A German-language programming tutorial that explains control flow through an animated burger restaurant. Learners follow highlighted code as the chef assembles a burger, step through each operation, and then build a solution from draggable code blocks.

[Open Burger Loop](https://burger-loop.fuerst.one) · [Alexander Fürst's portfolio](https://fuerst.one)

## Learning experience

- Lessons cover `if`, `while`, `do-while`, arrays, `for`, associative arrays, and `foreach`.
- Code highlighting, explanations, and burger animations stay synchronized as learners play, pause, change speed, or move one step at a time.
- A guided introduction explains the controls and the cooking metaphor.
- Code-block exercises let learners assemble and check a solution after a lesson.
- Responsive layouts and a theater mode give the animation and code different amounts of space.

## Technical implementation

The application is a Vue 2 single-page app using Vue Router 3, BootstrapVue, mo.js, syntax highlighting, SCSS, and Vue CLI 3's PWA tooling.

Lesson views supply source snippets, animation-step arrays, burger-layer states, and quiz templates to shared components. Each animation step links a source-code position with an explanation and visual state. The exercises compare arranged code blocks with their lesson template; the application uses authored teaching sequences rather than executing arbitrary learner code.

The tutorial runs in the browser without an application backend or account system. Cookies remember whether the introductory tour has been completed.

## Source map

| Path                            | Responsibility                                                               |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `src/views`                     | Lesson content, source examples, animation sequences, and exercise templates |
| `src/components/Animation.vue`  | Playback, stepping, timing, and code/animation coordination                  |
| `src/components/Burger.vue`     | Burger layers and visual effects                                             |
| `src/components/Sourcecode.vue` | Highlighted source presentation                                              |
| `src/components/Quiz.vue`       | Draggable code blocks and solution checking                                  |
| `src/router.js`                 | Lesson routes and navigation                                                 |
| `src/assets`                    | SCSS, illustrations, icons, and animation assets                             |
| `src/main.js`                   | Application setup and presentation switches                                  |

## Development

This is a historical university teaching project with its original Vue CLI 3 and `node-sass` 4 toolchain. It has no pinned Node.js version. Native Sass dependencies constrain which Node/OS combinations can install it, so a current Node.js installation is not a verified build environment. See the [node-sass compatibility table](https://github.com/sass/node-sass#node-version-support-policy).

The repository's development workflow is:

```sh
npm install
npm run serve
```

Use the development URL printed by Vue CLI. No API credentials or database are required.

```sh
npm run lint
npm run build
```

The production build is emitted to `dist`. Since Vue Router uses history mode, static hosting needs an index-page fallback for lesson URLs such as `/while`. There is no automated test script in this checkout.

## Project and authorship

Developed as a university teaching project by **Alexander Fürst and Christiane Pluta**. Alexander implemented the application and most of the UI; the illustrations were created jointly. The recipe-and-cooking metaphor makes repeated steps and control flow visible to programming beginners.

The repository preserves the historical implementation. Its toolchain should be reviewed before a new deployment or substantial extension.
