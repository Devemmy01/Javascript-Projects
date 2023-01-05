let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify( myLeads ) )
        render(myLeads)
   
    });

    
})
 
function render(leads) {
    let listItem = ""
    for (let i = 0; i < leads.length; i++){
        listItem += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li> `
    
    }
    ulEl.innerHTML = listItem
}


deleteBtn.addEventListener("click", function() {
    let text = "Are you sure you want to delete leads?"
    if (confirm(text) == true){
        localStorage.clear()
        myLeads = []
        render(myLeads)
    } else{
        
    }

    
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})
 
