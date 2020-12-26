import {createSiteMenuTemplate} from './components/site-menu.js'
import {generateFilters} from './mock/filter'
import {generateTasks} from './mock/task'
import {createFilterTemplate} from './components/filters.js'
import {createBoardTemplate} from './components/board.js'
import {createTaskTemplate} from './components/task.js'
import {createTaskEditTemplate} from './components/task-edit.js'
import {createLoadMoreButtonTemplate} from './components/load-more-button'

const TASK_COUNT = 22
const SHOWING_TASK_COUNT_ON_START = 8
const SHOWING_TASK_COUNT_BY_BUTTON = 8

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template)
}

const tasks = generateTasks(TASK_COUNT)

const siteMainElement = document.querySelector(`.main`)
const siteHeaderElement = siteMainElement.querySelector(`.main__control`)
render(siteHeaderElement, createSiteMenuTemplate())

const filters = generateFilters(tasks)
render(siteMainElement, createFilterTemplate(filters))
render(siteMainElement, createBoardTemplate())

const tasksListElement = siteMainElement.querySelector(`.board__tasks`)
render(tasksListElement, createTaskEditTemplate(tasks[0]))

let showingTaskCount = SHOWING_TASK_COUNT_ON_START
tasks.slice(1, showingTaskCount).forEach((task) => render(tasksListElement, createTaskTemplate(task)))

const boardElement = siteMainElement.querySelector(`.board`)
render(boardElement, createLoadMoreButtonTemplate())

const loadMoreButton = boardElement.querySelector(`.load-more`)
loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTaskCount
  showingTaskCount += SHOWING_TASK_COUNT_BY_BUTTON
  
  tasks.slice(prevTaskCount, showingTaskCount)
    .forEach((task) => render(tasksListElement, createTaskTemplate(task)))
  
  if (showingTaskCount >= tasks.length) {
    loadMoreButton.remove()
  }
})
