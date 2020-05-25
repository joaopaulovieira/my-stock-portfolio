import MyStockPortfolio from '../my-stock-portfolio.esm.js'
import { OPERATIONS_REGISTER, PORTFOLIO_DISTRIBUTION } from './constants.js'

const p = new MyStockPortfolio(OPERATIONS_REGISTER)
p.portfolioDistribution = PORTFOLIO_DISTRIBUTION
p.distributionForNewInvestment(10000)
