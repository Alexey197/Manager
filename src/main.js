import SiteMenuComponent from './components/site-menu.js'
import FilterComponent from './components/filters.js'
import LoadMoreButtonComponent from './components/load-more-button'
import BoardComponent from './components/board.js'
import TaskComponent from './components/task.js'
import TaskEditComponent from './components/task-edit.js'
import SortComponent from './components/sort.js'
import TaskListComponent from './components/task-list.js'
import NoTaskComponent from './components/no-task.js'

import {generateFilters} from './mock/filter'
import {generateTasks} from './mock/task'
import {render, RenderPosition} from './utils/render'

const TASK_COUNT = 22
const SHOWING_TASK_COUNT_ON_START = 8
const SHOWING_TASK_COUNT_BY_BUTTON = 8

const tasks = generateTasks(TASK_COUNT)
const filters = generateFilters(tasks)

const siteMainElement = document.querySelector(`.main`)
const siteHeaderElement = siteMainElement.querySelector(`.main__control`)

const renderTask = (tasksListElement, task) => {
  const taskComponent = new TaskComponent(task)
  const taskEditComponent = new TaskEditComponent(task)
  
  const replaceCardToForm = () => {
    tasksListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement())
  }
  
  const replaceFormToCard = () => {
    tasksListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement())
  }
  
  const onEscKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault()
      replaceFormToCard()
      document.removeEventListener(`keydown`, onEscKeyDownHandler)
    }
  }
  
  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`)
  editBtn.addEventListener(`click`, () => {
    replaceCardToForm()
    document.addEventListener(`keydown`, onEscKeyDownHandler)
  })
  
  const editForm = taskEditComponent.getElement().querySelector(`form`)
  editForm.addEventListener(`submit`, () => {
    replaceFormToCard()
    document.removeEventListener(`keydown`, onEscKeyDownHandler)
  })
  
  render(tasksListElement, taskComponent.getElement())
}

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardComponent()
  const taskList = new TaskListComponent()
  
  render(boardContainer, boardComponent.getElement())
  render(boardComponent.getElement(), taskList.getElement())
  
  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskComponent().getElement(), RenderPosition.AFTERBEGIN)
  }
  
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.AFTERBEGIN)
  
  let showingTaskCount = SHOWING_TASK_COUNT_ON_START
  boardTasks.slice(0, showingTaskCount)
  .forEach((boardTask) => {
    renderTask(taskList.getElement(), boardTask)
  })
  
  const loadMoreButtonComponent = new LoadMoreButtonComponent()
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement())
  
  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTaskCount
    showingTaskCount += SHOWING_TASK_COUNT_BY_BUTTON
    
    tasks.slice(prevTaskCount, showingTaskCount)
    .forEach((task) => renderTask(taskList.getElement(), task))
    
    if (showingTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove()
    }
  })
}

render(siteHeaderElement, new SiteMenuComponent().getElement())
render(siteMainElement, new FilterComponent(filters).getElement())
renderBoard(siteMainElement, tasks)
