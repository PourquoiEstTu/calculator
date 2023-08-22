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

// clear display
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => display.value = "");

let result;
let skip = 0;
const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    display.value += " " + addBtn.textContent + " ";
    let numOfDigits = display.value.indexOf(" ", skip);
    result = parseInt(display.value.slice(skip, numOfDigits));
    skip += numOfDigits + 2;
});
console.log(result);