const numbers = document.querySelectorAll('.num')
const signs = document.querySelectorAll('.sign')
const dot = document.querySelector('.dot')
const display = document.querySelector('input')
const clearButton = document.querySelector('.c')
const removeButton = document.querySelector('.r')
const equal = document.querySelector('.equal')

class Calculator {
    display
    signView
    signOperator
    operators = ['+', '✕', '÷', '-']
    isDot = false


    setDisplay (value) {
        display.value += value
        
    }

    get lastValue () {
        return display.value[display.value.length - 1]
    }
    get firstValue () {
        return display.value[0]
    }
    numbers (event){
        const num = event.target.textContent.trim()

        if (this.lastValue == 0 && display.value.length == 1)  return display.value = num

        if(this.lastValue == 0 && this.signView) return display.value = display.value.slice(0, -1) + num 
        
        

        return   this.setDisplay(num)
        
    }
    signs (event){
        const signView = event.target.textContent.trim()
        const signOperator = event.target.dataset.sign
        console.log(signOperator);

        if(this.operators.includes(this.lastValue)) return display.value = display.value.slice(0, -1) + signView

        if(!display.value || this.lastValue == '.' || this.signOperator) return
        
        this.signView = signView
        this.signOperator = signOperator
      return  this.setDisplay(signView)
    }
    dot (){

            if(!display.value || this.operators.includes(this.lastValue)){
                display.value += '0.'
            }

          if(!display.value || this.lastValue == '.' || this.operators.includes(this.lastValue)) return

          return this.setDisplay('.')
    }
    calculate (){
        const [num1, num2] = display.value.split(this.signView)
        display.value = eval(num1 + this.signOperator + num2)
    }
    clear (){
        display.value = null
        this.signOperator = null
        this.signView = null
        this.isDot = false
        }
    remove (){

               if(this.operators.includes(this.lastValue)){
                this.signOperator = null
                this.signView = null
               }

        let delated = display.value.split('')
        let newValue = display.value.split('').slice(0,-1).join('')
        display.value = newValue

    }  
}
let calculator = new Calculator()

for (const number of numbers) {
    number.addEventListener('click', (event) => {
        return calculator.numbers(event)
    })
}
for (const sign of signs) {
    sign.addEventListener('click', (event) => {
        return calculator.signs(event)
    })
}
dot.addEventListener('click', () => {
    calculator.dot()
})
clearButton.addEventListener('click', () => {
    calculator.clear()
})
removeButton.addEventListener('click', () => {
    calculator.remove()
})
equal.addEventListener('click', () => {
    calculator.calculate()
})
