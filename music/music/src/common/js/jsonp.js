import OrganizeJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += '?' + processPar(data)

  return new Promise((resolve, reject) => {
    OrganizeJSONP(url, option, (error, data) => {
      if (!error) {
        resolve(data)
      } else {
        reject(error)
      }
    })
  })
}

function processPar(par) {
  let parm = ''
  for (var key in par) {
    if (par.hasOwnProperty(key)) {
      let value = par[key] !== undefined ? par[key] : ''
      parm += `&${key}=${encodeURIComponent(value)}`
    }
  }
  return parm
}