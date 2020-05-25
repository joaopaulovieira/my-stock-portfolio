import MyStockPortfolio from '../my-stock-portfolio.esm.js'
import { OPERATIONS_REGISTER, PORTFOLIO_DISTRIBUTION } from './constants.js'

const p = new MyStockPortfolio(OPERATIONS_REGISTER)
p.portfolioDistribution = PORTFOLIO_DISTRIBUTION
p.distributionForNewInvestment(10000)

console.log(`Valor total investido: ${p.totalValueInvested()}\n\n`)
console.log(`Retorno obtido com venda de posições: ${p.totalBalance()}\n\n`)
console.log('Distribuição dos ativos:\n\n')
p.actualDistribution()