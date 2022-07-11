import page from "./page.js"
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

function parseQuery(ctx, next) {
  if (ctx.querystring) {
    const queryList = ctx.querystring.split('&')
    const queries = queryList.map(q => q.split('='))

    const constructObject = arr => {
     return arr.reduce((acc, val) => {
        const [key, value] = val
        acc[key] = value
        return acc
     }, {})
    }
    
    ctx.queries = constructObject(queries)
  }
  
  next()
}

// TODO : this is breaking the initial link to this page
page('/beneficiaries/conservatoire/*', parseQuery, (ctx) => {
  console.log('here?')
  if (ctx.queries?.year) {
    Alpine.store('year').selected = ctx.queries.year
  }
})

page()
