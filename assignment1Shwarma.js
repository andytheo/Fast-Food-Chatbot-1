const Order = require("./assignment1Order");

// Initialize variables
let drink_cost = 0;

const large_size = 10;
const medium_size = 7;
const small_size = 5;

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TYPE:   Symbol("type"),
    DRINKS:  Symbol("drinks"),
    // Second order item 
    SECOND_ITEM: Symbol("welcoming"),
    RICE: Symbol("rice"),
    SIZE2:   Symbol("size2"),
    TYPE2:   Symbol("type2"),
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sType = "";
        this.sDrinks = "";
        this.sItem = "shawarama";
        // Add second order (Rice)
        this.sItem2 = "Rice";
        this.sType2 = "";
        this.sSize2 = "";
        // Add total cost 
        this.nTotal_Cost = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Andrew's Shawarma shop.");
                aReturn.push("What meal size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.SECOND_ITEM
                this.sSize = sInput;
                if (this.sSize == "large") {
                    this.nTotal_Cost += large_size;
                } else if (this.sSize == "medium") {
                    this.nTotal_Cost += medium_size;
                } else {
                    this.nTotal_Cost += small_size;
                }
                aReturn.push("What would you add to the shawarma?");
                break;
            // Check to see if rice will be ordered
            case OrderState.SECOND_ITEM:
                this.stateCur = OrderState.SIZE2;
                this.sType = sInput;
                aReturn.push("Would you buy some rice? If yes, what size?");
                break;
            case OrderState.SIZE2:
                this.sSize2 = sInput
                this.stateCur = OrderState.TYPE
                if (sInput.toLowerCase() != "no") {
                    if (this.sSize2 == "large") {
                    this.nTotal_Cost += large_size;
                    } else if (this.sSize2 == "medium") {
                        this.nTotal_Cost += medium_size;
                    } else {
                        this.nTotal_Cost += small_size;
                    }
                aReturn.push("What would you add to the rice?");
                break;
                }
            // Check to see if a drink will be ordered
            case OrderState.TYPE:
                this.stateCur = OrderState.DRINKS
                this.sType2 = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    drink_cost = 2;
                }
                aReturn.push("Thank you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sType}.`);
                if (this.sSize2 != "no") {
                    aReturn.push(`Order 2: ${this.sItem2} with ${this.sType2}.`); 
                }
                if(this.sDrinks){
                    aReturn.push(` with a drink of ${this.sDrinks}`);
                }
                aReturn.push(`Total is $${this.nTotal_Cost + drink_cost}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}