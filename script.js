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

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    if (display.value === "" || display.value.charAt(display.value.length - 1) === " ") return;
    display.value += " " + addBtn.textContent + " ";
    let numOfDigits = display.value.indexOf(" ", skip);
    result += parseInt(display.value.slice(skip, numOfDigits));
    skip += numOfDigits + 3;
    // console.log("result = " + result);
    // console.log("skip = " + skip);
});