function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


export function merge(dist, source) {
  console.log('merge走到1')
  if (typeof dist !== 'object' || typeof source !== 'object') {
      return
  }
  console.log('merge走到')
  Object.keys(source).forEach((key) => {
      if (source[key] && !(source[key] instanceof Array) && typeof source[key] === 'object') {
          dist[key] = dist[key] || {}
          merge(dist[key], source[key])
      } else {
          Vue.set(dist, key, source[key])
      }
  })
}

export function mergePrintData(dist, source) {
  if (typeof dist !== 'object' || typeof source !== 'object') {
      return
  }
  Object.keys(source).forEach((key) => {
      if (source[key] && !(source[key] instanceof Array) && typeof source[key] === 'object') {
          dist[key] = dist[key] || {}
          merge(dist[key], source[key])
      } else if (source[key] !== null && source[key] !== undefined && source[key] !== '') {
          dist[key] = source[key]
      }
  })
  return dist
}

export function defaults(dist, source) {
  if (typeof dist !== 'object' || typeof source !== 'object') {
      return
  }
  Object.keys(source).forEach((key) => {
      if (source[key] && typeof source[key] === 'object') {
          dist[key] = dist[key] || {}
          merge(dist[key], source[key])
      } else if (!dist[key]) {
          Vue.set(dist, key, source[key])
      }
  })
}