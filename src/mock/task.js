import {Colors} from '../const'
import {getRandomArrayItem} from '../utils'
import {getRandomDate} from '../utils'

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
