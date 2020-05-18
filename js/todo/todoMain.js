// imports
import Data from "../filehandler.js";

// objects
let data = new Data("./data/todo.json");

// variables
let Lists = data.getData();
let index = 0;
let amountSubjects = Lists.length;
let isActive = false;

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
deleteSubs();

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

            // delete button
            // paragraph
            let pDel = document.createElement("p");
            pDel.classList.add("card-del");


            // icon
            let btnDel = document.createElement("i");
            btnDel.classList.add("fas");
            btnDel.classList.add("fa-window-close");
            id = "deleteSub_"+i.toString();
            btnDel.setAttribute("id", id);

            // create card-titel
            let subject = document.createElement("p");
            subject.classList.add("card-titel");
            subject.innerText = Lists[i].subject;

            subjectsDiv.appendChild(card);
            card.appendChild(subject);
            card.appendChild(pDel);
            pDel.appendChild(btnDel);
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
        const numberOfPoints = Lists[index].punten.length;
        subjectTitelData.innerText = Lists[index].subject;

        // render points
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
            if(i < Lists.length){
                renderData(i);
                index = i;
                deletePoint();
            }
            
            
            deleteSubs();
        })
        
        deleteSubs();
    }
}

// remove points
function deletePoint(){
    amountSubjects = Lists.length;
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

function deleteSubs(){
    amountSubjects = Lists.length;
    if(amountSubjects > 0 && isActive == false){
        isActive = true;
        for(let i = 0; i<Lists.length; i++){
            const delButton = document.getElementById(`deleteSub_${i}`);
        
            delButton.addEventListener("click", () => {
                if(i == Lists.length-1){
                    Lists.pop();
                } else {
                    Lists.splice(i, 1);
                }
                index = 0;
                renderData(0);
                renderSidebar();
                writeFile();
                interactivePoints();
                deletePoint();
                isActive = false;
            });

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
        isActive = false;
        deleteSubs();
        deletePoint();
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
        index = Lists.length-1;
        renderData(index);
        isActive = false;
        deleteSubs();
        deletePoint();
    }
})



