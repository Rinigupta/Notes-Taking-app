// Controller (I/O) + Events + Talk to Service

import {noteOperations} from '../services/note-service.js'
window.addEventListener('load', init);
function init(){
    showCounts();
    bindEvents();
    //disableButton();
}
const enableButton=()=>
    document.querySelector('#delete')
    .disabled = false;
const disableButton=()=>
    document.querySelector('#delete')
    .disabled=true;
    

function bindEvents(){
    document.querySelector('#add')
    .addEventListener('click', addNote);
    document.querySelector('#delete')
    .addEventListener('click',deleteMarked);
    document.querySelector('#search')
    .addEventListener('click',search);

}
function search(){
    console.log('hi');
    document.querySelector("searchBoxContainer");
//     document.querySelector("search").addEventListener("click", function() {
//     const optionsContainer = document.querySelector("optionsContainer");
//     optionsContainer.style.display = "block";
//   });

//   document.querySelector("click", function(event) {
//     const optionsContainer = document.querySelector("optionsContainer");
//     const target = event.target;

//     // if (target !== document.querySelector("myTextBox") && !target.classList.contains("dropdown-item")) {
//     //   optionsContainer.style.display = "none";
//     // }
//   });
}
function deleteMarked(){
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
}
function showCounts(){
    noteOperations.markTotal()>0
    ?enableButton():disableButton();
    document.querySelector('#total').innerText 
    = noteOperations.total();
    document.querySelector('#marktotal').innerText 
    = noteOperations.markTotal();
    document.querySelector('#unmarktotal').innerText 
    = noteOperations.unMarkTotal();
    
}
function addNote(){
    // read id , title, desc , date of completion, importance
    // DOM
    const fields =['id', 'title', 'desc', 'cdate', 'importance'];
    const noteObject = {}; // Object Literal
    for(let field of fields){
        noteObject[field] = document
        .querySelector(`#${field}`).value.trim();
    }
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
    //const id = document.querySelector('#id').value;
    //const title = document.querySelector('#title').value;   
}
function printIcon(myClassName='trash', fn, id){
    // <i class="fa-solid fa-trash"></i>
    //<i class="fa-solid fa-user-pen"></i>
    const iTag = document.createElement('i'); // <i>
    iTag.setAttribute('note-id',id);//"we are creating note-id because 'id' in table is common and is used by css and js so there is highly chance of multiple use so we create note-id to differentiate "
    iTag.className = `fa-solid fa-${myClassName} me-2 hand`;
    // console.log('hi');
    iTag.addEventListener('click',fn);
    // iTag.id=id;
    return iTag;
}
function toggleMark(){
    //console.log('Toggle Mark.... ', this);
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    const tr = icon.parentNode.parentNode;
    //tr.className = 'table-danger';
    tr.classList.toggle('table-danger');
    showCounts();
}
function edit(){
    console.log('Edit...');
}
function printNotes(notes){
    const tbody = document
    .querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note=>printNote(note));
    showCounts();
}
function printNote(noteObject){
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); // <tr>
    for(let key in noteObject){
        if(key =='isMarked'){
            continue;
        }
        const td =  row.insertCell(); //<td>
        td.innerText = noteObject[key];
    }
    const td =  row.insertCell();
    td.appendChild(printIcon('trash', toggleMark, noteObject.id));
    td.appendChild(printIcon('user-pen', edit, noteObject.id));

}
