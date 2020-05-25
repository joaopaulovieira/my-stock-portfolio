import MyStockPortfolio from '../my-stock-portfolio.esm.js'
import { OPERATIONS_REGISTER, PORTFOLIO_DISTRIBUTION } from './constants.js'

window.stockPortfolio = new MyStockPortfolio(OPERATIONS_REGISTER)
stockPortfolio.portfolioDistribution = PORTFOLIO_DISTRIBUTION
stockPortfolio.portfolioDistribution(10000)

console.log(`Valor total investido: ${stockPortfolio.totalValueInvested()}\n\n`)
console.log(`Retorno obtido com venda de posições: ${stockPortfolio.totalBalance()}\n\n`)
console.log('Distribuição dos ativos:\n\n')
stockPortfolio.actualDistribution()