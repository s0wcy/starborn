import Canvas from './Canvas.js' // importing our Canvas class
import Star from './Star.js' // importing ou Star class

// Creating a new class who is an extension of our class Canvas & Star,
// This class will animate our stars
export default class StarAnimation extends Canvas {
  constructor(_params) {
    // finish import Canvas class
    super(_params)

    this.stars = []

    // init & animate
    this.loop = this.loop.bind(this)
    this.loop()
  }

  getRandomPos() {
    const res = {
      x: (this.screen.width / 2) + (Math.random()*50),
      y: (this.screen.height / 2) + (Math.random()*50)
    }
    return res
  }

  // the loop function will keep animate each of our stars every frames
  loop() {
    window.requestAnimationFrame(this.loop)
    
    this.drawBg()
    this.drawStars()
    this.updateStars()
    this.removeOldStars()
  }

  drawBg() {
    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, this.screen.width, this.screen.height)
  }

  // We create a new star, add it to the stars[]
  drawStars() {
    const star = new Star(
      this.context,
      this.getRandomPos()
    )

    this.stars.push(star)
  }

  // We redraw all star in stars[]
  updateStars() {
    for (const _star of this.stars) {
      _star.draw()
    }
  }

  // remove star after it disapear from screen
  removeOldStars() {
    setTimeout(() => this.stars.shift(), 2500)
  }
}