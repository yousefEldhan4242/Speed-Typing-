let startBtn = document.querySelector(".start-button");
let selectBox = document.querySelector("#difficulty");
let infoBlock = document.querySelector(".info-block");

let levelsObj ={
    "Easy": 5,
    "Medium": 3,
    "Hard": 2,
}

let lvlObjEntries = Object.entries(levelsObj);
for (let i = 0; i < lvlObjEntries.length; i++){
    let option = document.createElement("option");
    option.textContent = lvlObjEntries[i][0];
    option.value = lvlObjEntries[i][0];
    selectBox.appendChild(option);
} 

infoBlock.textContent = `${selectBox.value} Level Takes ${levelsObj[selectBox.value]} Seconds For Each Word`
selectBox.onchange = () =>{
    infoBlock.textContent = `${selectBox.value} Level Takes ${levelsObj[selectBox.value]} Seconds For Each Word`
}

startBtn.addEventListener("click", () =>{
    localStorage.setItem("level", selectBox.value);
});
