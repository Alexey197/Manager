import AbstractComponent from './abstract-component'

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  )
}

export default class LoadMoreButton extends AbstractComponent {
  constructor() {
    super()
  }

  getTemplate() {
    return createLoadMoreButtonTemplate()
  }
}
