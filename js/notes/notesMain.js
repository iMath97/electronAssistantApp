// imports
import Data from "../filehandler.js";

// objects
let data = new Data("./data/todo.json");


// variables
let notes = data.getData();
let index = 0;
let amountSubjects = notes.length;


// document selectors
const subjectsDiv = document.getElementById("subjectContainer");
const subjectTitelData = document.getElementById('subject-titel-data');
const subjectNote = document.getElementById('noteblock');
const dataDiv = document.getElementById('dataDiv');
const delButton = document.getElementById('deleteBTN');
const saveButton = document.getElementById('saveBTN');
const inputFormAddNew = document.getElementById('addNoteForm');
const inputFormNew = document.getElementById('inputForm');
const openButton = document.getElementById('addSubjectButton');
const openDiv = document.getElementById('addForm');
const closeButton = document.getElementById('closeNewForm');
const newSub = document.getElementById('addNoteBTN');

// functions
// call functions on pageload
renderSidebar();
renderData(index);
interactivePoints();

// subjects sidebar
function renderSidebar(){
    subjectsDiv.innerHTML = "";
    amountSubjects = notes.length;

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
            subject.innerText = notes[i].subject;

            subjectsDiv.appendChild(card);
            card.appendChild(subject);
        }
    } else {
        let empty = document.createElement("p");
        empty.classList.add("empty");
        empty.innerText = "Nog geen notities gemaakt!";

        subjectsDiv.appendChild(empty);
    }
}

// data rendering
function renderData(index){
    amountSubjects = notes.length;
    const emptyDiv = document.getElementById('emptyDiv');
    let newButton = document.createElement('button');
    
    if(amountSubjects > 0){
        // render title
        subjectTitelData.innerText = notes[index].subject;

        // render note
        dataDiv.classList.remove("hidden");
        emptyDiv.classList.add('hidden');
        subjectNote.value = notes[index].message;

    } else {
        subjectTitelData.innerText = "";
        dataDiv.classList.add("hidden");
        emptyDiv.classList.remove('hidden');

        if(emptyDiv.children.length < 1){
            
            newButton.innerText = "Nieuwe notitie";
            emptyDiv.appendChild(newButton);
        }
        
        newButton.addEventListener("click", () => {
            openDiv.style.bottom = "0rem";
            interactivePoints();
        })
    }
}

// select points
function interactivePoints(){
    for(let i = 0; i<notes.length; i++){
        let point = document.getElementById("number_"+i);
        point.addEventListener("click", () => {
            renderData(i);
            index = i;
        });
    }
}

// update json file
function writeFile(){
    let newNotes = JSON.stringify(notes);
    data.writeData(newNotes);
}

// event listeners
// remove subject
delButton.addEventListener("click", () => {
    notes.splice(index, 1);
    renderData(0);
    index = 0;
    renderSidebar();
    writeFile();
    interactivePoints();
});

// prevent page reload on interacting with form
inputFormAddNew.addEventListener('submit', (e) => {
    e.preventDefault();
});
inputFormNew.addEventListener('submit', (e) => {
    e.preventDefault();
});

// save note
saveButton.addEventListener("click", () => {
    notes[index].message = subjectNote.value;
    writeFile();
    interactivePoints();
});

// open div new note
openButton.addEventListener("click", () => {
    openDiv.style.bottom = "0rem";
    interactivePoints();
});

// close div new
closeButton.addEventListener("click", () => {
    openDiv.style.bottom = "-14rem";
    interactivePoints();
});

// add subject
newSub.addEventListener("click", () => {
    // get input
    const input = document.getElementById('input').value;
    
    if(input != null && input != ""){
        notes.push({subject: input, message: ""});
        document.getElementById('input').value = "";
        renderSidebar();
        writeFile();
        openDiv.style.bottom = "-14rem";
        index = notes.length-1;
        renderData(index);
        interactivePoints();
    }
});