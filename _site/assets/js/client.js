import Alpine from './alpine.js'
import axios from 'https://cdn.skypack.dev/axios'


document.addEventListener('alpine:init', () => {
  Alpine.store('beneficiaries', {
    init() {
      this.getYear(1996)
    },

    list: [],
    selectedYear: 1996,
    prevYEar : 1996,
    loading: false,

    async getYear(year) {
      try {
        this.list = []
        this.loading = true
        this.selectedYear = year
        this.prevYear = year

        const options = {
          method: 'GET',
          params: { limit: '25', offset: '0', where: `(Annee,eq,${year})` },
          headers: {
            // PLACE NOCODB TOKEN HERE
            'xc-token': ''
          }
        }

        const { data, status, statusText } = await axios('https://nk.suroh.tk/api/v1/db/data/v1/theo_db/Conservatoire', options)

        if (status != 200) throw new Error('Error in retreiving data', statusText)

        this.list = [ ...data.list ]
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async getSearch(search) {
      try {
        this.selectedYear = null

        const options = {
          method: 'GET',
          params: { limit: '25', offset: '0', where: `(Nom,like,${search})` },
          headers: {
            'xc-token': 'qE09LN0bHnE7hoQLoB30ffuUAtCf9dN_wEJX9YsG'
          }
        }

        const { data, status, statusText } = await axios('https://nk.suroh.tk/api/v1/db/data/v1/theo_db/Conservatoire', options)

        if (status != 200) throw new Error('Error in retreiving data', statusText)

        this.list = [ ...data.list ]
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    inputUpdate(el) {
      if (el.value.length > 1) {
        this.getSearch(el.value)
      } else if (el.value.length == 0) {
        this.selectedYear = this.prevYear
        this.getYear(this.selectedYear)
      }
    },
    select(el, year) {
      el.scrollIntoView({ block: 'end', inline: 'start', behavior: 'smooth' })
      console.log(year)
      this.getYear(year)
    }
  })
})

Alpine.start()

