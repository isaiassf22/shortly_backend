
const dt = new Date()

const day = String(dt.getDate()).padStart(2,"0")

const month = String(dt.getMonth()+1).padStart(2,"0")

const year = dt.getFullYear()

const hour = dt.getHours()

const minute = dt.getMinutes()

const second = dt.getSeconds()



 export const currentDate= `${day}/${month}/${year} at ${hour}:${minute}:${second}`