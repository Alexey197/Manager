import {createSiteMenuTemplate} from './components/site-menu.js'
import {generateFilters} from './mock/filter'
import {generateTasks} from './mock/task'
import {createFilterTemplate} from './components/filters.js'
import {createBoardTemplate} from './components/board.js'
import {createTaskTemplate} from './components/task.js'
import {createTaskEditTemplate} from './components/task-edit.js'
import {createLoadMoreButtonTemplate} from './components/load-more-button'

const TASK_COUNT = 22

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template)
}

const siteMainElement = document.querySelector(`.main`)
const siteHeaderElement = siteMainElement.querySelector(`.main__control`)
render(siteHeaderElement, createSiteMenuTemplate())

const filters = generateFilters()
render(siteMainElement, createFilterTemplate(filters))
render(siteMainElement, createBoardTemplate())

const tasksListElement = siteMainElement.querySelector(`.board__tasks`)
const tasks = generateTasks(TASK_COUNT)
render(tasksListElement, createTaskEditTemplate(tasks[0]))

// new Array(TASK_COUNT)
//   .fill(``)
//   .forEach(
//       () => render(tasksListElement, createTaskTemplate())
//   )

tasks.slice(1).forEach((task) => render(tasksListElement, createTaskTemplate(task)))

const boardElement = siteMainElement.querySelector(`.board`)
render(boardElement, createLoadMoreButtonTemplate())
