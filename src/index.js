function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const regexp = /\d+|\+|\-|\*|\/|\(|\)/g;
    const exprArr = expr.match(regexp);
  
    const leftBracketsCount = expr.match(/\(/g) ? expr.match(/\(/g).length : 0;
    const rightBracketsCount = expr.match(/\)/g) ? expr.match(/\)/g).length : 0;
  
    if (leftBracketsCount !== rightBracketsCount) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
  
    const operators = {
      "+": {
        priority: 1,
        action: (a, b) => a + b
      },
      "-": {
        priority: 1,
        action: (a, b) => a - b
      },
      "*": {
        priority: 2,
        action: (a, b) => a * b
      },
      "/": {
        priority: 2,
        action: (a, b) => a / b
      },
      "(": {},
      ")": {}
    };
  
    function calc(b, a, op) {
      if (op === "/" && b === 0) {
        throw new Error("TypeError: Division by zero.");
      }
  
      return operators[op].action(a, b);
    }
  
    const numberStack = [];
    const operatorStack = [];
  
    for (let i = 0; i < exprArr.length; i++) {
      if (!isNaN(exprArr[i])) {
        numberStack.push(Number(exprArr[i]));
      }
  
      function addOperator() {
        if (
          !operatorStack.length ||
          operatorStack[operatorStack.length - 1] === "(" ||
          exprArr[i] === "("
        ) {
          operatorStack.push(exprArr[i]);
        } else if (exprArr[i] === ")") {
          countBrackets();
          operatorStack.pop();
        } else if (
          operators[exprArr[i]].priority >
          operators[operatorStack[operatorStack.length - 1]].priority
        ) {
          operatorStack.push(exprArr[i]);
        } else {
          numberStack.push(
            calc(numberStack.pop(), numberStack.pop(), operatorStack.pop())
          );
          addOperator();
        }
      }
  
      function countBrackets() {
        if (operatorStack[operatorStack.length - 1] === "(") {
          return;
        }
  
        numberStack.push(
          calc(numberStack.pop(), numberStack.pop(), operatorStack.pop())
        );
  
        countBrackets();
      }
  
      if (exprArr[i] in operators) {
        addOperator();
      }
    }
  
    function countRest() {
      if (!operatorStack.length) {
        return;
      }
  
      numberStack.push(
        calc(numberStack.pop(), numberStack.pop(), operatorStack.pop())
      );
  
      countRest();
    }
  
    countRest();
  
    return numberStack[0];
  }


module.exports = {
    expressionCalculator
}