question {
  number: string (А1.1, Б2.1)
  indicator: string required unique (example оценка эффективности процедур по подключению к сетям электроснабжения (мощность линии от 15 до 150 кВт))
  type: string required (AVERAGE | SCORES | CHECKBOXES | PERCENTS)
  source: string (RESPONDENTS | EXPERTS | FACTS)

  //необязательные (в зависимости от типа)

  units: string (for AVERAGE) (единицы измерения)

  description: string (example изменение общего количества земельных участков, сформированных и выставленных на аукцион в отчетном году, по сравнению с предыдущим годом)
  criteries: [string] (for AVERAGE & SCORES & CHECKBOXES)
  (example for AVERAGE ['(t)i – время подключения к электросетям для респондента i'])

  m: string (for PERCENTS) (описание самого параметра) (example количество земельных участков, выставленных на аукцион в отчетном году)
  h: string (for PERCENTS) (описание самого параметра) (example количество земельных участков, выставленных на аукцион в предыдущем году)
}

answer {
  questionId: id required
  municipalityId: id required
  date: date default Date.now

  //необязательные (в зависимости от типа)

  evaluations: [[number]] (description массив массивов чисел, во внутреннем массиве лежат оценки одного респондента по критериям, длина верхнего массива - количество респондентов, длина внутреннего массива - количество критериев)
  (example for SCORES [[5, 2, 3, 4], [0, 4, 3, 2], [5, 4, 5, 5]] (1-5))
  (example for CHECKBOXES [[1, 1, 0], [0, 0, 1], [0, 0, 0]] (1/0))
  (example for AVERAGE [[5, 9, 10, 12, 7, 2]] массив массивов содержит 1 массив и находит в нем среднее значение)

  m: number (for PERCENTS)
  h: number (for PERCENTS)
}