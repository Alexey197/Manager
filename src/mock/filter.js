const filtersNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
]

export const generateFilters = () => {
  return filtersNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10)
    }
  })
}
