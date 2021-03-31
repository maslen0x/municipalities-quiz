import React, { useState } from 'react'

import GeneralInfo from './GeneralInfo'
import Description from './Description'
import Dependent from './Dependent'

const NewForm = ({ form, setForm, onAdd }) => {
  const stepComponents = [GeneralInfo, Dependent, Description]

  const [step, setStep] = useState(0)

  const onIncStep = data => {
    setForm({ ...form, ...data })
    setStep(step + 1)
  }

  const onDecStep = data => {
    setForm({ ...form, ...data })
    setStep(step - 1)
  }

  const Step = stepComponents[step]

  return (
    <div className="new__step">
      <Step {...form} onIncStep={onIncStep} onDecStep={onDecStep} onAdd={onAdd} />
    </div>
  )
}

export default NewForm