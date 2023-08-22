const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");

// put numbers on display
const btnsArray = Array.from(btns);
const numBtns = btnsArray.filter(btn => btn.id === "");
numBtns.forEach(btn => btn.addEventListener("click", 
    () => {
        if (display.value === "") {
            if (btn.textContent !== "0") display.value += btn.textContent;
        }
        else display.value += btn.textContent;
    }));

let result = 0;
let skip = 0;

// clear display
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
    display.value = "";
    result = 0;
    skip = 0;
});

function editDisplay(btn, checkChar) {
    if (display.value === "" ) return false;
    if (checkChar) {
        if (display.value.charAt(display.value.length - 1) === " ") return false;
    }
    display.value += " " + btn.textContent + " ";
    let numOfDigits = display.value.indexOf(" ", skip) - skip; // number of digits in current number entered
    console.log("numOfDigits = " + numOfDigits);
    return numOfDigits; 
}
const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    let numOfDigits = editDisplay(addBtn, true);
    if (!numOfDigits) {
        // console.log("here");
        return;
    }
    result += parseInt(display.value.slice(skip, skip + numOfDigits));
    skip += numOfDigits + 3;
    console.log("result = " + result);
    console.log("skip = " + skip);
});

const equalsBtn = document.querySelector("#equals");
equalsBtn.addEventListener("click", () => {
    let numOfDigits = editDisplay(equalsBtn, false);
    let lastOperationIndex = skip - 2;
    switch (display.value.charAt(lastOperationIndex)) {
        case "+":
            result += parseInt(display.value.slice(skip, skip + numOfDigits));
            display.value = `= ${result}`;
            result = 0;
            skip = 0;
            break;
    }
})