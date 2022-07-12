import Alpine from './alpine.js'

document.addEventListener('alpine:init', () => {

  Alpine.store('year', {
    selected: undefined,
    
    select(evt) {
      const el = evt.target
      el.scrollIntoView({ block: 'end', inline: 'start', behavior: 'smooth' })
    }
  })
})

Alpine.start()

