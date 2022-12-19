const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST = [], id = 0;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", (e)=>{
    let text = "Are you sure you want to refresh page?"
    if (confirm(text) == true){
        localStorage.clear();
        location.reload();
    } else{
        
    }
    
})

const options = {weekday : "long", month:"long", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {

    if(trash){return;}
    const DONE = done ? CHECK:UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    
    const item = `  <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}" >${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                    </li>
                   `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);              
}

document.addEventListener("keyup", (e) =>{
    if(e.key == "Enter"){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
        
    }
}) 

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", (e) =>{
    const element = e.target;
    const elementJob = element.attributes.job.value;

    let text = "Are you sure you want to delete TO-DO??"
    

    if(elementJob == "complete"){
        completeToDo(element);
    } else if (confirm(text) == true){
        removeToDo(element);
    } else{
        
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));

})