import AbstractComponent from './abstract-component'

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`
}

export default class Board extends AbstractComponent {
  constructor() {
    super()
  }
  
  getTemplate() {
    return createTaskListTemplate()
  }
}
