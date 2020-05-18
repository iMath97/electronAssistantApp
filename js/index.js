// document selectors
const gridContainer = document.getElementById('grid-container');
let gridItems = document.getElementsByClassName('grid-item');

// add id's to grid items
for(let i = 0; i<gridItems.length; i++){
    let id = "number_" + i.toString();
    gridItems[i].setAttribute("id", id);
}

// event listener
for(let j = 0; j<gridItems.length; j++){
    gridItems[j].addEventListener("click", () => {
        sendToPage(j);
    });
}

// functions
// load clicked page
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