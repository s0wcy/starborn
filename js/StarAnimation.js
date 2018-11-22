import Canvas from './Canvas.js' // importing our Canvas class
import Star from './Star.js' // importing ou Star class

// Creating a new class who is an extension of our class Canvas & Star,
// This class will animate our stars
export default class StarAnimation extends Canvas {
  constructor(_params) {
    // finish import Canvas class
    super(_params)

    // stars attributes
    this.stars = []
    this.starFlow = 5

    // // cosmos position
    // this.cosmosImg = {
    //   x: 0,
    //   y: 0,
    //   scale: {
    //     max: {
    //       x: this.screen.width * 1.5,
    //       y: this.screen.height * 1.5
    //     },
    //     min: {
    //       x: this.screen.width,
    //       y: this.screen.height
    //     },
    //     current: {
    //       x: this.screen.width,
    //       y: this.screen.height
    //     }
    //   },
    //   alpha: {
    //     max: 0.3,
    //     min: 0,
    //     current: 0
    //   }
    // }

    // init & animate
    this.loop = this.loop.bind(this)
    this.loop()
    this.isSlow = false
  }

  getRandomPos() {
    const res = {
      x: (this.screen.width / 2) + (Math.random()*10),
      y: (this.screen.height / 2) + (Math.random()*10)
    }
    return res
  }

  // the loop function will keep animate each of our stars every frames
  loop() {
    window.requestAnimationFrame(this.loop)
    
    this.drawBg()
    //this.drawCosmos()
    this.drawStars()
    this.updateStars()
    this.removeOldStars()
  }

  drawBg() {
    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, this.screen.width, this.screen.height)
  }

  // drawCosmos() {
  //   const i = new Image()
  //   this.incGlobalAlpha()
  //   this.incScale()
  //   i.addEventListener('load', () => {
  //     this.context.save()
  //     this.context.globalAlpha = this.cosmosImg.alpha.current
  //     this.context.drawImage(
  //       i,
  //       this.cosmosImg.x - (this.cosmosImg.scale.current.x / 2),
  //       this.cosmosImg.y - (this.cosmosImg.scale.current.y / 2),
  //       this.cosmosImg.scale.current.x,
  //       this.cosmosImg.scale.current.y
  //     )
  //     this.context.restore()
  //   })
  //   i.src = 'medias/img/cosmos.png'
  // }
  //
  // incGlobalAlpha() {
  //   const a = this.cosmosImg.alpha
  //   if (a.current < a.max) {
  //     a.current += 0.002
  //   } else {
  //     a.current = a.min
  //   }
  // }

  // incScale() {
  //   const scale = this.cosmosImg.scale
  //   if (scale.current.x < scale.max.x && scale.current.y < scale.max.y) {
  //     scale.current.x += 2
  //     scale.current.y += 2
  //   } else {
  //     scale.current.x = scale.min.x
  //     scale.current.y = scale.min.y
  //   }
  // }

  // We create a new star, add it to the stars[]
  drawStars() {
    for (let i = 0; i < this.starFlow; i++) {
      const star = new Star(
        this.context,
        this.getRandomPos(),
        this.isSlow
      )
      this.stars.push(star)
    }
  }

  // We redraw all star in stars[]
  updateStars() {
    for (const _star of this.stars) {
      _star.draw()
    }
  }

  // remove star after it disapear from screen
  removeOldStars() {
    setTimeout(() => {
      for (let i = 0; i < this.starFlow; i++) {
        this.stars.shift()
      }
    }, 2500)
  }
}
