import Alpine from 'https://unpkg.com/alpinejs@3.2.1/dist/module.esm.js'

document.addEventListener('alpine:init', () => {
  Alpine.store('mobile', {
    navVisible: false,

    init() {

    },

    toggleNav() {
      this.navVisible = !this.navVisible
      document.body.classList.toggle('overflow-hidden')
    },
  })
})

window.onload = () => {
  Alpine.start()
}
