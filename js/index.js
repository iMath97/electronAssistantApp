// let id = "number_" + i.toString();
// card.setAttribute("id", id);

const gridContainer = document.getElementById('grid-container');
let gridItems = document.getElementsByClassName('grid-item');
console.log(gridItems.length);

for(let i = 0; i<gridItems.length; i++){
    let id = "number_" + i.toString();
    gridItems[i].setAttribute("id", id);
}

for(let j = 0; j<gridItems.length; j++){
    gridItems[j].addEventListener("click", () => {
        sendToPage(j);
    });
}

function sendToPage(idNumber){
    switch (idNumber) {
        case 0:
            window.location.assign("./todo.html");
            break;
        case 1:
            window.location.assign("./notes.html");
            break;
    }
}