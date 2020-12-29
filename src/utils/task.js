export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random())
}

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length)
  
  return array[randomIndex]
}


export const getRandomDate = () => {
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

export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false
  }
  const currentDate = getCurrentDate()
  return currentDate.getTime() > dueDate.getTime()
}

export const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false
  }
  const currentDate = getCurrentDate()
  return currentDate.getTime() === dueDate.getTime()
}

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value)
}

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12)
  const minutes = castTimeFormat(date.getMinutes())
  
  const interval = date.getHours() > 11 ? `pm` : `am`
  
  return `${hours}:${minutes} ${interval}`
}

export const humanizeTaskDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
}

export const isTaskRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean)
}
