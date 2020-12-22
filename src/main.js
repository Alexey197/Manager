import {createSiteMenuTemplate} from './components/site-menu.js'
import {createFilterTemplate} from '../src/components/filters.js'
import {createBoardTemplate} from '../src/components/board.js'
import {createTaskTemplate} from '../src/components/task.js'
import {createTaskEditTemplate} from './components/task-edit.js'
import {createLoadMoreButtonTemplate} from './components/load-more-button'

const TASK_COUNT = 3

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template)
}

const siteMainElement = document.querySelector(`.main`)
const siteHeaderElement = siteMainElement.querySelector(`.main__control`)
render(siteHeaderElement, createSiteMenuTemplate())
render(siteMainElement, createFilterTemplate())
render(siteMainElement, createBoardTemplate())

const tasksListElement = siteMainElement.querySelector(`.board__tasks`)
render(tasksListElement, createTaskEditTemplate())

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => render(tasksListElement, createTaskTemplate())
  )

const boardElement = siteMainElement.querySelector(`.board`)
render(boardElement, createLoadMoreButtonTemplate())
