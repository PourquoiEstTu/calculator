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
            if (btn.textContent !== "0") display.value += btn.textContent;
        }
        else if (display.value.charAt(0) === "=") {
            if (btn.textContent !== "0") {
                display.value = "";
                display.value += btn.textContent;
            }
        }
        else if (display.value.charAt(skip) === "0") return;
        else if (display.value.charAt(skip - 2) === "÷") {
            if (btn.textContent !== "0") {
                display.value += btn.textContent;
            }
        }
        else display.value += btn.textContent;
        display.scrollLeft = display.scrollWidth;
    }));

// clear display
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
    display.value = "";
    result = 0;
    skip = 0;
});

function editDisplay(btn, checkChar) {
    if (display.value === "" || display.value.charAt(0) === "=") return false;
    if (checkChar) {
        if (display.value.charAt(display.value.length - 1) === " ") return false;
    }

    display.value += " " + btn.textContent + " ";
    let numOfDigits = display.value.indexOf(" ", skip) - skip; // number of digits in current number entered
    console.log("numOfDigits = " + numOfDigits);
    display.scrollLeft = display.scrollWidth;
    return numOfDigits; 
}

function updateResult(lastOperationIndex, numOfDigits) {
        switch (display.value.charAt(lastOperationIndex)) {
            case "-":
                result -= parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
                break;
            case "+":
                result += parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
                break;
            case "×":
                result *= parseFloat(display.value.slice(skip, skip + numOfDigits));
                result = parseFloat(result.toFixed(5))
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
    let numOfDigits = editDisplay(addBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    console.log("result = " + result);
    console.log("skip = " + skip);
});

const subtractBtn = document.querySelector("#subtract");
subtractBtn.addEventListener("click", () => {
    let numOfDigits = editDisplay(subtractBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    console.log("result = " + result);
    console.log("skip = " + skip);
});

const multiplyBtn = document.querySelector("#multiply");
multiplyBtn.addEventListener("click", () => {
    let numOfDigits = editDisplay(multiplyBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    console.log("result = " + result);
    console.log("skip = " + skip);
});

const divideBtn = document.querySelector("#divide");
divideBtn.addEventListener("click", () => {
    let numOfDigits = editDisplay(divideBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    console.log("result = " + result);
    console.log("skip = " + skip);
});

const modBtn = document.querySelector("#mod");
modBtn.addEventListener("click", () => {
    let numOfDigits = editDisplay(modBtn, true);
    if (!numOfDigits) return;

    if (result === 0) {
        result = parseInt(display.value.slice(skip, skip + numOfDigits));
        skip += numOfDigits + 3;
    }
    else {
        let lastOperationIndex = skip - 2;
        updateResult(lastOperationIndex, numOfDigits);
    }
    console.log("result = " + result);
    console.log("skip = " + skip);
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

    let numOfDigits = editDisplay(equalsBtn, false);
    if (!numOfDigits) return;
    let lastOperationIndex = skip - 2;
    updateResult(lastOperationIndex, numOfDigits);
    console.log("result = " + result);
    display.value = `= ${result}`;
    result = 0;
    skip = 0;
})