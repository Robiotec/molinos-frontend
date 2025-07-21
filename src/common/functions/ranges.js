const Ranges = {
  OFF: {
    values: [0.0, 5.5],
    classNameLight: '',
    cardMessages: 'Molino Apagado',
  },
  EMPTY: {
    values: [5.5, 25.5],
    classNameLight: 'light-success',
    cardMessages: 'Molino vacío',
  },
  NORMAL: {
    values: [25.5, 45.5],
    classNameLight: 'light-warning',
    cardMessages: 'Molino Normal',
  },
  OVERLOADED: {
    values: [45.5, 100.9],
    classNameLight: 'light-danger',
    cardMessages: 'Molino Sobrecargado',
  },
}

export default Ranges;