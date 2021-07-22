# BudgetSoft Paint

A very simple paint program.


### Introduction

Ever used [MS Paint](https://en.wikipedia.org/wiki/Microsoft_Paint)? It was a very simple paint program for Windows. We're going to take that limited-feature app and implement... even fewer features.

Welcome to a fake MS Paint. Welcome to... BudgetSoft Paint!


### Setup

You may have noticed that there is no JavaScript. But there is some HTML and CSS. Let's look around, shall we?


### We Shall

First, the HTML. We have three sections:

1. The palette.
2. The brush.
3. The canvas.

We'll be checking what *classes* are present on those items in order to know what to do when the user clicks something. Did they click a color on the *palette*? The *brush* should get that color. Did they click the *canvas*? That canvas square should get the *brush*'s color. Pay careful attention to the logical flow of the app, and if you need some logical flow reference, [see the hosted solution to BS Paint](https://ci-wdi-900.github.io/bs-paint/).

Did you notice how all three sections listed above have `.color-${n}` classes on them or their elements? That brings us to the CSS, which has those classes, but no actual color assigned to them. Put some code in there to give `color-1` and `color-2` and so on each a background-color... but keep the same class names. That way we can change what `color-3` is any time we want, without having to change the name throughout the code from `purple` to `mauve`. Additionally, this drives home that we're not changing CSS directly... just classes!

Once you've got those colors defined, it's on to layout!


### Flex All The Things

This isn't a terribly complex layout, but it's in some ways perfectly suited to Flexbox; we want a single, centered column of elements. (For reference, see the hosted solution!)

You've got a pretty good starting point, in that some previous engineer (before leaving to start his own company, no doubt!) has left behind some CSS to indicate the Flexbox code they were planning to write. You have several rules with `display: flex` in them, but no indication of what particular Flexbox properties they were planning to write.

Your job will be to finish that job. Specifically: the `app` overall is clearly supposed to be one big column. The `headings` maybe too? What about `brush-selection` and `paint`? What alignment and justification rules should they all have, if any? Do your best to copy the layout of the solution, but also... feel free to make different choices!


### BS Paint's JavaScript


It will be JavaScript's job to connect all the pieces logically, with event listeners and DOM manipulation galore. **We'll be using class tools to change the CSS here exclusively.** Do *not* use any `.style` attributes! If we change the class on an element, it will get all the CSS rules from that class. Neat stuff!

Here are some tools you can use:

* For now, stick to `click` events. We can tackle cooler stuff in the next section!
* `querySelectorAll` to grab all elements that match a certain selector
* `addEventListener` to give an element a function it should run on click
* `for of` loops (or `.forEach`?!) to give each element in a list its listener
* `classList` and [its many awesome methods](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Methods). 4 out of 5 DOM manipulators recommend this tool. There are examples there, but do some research for an article specific to whatever method you want to use!


### Hints On The Basic JS

* The current color of every single element is its second class. That means it has a specific index. We can easily find out what the color the paintbrush currently is using this information.
* We can use `.add` and `.remove` and `.toggle`, but the cleanest solution will involve `.replace`. Think about what the old class is on the element you wish to change, and what class you'd like to `.replace` it with. Check the docs in the above section for how to use it if you're unsure!


### Good Luck!

And may the BS be with you.


### Some Not-Quite-Stretch-Goal Next Steps

##### Adding The Ability To Paint With More Than Clicks

It is highly advised that you get the above done first before you get clicking-and-dragging implemented!

But assuming you've got that done, here we go!

* We're going to need a separate function for handling mouseovers from handling just clicks. (This is because they're considered separate events from the DOM's perspective, and you can easily get a bug where they both fire and conflict if you're not careful!) For now, just copy your click-handling function exactly, but give it a new name that indicates we're going to handle mosueover.
* Now wire it up to handle the event `mouseenter` (yes it has two `e`s in a row, no camelCase... sorry, not my fault on this particular name!) on each square in our canvas. If you check your app, it should now no longer require clicking to paint. You can just drag your mouse all over the place! Not QUITE what we wanted, but... pretty cool.
* The tricky part is going to be keeping track of whether we've clicked or not. If we can do that, we can make sure that we ONLY change our squares' colors if the mouse was down when they were hovered over. Let's make a global, `let`-declared variable to keep track of whether the mouse is down or not. What should its initial value be? Well... is the mouse down when the app is loaded?
* Now! Let's add an event listener for our entire app that runs on the event `mouseup`, that sets our global variable's value to `false` when it runs. Let's add the reverse for the event `mousedown`.
* Finally (mostly), let's tell our hovering event listener to only do its thing if the mouse is currently clicked. Try it out! You should have a clicking-and-dragging, mostly bug-free painting experience.
* But there is a small potential bug. If you click and hold for a moemnt, THEN drag, you may get what's caelld a "race conditon", where both the `click` and `mouseenter` event handlers run and try to edit the state of the app at the same time. We can avoid this through setting the is-the-mousedown variable when the click-handling function runs. Surprisingly, we actually need to set it to `false` here; that's because by the time the function is running, the mouse will be down again.


##### Changing Canvas Size

We have a 10x10 canvas right now, but you can add more if you'd like using the method outlined in the code comments!


### Actual Stretch Goals

There are a lot of different directions you could take this project to stretch your developer wings. These don't all work together, and therefore are also not in any particular order. Do whatever sounds fun or challenging!

* Add more colors. You may have to adjust the layout to continue to have the palette look reasonable.
* Add a Dark Mode toggle that will change the general theme and also the colors to match.
* Increase the number of squares on the canvas. You may have to adjust the size of the squares (or canvas). There is no real upper limit! I guess the number of pixels available to the user? Yeah, that's an actual upper limit.
* Add an easter egg message to `.message` that activates when the user draws a particular pattern. Checking for a particular pattern can be difficult if you make too complex a one, so start with something simple and expand from there to as weird an easter egg as you can.
* Allow the user to dynamically allocate the size of the canvas. You'll have to take in the desired canvas size from the user (an input box, maybe?), then make the right number of squares dynamically. Changing `gridWidth` will be part of it, but you'd also need to set `gridtemplate-rows` and `grid-template-columns`.
* Add some more tools besides a simple paintbrush. Here are some examples, but feel free to come up with your own ideas!
  * A tool that colors a square and its neighbors.
  * A tool that combines colors. For example, if the color is red and you paint it yellow with this tool, you get orange.
  * A tool that allows you to select multiple squares for painting on all of them at once.
