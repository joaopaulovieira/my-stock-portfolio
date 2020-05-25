export default class MyStockPortfolio {
    get portfolioDistribution() { return this._portfolioDistribution }
    set portfolioDistribution(distribution) { this._portfolioDistribution = distribution }

    constructor(rawOperations) {
        this.operationsRegister = this.insertAdditionalMetadata(rawOperations)

        this.buyActions = this.consolidateActions(this.operationsRegister.filter(item => item.action === 'buy'))
        this.sellActions = this.consolidateActions(this.operationsRegister.filter(item => item.action === 'sell'))

        this.positions = this.removeSoldPositions(this.buyActions)
    }

    normalizeToNumber(string) { return +(string).toFixed(2) }

    insertAdditionalMetadata(rawOperations) {
        const updatedOperations = JSON.parse(JSON.stringify(rawOperations))
        let id = 0
        
        updatedOperations.forEach(operation => (operation.id = ++id))
        return updatedOperations
    }

    removeSoldPositions(positions) {
        const updatedPositions = JSON.parse(JSON.stringify(positions))
    
        this.sellActions.forEach(sell => {
            updatedPositions.forEach(buy => {
                buy.name === sell.name && (buy.quantity -= sell.quantity)
            })
        })

        return updatedPositions.filter(item => item.quantity !== 0)
    }

    consolidateActions(actions) {
        let actionsCopy = JSON.parse(JSON.stringify(actions))
        let mergedItems = []
    
        actionsCopy.forEach(action => {  
            if (mergedItems.some(item => item.name === action.name)) return

            let consolidated = actionsCopy.reduce((accumulator, action) => {
                if (accumulator.id !== action.id && accumulator.name === action.name) {
                    actionsCopy = actionsCopy.filter(element => element.id !== accumulator.id && element.id !== action.id)
                    return { 
                        id: action.id,
                        name: accumulator.name,
                        quantity: accumulator.quantity + action.quantity,
                        unitaryValue: this.normalizeToNumber((accumulator.unitaryValue + action.unitaryValue)/2),
                        totalValue: this.normalizeToNumber((accumulator.quantity + action.quantity) * this.normalizeToNumber((accumulator.unitaryValue + action.unitaryValue)/2)),
                    }
                }
                return {
                    id: accumulator.id,
                    name: accumulator.name,
                    quantity: accumulator.quantity,
                    unitaryValue: accumulator.unitaryValue,
                    totalValue: this.normalizeToNumber(accumulator.unitaryValue * accumulator.quantity)
                }
            }, action)

            mergedItems.push(consolidated)
        })

        return mergedItems
    }

    distributionForNewInvestment(value, distribution = this.portfolioDistribution) {
        if (!distribution) return console.error(`No distribution parameter is received. Please, inform one distribution when calling this method or set a default distribution for this portfolio.`)
        distribution.forEach(item => console.log(`${item.name} - ${((value * item.percentile)/100).toFixed(2)}`))
    }

    totalValueInvested() {
        if (this.positions.length === 1) return this.positions[0].totalValue
        const totalValueInvested = this.positions.reduce((accumulator, position) => {
            return typeof accumulator === 'number'
                ? this.normalizeToNumber(accumulator + position.totalValue)
                : this.normalizeToNumber(accumulator.totalValue + position.totalValue)
        })
        return totalValueInvested
    }

    actualDistribution() {
        const totalInvested = this.totalValueInvested()
        console.log(`total: ${totalInvested}`)
        this.positions.forEach(position => console.log(`${position.name} - ${position.totalValue} -  ${((position.totalValue/totalInvested)*100).toFixed(2)}%`))
    }

    totalBalance() {
        let balance = 0
        let purchasedPositionsCopy = JSON.parse(JSON.stringify(this.buyActions))

        this.sellActions.forEach(action => {
            purchasedPositionsCopy.forEach(item => {
                item.name === action.name && (balance += this.normalizeToNumber(action.quantity * (action.unitaryValue - item.unitaryValue)))
                purchasedPositionsCopy = purchasedPositionsCopy.filter(item => item.quantity !== 0)
            })
        })

        return balance
    }
}
