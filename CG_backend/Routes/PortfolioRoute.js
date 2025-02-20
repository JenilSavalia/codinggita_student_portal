import express from 'express'
import { postPortfolio } from '../Controller/Portfolio.Controller/Portfolio.Controller.js'
import { getUser, EditUser } from '../Controller/User.Controller.js'

const PortfolioRoute = express.Router()



PortfolioRoute.post("/", postPortfolio)

// Get USer Details with portfolio
PortfolioRoute.get("/", getUser)


// this put request adds portfolio id to refer user object
PortfolioRoute.put("/", EditUser)






export default PortfolioRoute