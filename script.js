const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");

let result = 0; // keeps track of the result of the most recent calculation
let skip = 0; // keeps track of most recent number entered

// put numbers on display
const btnsArray = Array.from(btns);
const numBtns = btnsArray.filter(btn => btn.id === "");
numBtns.forEach(btn => btn.addEventListener("click", 
    () => {
        if (display.value === "") {
            if (btn.textContent !== "0") {
                display.value += btn.textContent;
                btn.classList.add("transition");
            }
        }
        else if (display.value.charAt(0) === "=") {
            if (btn.textContent !== "0") {
                display.value = "";
                display.value += btn.textContent;
                btn.classList.add("transition");
            }
        }
        else if (display.value.charAt(skip) === "0") return;
        else if (display.value.charAt(skip - 2) === "÷") {
            if (btn.textContent !== "0") {
                display.value += btn.textContent;
                btn.classList.add("transition");
            }
        }
        else {
            display.value += btn.textContent;
            btn.classList.add("transition");
        }
        display.scrollLeft = display.scrollWidth;
    }));

// clear display
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
    display.value = "";
    result = 0;
    skip = 0;
    clearBtn.classList.add("transition");
});

/* when an operator is pressed, this fcn puts the operator
 * on the display and saves the number of digits in the number 
 * before the operator
 */
function updateDisplay(btn, checkChar) {
    if (display.value === "" || display.value.charAt(0) === "=") return false;
    if (checkChar) {
        if (display.value.charAt(display.value.length - 1) === " ") return false;
    }

    display.value += " " + btn.textContent + " ";
    let numOfDigits = display.value.indexOf(" ", skip) - skip; // number of digits in current number entered
    // console.log("numOfDigits = " + numOfDigits);
    display.scrollLeft = display.scrollWidth;
    return numOfDigits; 
}

/* calculates all intermediate results depending 
 * on the previous operator entered and updates 
 * result and skip accordingly
 */
function updateResult(lastOperationIndex, numOfDigits) {
        switch (display.value.charAt(lastOperationIndex)) {
            case "-":
                result -= parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
                skip += numOfDigits + 3;
                break;
            case "+":
                result += parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
                skip += numOfDigits + 3;
                break;
            case "×":
                result *= parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
                skip += numOfDigits + 3;
                break;
            case "÷":
                result /= parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
                skip += numOfDigits + 3;
                break;
            case "%":
                result %= parseInt(display.value.slice(skip, skip + numOfDigits));
                skip += numOfDigits + 3;
                break;
            default:
                break;
        }
}

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    let numOfDigits = updateDisplay(addBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    addBtn.classList.add("transition");
    // console.log("result = " + result);
    // console.log("skip = " + skip);
});

const subtractBtn = document.querySelector("#subtract");
subtractBtn.addEventListener("click", () => {
    let numOfDigits = updateDisplay(subtractBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    subtractBtn.classList.add("transition");
    // console.log("result = " + result);
    // console.log("skip = " + skip);
});

const multiplyBtn = document.querySelector("#multiply");
multiplyBtn.addEventListener("click", () => {
    let numOfDigits = updateDisplay(multiplyBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    multiplyBtn.classList.add("transition");
    // console.log("result = " + result);
    // console.log("skip = " + skip);
});

const divideBtn = document.querySelector("#divide");
divideBtn.addEventListener("click", () => {
    let numOfDigits = updateDisplay(divideBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    divideBtn.classList.add("transition");
    // console.log("result = " + result);
    // console.log("skip = " + skip);
});

const modBtn = document.querySelector("#mod");
modBtn.addEventListener("click", () => {
    let numOfDigits = updateDisplay(modBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    modBtn.classList.add("transition");
    // console.log("result = " + result);
    // console.log("skip = " + skip);
});

const equalsBtn = document.querySelector("#equals");
equalsBtn.addEventListener("click", () => {
    let eqn = display.value; 
    // console.log("value = " + eqn.charAt(skip));
    if (eqn.charAt(skip) === "") {
        if (eqn.charAt(skip - 2) === "+" || eqn.charAt(skip - 2) === "-" 
                || eqn.charAt(skip - 2) === "×" || eqn.charAt(skip - 2) === "÷"
                || eqn.charAt(skip - 2) === "%") return;
    }
    if (skip <= 0) return;

    let numOfDigits = updateDisplay(equalsBtn, false);
    if (!numOfDigits) return;
    let lastOperationIndex = skip - 2;
    updateResult(lastOperationIndex, numOfDigits);
    // console.log("result = " + result);
    display.value = `= ${result}`;
    result = 0;
    skip = 0;
    equalsBtn.classList.add("transition");
});

/* removes the transition class from the clicked button
 * and ends the transition
 */
btns.forEach(btn => btn.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    btn.classList.remove("transition"); 
}));