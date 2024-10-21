const express = require('express')

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth')

routes.use('/',require('./authRoutes'))
routes.use('/category',veryfyToken,require('./categoryRoutes'))
routes.use('/product',veryfyToken,require('./productRoutes'))


module.exports = routes;