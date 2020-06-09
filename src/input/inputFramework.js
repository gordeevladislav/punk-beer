import is from 'is_js'

export function createFilterControl(requestParam, id, label, validation) {
  return {
    requestParam,
    value: '',
    id,
    type: 'text',
    label,
    placeholder: 'Enter ' + label.toLowerCase(),
    errorMessage: 'Enter correct value',
    touched: false,
    validation,
    valid: !validation,
  }
}

export function controlValidate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.reqiured) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = is.email(value) && isValid
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }

  if (validation.typeNumber) {
    isValid = value.trim() !== '' && Number(value) === +value && isValid
  }

  return isValid
}