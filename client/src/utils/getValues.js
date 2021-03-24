import { SCORES, CHECKBOXES, AVERAGE, PERCENTS } from '../constants'

const getValues = (questionType, formElements) => {
  switch(questionType) {
    case SCORES: {
      const selects = formElements.filter(el => el.nodeName === 'SELECT')
      const values = selects.map(select => select.value)
      return values
    }

    case CHECKBOXES: {
      const checkboxes = formElements.filter(el => el.nodeName === 'INPUT')
      const values = checkboxes.map(checkbox => +checkbox.checked)
      return values
    }

    case AVERAGE: {
      const value = formElements.find(el => el.nodeName === 'INPUT').value
      return value
    }

    case PERCENTS: {
      const m = formElements.find(el => el.name === 'm').value
      const h = formElements.find(el => el.name === 'h').value
      return { m, h }
    }

    default:
      return null
  }
}

export default getValues