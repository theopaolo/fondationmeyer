import Alpine from 'https://unpkg.com/alpinejs@3.2.1/dist/module.esm.js'

document.addEventListener('alpine:init', () => {
  Alpine.store('mobile', {
    navVisible: true,

    init() {
      console.log('mobile store init')
    },

    toggleNav() {
      console.log('hello from mobile store')
      this.navVisible = !this.navVisible
    },
  })
})

window.onload = () => {
  Alpine.start()
}
