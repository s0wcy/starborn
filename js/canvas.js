export default class Canvas {
  constructor() {
    // init canvas & context
    this.$canvas = document.querySelector('canvas')
    this.context = this.$canvas.getContext('2d')

    // define screen & mouse properties
    this.screen = {
      width: window.innerHeight,
      height: window.innerHeight,
    }
    
    this.cursor = {
      x: 0,
      y: 0
    }

    this.isStarted = false

   // update canvas size & mouse position
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('mousemove', e => this.updateCursor(e))

    //initiate size of browser
    this.resize()
  }

  resize() {
    this.screen.width = window.innerWidth
    this.screen.height = window.innerHeight

    this.$canvas.width = this.screen.width
    this.$canvas.height = this.screen.height
  }

  updateCursor(_e) {
    this.cursor = {
      x: _e.clientX,
      y: _e.clientY
    }
  }
}

// We already exported our class when we defined it !
// Check Star.js to continue :y: !