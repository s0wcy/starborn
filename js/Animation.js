import Canvas from './Canvas.js' // importing our Canvas class
import Star from './Star.js' // importing our star constructor

// This class will animate our stars
export default class StarAnimation extends Canvas {
  constructor() {
    super()

    // interactions
    this.isStarted = false
    this.isMuted = false
    this.isLightspeed = true
    this.step = {
      max: 8,
      min: 0,
      current: 0
    }
    this.restart = false

    // stars attributes
    this.stars = []
    this.starFlow = 3

    // interactions events
    this.$start.addEventListener('click', () => this.start())
    this.$continue.addEventListener('click', () => this.continue())
    this.$playerBtn.addEventListener('click', () => this.mute(this.isMuted))
    if(!this.isMuted) {
      this.sound.addEventListener('ended', () => this.sound.play()) 
    }

    // init & animate
    this.loop = this.loop.bind(this)
    this.loop()
  }

  // interaction functions
  start() {
    this.isStarted = true
    this.$startContainer.classList.add('started')
    this.$logo.classList.add('started')
    this.$lower.classList.remove('lower-off')
    this.isMuted = false
    this.sound.volume = 0.3
    this.sound.loop = true
    this.sound.play()
    for (const _star of this.stars) {
      _star.isStarted = true
    }
    this.continue()
  }

  // mouse/screen ratio used to change color & size
  mouseRatio(_step) {
    let ratio = (this.cursor.x / this.screen.width) * _step
    return ratio
  }

  // ++ step when clicking on continue, if _ask === true, then just return current step
  continue(_ask) {
    if(!_ask) {
      if (this.step.current < this.step.max) {
        this.$story.classList.add('text-transition')
        this.step.current ++
        setTimeout(() => {
          this.$story.classList.remove('text-transition')
        }, 400)
      } else if(this.restart) {
        this.step.current = this.step.min
      } else {
        this.step.current = this.step.max + 1
      }
    }
    return this.step.current
  }

  storyStep(_step) {
    switch (_step) {
      case 1:
        return this.story.intro
      case 2:
        this.$storyInput.classList.remove('input-off')
        return this.story.nameStar
      case 3:
        this.$storyInput.classList.add('input-off')
        return this.story.nameConfirm
      case 4:
        this.isLightspeed = false
        return this.story.blueStar
      case 5:
        return this.story.yellowStar
      case 6:
        return this.story.redStar
      case 7:
        this.isLightspeed = true
        return this.story.startEnd
      case 8:
        return this.story.end
      case 9:
        this.$logo.classList.remove('started')
        this.$logo.classList.add('end-logo')
        return 'Thanks for exploring my web experimentation, stay curious !'
    }
  }

  setStory() {
    this.$story.style.opacity = '1'
    this.$storyInner.innerHTML = this.storyStep(this.continue(true))
  }

  // gives back the max size of born star for each steps
  sizeStep(_step) {
    switch (_step) {
      case 4:
        return 50
      case 5:
        return 150
      case 6:
        return 230
    }
  }

  // mute
  mute(_isMuted) {
    if(_isMuted) {
      this.isMuted = false
      this.$playerBtn.innerHTML = 'O'
      this.sound.play()
    } else {
      this.isMuted = true
      this.$playerBtn.innerHTML = 'Ø'
      this.sound.pause()
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
    this.setStory()
    this.drawCursor()
  }

  // the mouse cursor
  drawCursor() {
    this.context.beginPath()
    this.context.arc(
      this.cursor.x,
      this.cursor.y,
      8,
      0,
      Math.PI*2,
      false
    )
    // this.context.globalAlpha = 1
    this.context.save()
    this.context.strokeStyle = '#fff'
    this.context.shadowColor = '#fff'
    this.context.shadowBlur = '#fff'
    this.context.closePath()
    this.context.stroke()
    this.context.restore()
  }

  // redraw our background and keep it clean black
  drawBg() {
    this.context.restore()
    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, this.screen.width, this.screen.height)
    this.context.save()
  }

  // We create a new star, add it to the stars[]
  drawStars() {
    for (let i = 0; i < this.starFlow; i++) {
      const star = new Star(
        this.context,
        this.getRandomPos(),
        this.mouseRatio(60).toString(),
        this.mouseRatio(this.sizeStep(this.continue(true))),
        this.continue(true)
      )
      this.stars.push(star)
    }
  }

  // We redraw all star in stars[]
  updateStars() {
    for (const _star of this.stars) {
      if(!this.isLightspeed) {
        this.drawBg()
        _star.drawBornStar()
      } else {
        _star.draw()
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
