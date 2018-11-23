export default class Interface {
  constructor() {
    // DOM elements
    this.$interface = document.querySelector('#interface')
    // start button
    this.$start = this.$interface.querySelector('.start')
    // audio player
    this.$player = this.$interface.querySelector('.player')
    this.$playerBtn = this.$player.querySelector('.on-off')
    // story div
    this.$story = this.$interface.querySelector('.story')
    // continue
    this.$continue = this.$interface.querySelector('.continue')

    // Boolean triggers
    this.isStarted = false
    this.isSlow = false

    // Story steps
    this.step = 0

    // Events 
    this.$start.addEventListener('click',
      () => { this.start() }
    )
  }

  start() {
    this.isStarted = true
    this.$start.classList.add('started')
    this.isSlow = true
  }
}