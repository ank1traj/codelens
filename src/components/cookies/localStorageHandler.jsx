const getItem = key => {
  return localStorage.getItem(key)
}

const setItem = (key, value) => {
  localStorage.setItem(key, value)
}

export default {
  getItem,
  setItem
}
