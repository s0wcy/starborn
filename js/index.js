import Animation from './Animation.js'

window.addEventListener('load', () => {
  setTimeout(() => document.body.style.opacity = 1, 200)
  new Animation()
})