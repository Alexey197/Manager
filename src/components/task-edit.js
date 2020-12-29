import {Colors} from '../const'
import {humanizeTaskDate, isTaskRepeating, isTaskExpired} from '../utils/task'
import {createElement} from '../utils/render'

const createTaskEditDateTemplate = (dueDate) => {
  return (
    `<button class="card__date-deadline-toggle" type="button">
       date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
     </button>
     ${dueDate !== null ? `<fieldset class="card__date-deadline">
       <label class="card__input-deadline-wrap">
         <input
           class="card__date"
           type="text"
           placeholder=""
           name="date"
           value="${humanizeTaskDate(dueDate)}"
         />
       </label>
     </fieldset>` : ``}
     `
  )
}

const createTaskEditRepeatingTemplate = (repeatingDays) => {
  return (
    `<button class="card__repeat-toggle" type="button">
       repeat:<span class="card__repeat-status">${isTaskRepeating(repeatingDays) ? `yes` : `no`}</span>
     </button>
    ${isTaskRepeating(repeatingDays) ? `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${Object.entries(repeatingDays).map(([day, repeat]) => `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}"
          name="repeat"
          value="mo"
          ${repeat ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}"
          >${day}</label
        >`).join(``)
    }
      </div>
    </fieldset>` : ``}`
  )
}


const createTaskEditColorsMarkup = (currentColor) => {
  
  return Colors.map((color) => `<input
      type="radio"
      id="color-${color}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${currentColor === color ? `checked` : ``}
    />
    <label
     for="color-${color}"
      class="card__color card__color--${color}"
      >${color}</label>`).join(``);
}

export const createTaskEditTemplate = (task = {}) => {
  const {
    color = `black`,
    description = ``,
    dueDate,
    repeatingDays
  } = task
  
  const colorTemplate = createTaskEditColorsMarkup(color)
  const repeatingTemplate = createTaskEditRepeatingTemplate(repeatingDays)
  const dateTemplate = createTaskEditDateTemplate(dueDate)
  const repeatingClassName = isTaskRepeating(repeatingDays)
    ? `card--repeat`
    : ``
  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``
  
  return (
    `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
       <form class="card__form" method="get">
       <div class="card__inner">
           <div class="card__color-bar">
             <svg class="card__color-bar-wave" width="100%" height="10">
               <use xlink:href="#wave"></use>
             </svg>
           </div>
           <div class="card__textarea-wrap">
             <l
               <textarea
                 class="card__text"
                 placeholder="Start typing your text here..."
                 name="text"
               >${description}</textarea>
             </label>
           </div>
           <div class="card__settings">
             <div class="card__details">
               <div class="card__dates">
                 ${dateTemplate}
                 ${repeatingTemplate}
               </div>
             </div>
             <div class="card__colors-inner">
               <h3 class="card__colors-title">Color</h3>
               <div class="card__colors-wrap">
                 ${colorTemplate}
               </div>
             </div>
           </div>
           <div class="card__status-btns">
             <buclass="card__save" type="submit">save</button>
             <button class="card__delete" type="button">delete</button>
           </div>
         </div>
       </form>
     </article>
    `
  )
}

export default class TaskEdit {
  constructor(task) {
    this._task = task
    this._element = null
  }
  
  getTemplate() {
    return createTaskEditTemplate(this._task)
  }
  
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate())
    }
    
    return this._element
  }
  
  removeElement() {
    this._element = null
  }
}
