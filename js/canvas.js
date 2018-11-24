export default class Canvas {
  constructor() {
    // init canvas & context
    this.$canvas = document.querySelector('#canvas')
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

    // DOM elements
    this.$interface = document.querySelector('#interface')
    this.$start = this.$interface.querySelector('.start')
    this.$player = this.$interface.querySelector('.player')
    this.$playerBtn = this.$player.querySelector('.on-off')
    this.$story = this.$interface.querySelector('.story')
    this.$continue = this.$interface.querySelector('.continue')

    // update canvas size & mouse position
    window.addEventListener('resize', () => this.resize())

    //initiate size of browser
    this.resize()
  }

  // reponsive functions
  resize() {
    this.screen.width = window.innerWidth
    this.screen.height = window.innerHeight

    this.$canvas.width = this.screen.width
    this.$canvas.height = this.screen.height
  }
}

// We already exported our class when we defined it !
// Check Star.js to continue :y: !