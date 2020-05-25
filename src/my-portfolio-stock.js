export default class MyStockPortfolio {
    get portfolioDistribution() { return this._portfolioDistribution }
    set portfolioDistribution(distribution) { this._portfolioDistribution = distribution }

    constructor(rawOperations) {
        this.operationsRegister = this.insertAdditionalMetadata(rawOperations)

    }


    insertAdditionalMetadata(rawOperations) {
        const updatedOperations = JSON.parse(JSON.stringify(rawOperations))
        let id = 0
        
        updatedOperations.forEach(operation => (operation.id = ++id))
        return updatedOperations
    }
    distributionForNewInvestment(value, distribution = this.portfolioDistribution) {
        if (!distribution) return console.error(`No distribution parameter is received. Please, inform one distribution when calling this method or set a default distribution for this portfolio.`)
        distribution.forEach(item => console.log(`${item.name} - ${((value * item.percentile)/100).toFixed(2)}`))
    }
}
