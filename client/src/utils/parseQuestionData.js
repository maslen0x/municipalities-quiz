import { RESPONDENTS, EXPERTS, FACTS, AVERAGE, CHECKBOXES } from '../constants'

export const getSource = source => {
  switch(source) {
    case RESPONDENTS:
      return 'опрос респондентов'

    case EXPERTS:
      return 'экспертная оценка'

    case FACTS:
      return 'фактические данные'

    default:
      return null
  }
}

export const getUnits = source => {
  switch(source) {
    case RESPONDENTS:
      return 'средних баллов'

    case EXPERTS:
      return 'средних баллов'

    case FACTS:
      return 'процентов'

    default:
      return null
  }
}

export const getAnswerer = source => {
  switch(source) {
    case RESPONDENTS:
      return 'Респондент'

    case EXPERTS:
      return 'Эксперт'

    default:
      return null
  }
}

export const getDescription = question => {
  if(question.type === CHECKBOXES) {
    return <>
      <p>{question.description}</p>
      <ul>
        {question.criteries.map((criterion, index) => <li key={index}>{index + 1}) {criterion}</li>)}
      </ul>
    </>
  }

  if(question.description)
    return question.description

  if(question.criteries) {
    return <>
      <p>критерии оценки:</p>
      <ul>
        {question.criteries.map((criterion, index) => <li key={index}>{index + 1}) {criterion}</li>)}
      </ul>
    </>
  }
}

export const getRatingScale = question => {
  if(question.source === FACTS)
    return `m — ${question.m}, h — ${question.h}`

  if(question.type === CHECKBOXES) {
    return <>
      <p>при соответствии:</p>
      <ul>
        <li>3 критериям – 10 баллов;</li>
        <li>2 критериям – 6 баллов;</li>
        <li>1 критерию – 3 балла;</li>
        <li>отсутствие соответствий – 0 баллов</li>
      </ul>
    </>
  }

  if(question.type === AVERAGE)
    return question.criteries[0]

  if(question.source === RESPONDENTS) {
    return <>
      <ul>
        <li>n — количество респондентов, принявших участие в опросе</li>
        <li>q — оценка одним респондентом по каждому из критериев</li>
      </ul>
    </>
  }

  if(question.source === EXPERTS) {
    return <>
      <ul>
        <li>n — количество членов экспертной группы</li>
        <li>q — оценка одним членом экспертной группы по каждому из критериев</li>
      </ul>
    </>
  }
}