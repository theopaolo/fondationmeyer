import Alpine from 'https://unpkg.com/alpinejs@3.2.1/dist/module.esm.js'
import Dexie from 'https://unpkg.com/dexie@3.2.0/dist/dexie.mjs'

async function setupDB(db) {
  try {
    let req = await fetch('/assets/db/conservatoire.json')
    let json = await req.json()

    if (!json) {
      throw new Error('No json loaded')
    }

    db.version(1).stores({
      beneficiaries: `
        nom,
        prenom,
        discipline,
        annee,
        aide,
        description`,
    })

    await db.beneficiaries.bulkPut(json)
    console.log('database initialised')

    return { years: getYears(json) }
  } catch (err) {
    console.error(err)
  }
}

function getYears(list) {
  const years = list.map(y => y.annee).filter((elem, index, self) => {
    return index == self.indexOf(elem)
  })

  return years
}

document.addEventListener('alpine:init', () => {
  Alpine.store('beneficiaries', {
    db: new Dexie('BENE_DB'),
    list: [],
    years: [],
    selectedYear: 1996,
    previousYear: 1996,
    searching: false,
    searchString: '',
    loading: false,

    async init() {
      try {
        this.loading = true
        const { years } = await setupDB(this.db)
        this.years = [ ...years ]
        this.selectYear(this.selectedYear)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async getYear(year) {
      try {
        const query = await this.db.beneficiaries.where('annee').equals(year).toArray()

        this.list = [ ...query ]
      } catch (err) {
        console.error(err) 
      }
    },
    async searchBeneficiaries(search) {
      try {
        const queries = search.split(' ').filter(q => q.length > 1)
        let filtered = undefined

        for (let query of queries) {
          const regex = new RegExp(`${query}`, 'i')
          if (filtered === undefined) {
            filtered = await this.db.beneficiaries
              .filter((b) => {
                return (
                  regex.test(b.nom) ||
                regex.test(b.prenom) ||
                regex.test(b.discipline) ||
                regex.test(b.etudes) ||
                regex.test(b.annee) ||
                regex.test(b.aide) ||
                regex.test(b.description)
                )
              })
              .toArray()
          } else {
            filtered = filtered.filter((b) => {
              return (
                regex.test(b.nom) ||
                regex.test(b.prenom) ||
                regex.test(b.discipline) ||
                regex.test(b.etudes) ||
                regex.test(b.annee) ||
                regex.test(b.aide) ||
                regex.test(b.description)
              )
            })
          }
        }

        this.list = [ ...sortYearAlpha(filtered) ]
      } catch (err) {
        console.error(err)
      }
    },
    toggleSearch() {
      this.searching = !this.searching

      if (!this.searching) {
        this.searchString = ''
        this.selectYear(this.previousYear)
      }
    },
    searchUpdate() {
      const value = this.searchString
      if (value.length > 1) {
        this.selectedYear = null
        this.searchBeneficiaries(value)
      } else if (value.length === 0) {
        this.selectYear(this.previousYear)
      }
    },
    selectYear(year, el) {
      this.selectedYear = year
      this.previousYear = year
      this.getYear(year)
      if (el) {
        el.scrollIntoView({ block: 'end', inline: 'start', behavior: 'smooth' })
      }
    },
  })
})

Alpine.start()

function sortYearAlpha(array) {
  const year = array.sort((a, b) => a.annee - b.annee)
  const family = year.sort((a, b) => a.nom - b.nom)
  const first = family.sort((a, b) => a.prenom - b.prenom)

  return first
}
