import {Colors} from '../const'
import {getRandomArrayItem} from '../utils'
import {getRandomIntegerNumber} from '../utils'

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
]

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
}

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
]

const getRandomDate = () => {
  const targetDate = new Date()
  const sign = Math.random() > 0.5 ? 1 : -1
  const diffValue = sign * getRandomIntegerNumber(0, 7)

  targetDate.setDate(targetDate.getDate() + diffValue)
  return targetDate
}

const getCurrentDate = () => {
  const currentDate = new Date()
  currentDate.setHours(23, 59, 59, 999)
  
  return new Date(currentDate)
}

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': Math.random() > 0.5
  })
}

const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3)
}

export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false
  }
  const currentDate = getCurrentDate()
  return currentDate.getTime() > dueDate.getTime()
}

export const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate()
  
  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(Colors),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  }
}

export const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask)
}
