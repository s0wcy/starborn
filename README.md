# StarBorn
Experience interactive birth and death of a star.

### Built With
- HTML5
- JavaScript - Canvas
- [SASS](https://sass-lang.com/)

![JavaScript](https://cdn.iconscout.com/icon/free/png-128/javascript-1-225993.png) **+** ![SASS](https://cdn.iconscout.com/icon/free/png-128/sass-226054.png)

### Installing

A online demo is available : **[StarBorn](http://www.achabe.com/starborn/)** (sound may not be allowed because I don't have any SSL certificate)

I recommend using a emulated server (MAMP will do the work) if you decide to edit or fork this project locally.
You can also use **[serve](https://www.npmjs.com/package/serve)** command to emulate your server quickly directly on your terminal : `npm install -g serve`. (works on VS Code too)

Also, you'll need a **[SASS compiler](http://koala-app.com/)** to edit scss files.

### Main features
- Soud playing backwards
- Custom canvas mouse cursor
- Planet interaction with mouse
- Storytelling
- Lightspeed stars

### How it works ?

This javascript canvas page use class structure.
I call **Star.js** with **Animation.js** to create each elements you'll see on canvas.
The interractions & DOM elements are stocked in **Canvas.js**
And the **index.js** import **Animation.js** and start rendering our app.

### Author
- **Alexandre Chabeau**

The input scope is wrong, I should have done a separated class with my storytelling inside, but hey ! Time's up !
This could be improved with WebGL for betters effects and immersive 3D environement implementation.
Also a custom sound design would be very effective !

Have fun modifying it :+1: