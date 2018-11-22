import Canvas from './Canvas.js'

export default class Cosmos extends Canvas {
  constructor() {
    super()

    this.$cosmos = document.querySelector('.cosmos')
    this.cosmosPos = {
      max: 200,
      min: 50,
      currentX: 0,
      currentY: 0,
    }
    this.cosmosScale = {
      max: 2,
      min: 1,
      current: 1
    }
    this.cosmosOpacity = {
      max: 0.4,
      min: 0,
      current: 0,
    }
    
    const loop = () => {
      window.requestAnimationFrame(loop)
      this.cosmosAnim(this.$cosmos)
    }

    loop()
  }

  randCosmosPos() {
    const pos = this.cosmosPos
    if (pos.current < pos.max) {
      pos.current += 1
    } else {
      pos.current = pos.min
    }
  }

  getScale() {
    const scale = this.cosmosScale
    if (scale.current < scale.max) {
      scale.current += 0.01
    } else {
      scale.current = scale.min
    }
  }

  getOpacity() {
    const opacity = this.cosmosOpacity
    const scale = this.cosmosScale
    if (opacity.current < opacity.max) {
      opacity.current = scale.current / 2
    } else {
      opacity.current = opacity.min
    }
  }

  cosmosAnim(e) {
    this.randCosmosPos()
    this.getScale()
    this.getOpacity()
    e.style.transform = `translateX(${this.cosmosPos.currentX}px) 
    translateY(${this.cosmosPos.currentY}px) scale(${this.cosmosScale.current})`
    e.style.opacity = this.cosmosOpacity.current
  }
}