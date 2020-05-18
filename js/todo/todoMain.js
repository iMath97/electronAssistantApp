// imports
import Data from "../filehandler.js";

// objects
let data = new Data("./data/todo.json");

// variables
let Lists = data.getData();
let index = 0;
let amountSubjects = Lists.length;

// document selectors
const subjectsDiv = document.getElementById("subjectContainer");
const subjectTitelData = document.getElementById('subject-titel-data');
const points = document.getElementById('points');
const newPoint = document.getElementById('newPoint');
const newSub = document.getElementById('newSub');

// functions
// call functions on pageload
renderSidebar();
renderData(index);
interactivePoints();
deletePoint();

// subjects sidebar rendering
function renderSidebar(){
    subjectsDiv.innerHTML = "";
    amountSubjects = Lists.length;

    if(amountSubjects > 0){
        for(let i = 0; i<amountSubjects;i++){
            // create card
            let card = document.createElement("div");
            card.classList.add("card");
            let id = "number_" + i.toString();
            card.setAttribute("id", id);

            // create card-titel
            let subject = document.createElement("p");
            subject.classList.add("card-titel");
            subject.innerText = Lists[i].subject;

            subjectsDiv.appendChild(card);
            card.appendChild(subject);
        }
    } else {
        let empty = document.createElement("p");
        empty.classList.add("empty");
        empty.innerText = "Nog geen lijsten gemaakt!";

        subjectsDiv.appendChild(empty);
    }
}

// data rendering
function renderData(index){
    points.innerHTML = "";
    amountSubjects = Lists.length;

    if(amountSubjects > 0){
        // render title
        subjectTitelData.innerText = Lists[index].subject;

        // render points
        const numberOfPoints = Lists[index].punten.length;
        let element;

        for(let i = 0; i<numberOfPoints; i++){
            element = document.createElement("li");
            element.innerText = Lists[index].punten[i];

            let imgDel = document.createElement("img");
            imgDel.setAttribute("src", "img/delete.svg");
            let id = "point_"+i;
            imgDel.setAttribute("id", id);
            imgDel.classList.add("delete");

            element.appendChild(imgDel);
            points.appendChild(element);
        }
    } else {
        subjectTitelData.innerText = "";
    }
}

// select list
function interactivePoints(){
    for(let i = 0; i<Lists.length; i++){
        let point = document.getElementById("number_"+i);
        point.addEventListener("click", () => {
            renderData(i);
            index = i;
            deletePoint();
        })
        deletePoint();
    }
}

// remove points
function deletePoint(){
    if(amountSubjects > 0){
        for(let j = 0; j<Lists[index].punten.length; j++){
            let point = document.getElementById("point_"+j);
            point.addEventListener("click", () => {
                Lists[index].punten.splice(j, 1);
                renderData(index);
                writeFile();
                deletePoint();
            })
        }
    }
}

// update json file
function writeFile(){
    let newList = JSON.stringify(Lists);
    data.writeData(newList);
}

// event listeners
// new subject
const inputForm = document.getElementById('inputForm');
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

// add point
newPoint.addEventListener("click", () => {
    // get input
    const input = document.getElementById('input').value;

    if(input != null && input != ""){
        Lists[index].punten.push(input);
        document.getElementById('input').value = "";
        renderData(index);
        writeFile();
        interactivePoints();
    }
})

// add subject
newSub.addEventListener("click", () => {
    // get input
    const input = document.getElementById('input').value;
    
    if(input != null && input != ""){
        Lists.push({subject: input, punten: []});
        document.getElementById('input').value = "";
        renderSidebar();
        writeFile();
        interactivePoints();
    }
})


// remove subject
const delButton = document.getElementById('deleteSub');

delButton.addEventListener("click", () => {
    Lists.splice(index, 1);
    renderData(0);
    index = 0;
    renderSidebar();
    writeFile();
    interactivePoints();
});
