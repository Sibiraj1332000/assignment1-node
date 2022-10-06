const path = require('path')
require('dotenv').config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })

module.exports={
    port:process.env.PORT
}