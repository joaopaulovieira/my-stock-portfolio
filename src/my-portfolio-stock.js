export default class MyStockPortfolio {
    get portfolioDistribution() { return this._portfolioDistribution }
    set portfolioDistribution(distribution) { this._portfolioDistribution = distribution }

    constructor(rawOperations) {
    }

    distributionForNewInvestment(value, distribution = this.portfolioDistribution) {
        if (!distribution) return console.error(`No distribution parameter is received. Please, inform one distribution when calling this method or set a default distribution for this portfolio.`)
        distribution.forEach(item => console.log(`${item.name} - ${((value * item.percentile)/100).toFixed(2)}`))
    }
}
