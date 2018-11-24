import Canvas from './Canvas.js' // importing our Canvas class
import Star from './Star.js' // importing ou Star class

// This class will animate our stars
export default class StarAnimation extends Canvas {
  constructor() {
    super()

    // interactions
    this.isStarted = false
    this.step = 0

    // stars attributes
    this.stars = []
    this.starFlow = 2

    // interactions events
    this.$start.addEventListener('click', () => this.start())
    this.$continue.addEventListener('click', () => {
      console.log('step : ' + this.step)
      this.step ++
      console.log('step : ' + this.step)
    })

    // init & animate
    this.loop = this.loop.bind(this)
    this.loop()
  }

  // interaction functions
  start() {
    this.isStarted = true
    this.$start.classList.add('started')
    for (const _star of this.stars) {
      _star.isStarted = true
    }
  }

  // random pos for stars spawning
  getRandomPos() {
    const pos = {
      x: (this.screen.width / 2) + (Math.random()*10),
      y: (this.screen.height / 2) + (Math.random()*10)
    }
    return pos
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
    for (let i = 0; i < this.starFlow; i++) {
      const star = new Star(
        this.context,
        this.getRandomPos(),
        this.isStarted
      )
      this.stars.push(star)
    }
  }

  // We redraw all star in stars[]
  updateStars() {
    for (const _star of this.stars) {
      if(!this.isStarted) {
        _star.draw()
      } else {
        this.drawBg()
        _star.drawBornStar()
      }
    }
  }

  // remove star after it disapear from screen
  removeOldStars() {
    setTimeout(() => {
      for (let i = 0; i < this.starFlow; i++) {
        this.stars.shift()
      }
    }, 1200)
  }
}
