
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSettings = {   
    databaseURL: "Removed for safety"
}


const app = initializeApp(appSettings);
const database = getDatabase(app);
const qsInDB = ref(database, "questions");



const qInput = document.getElementById('qinput');
const addButton = document.getElementById('add-button');

const questionsList = document.getElementById('questions-list');



function clearList() {
    questionsList.innerHTML = "";

}

onValue(qsInDB, function(snapshot){
    clearList();
    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val());
    console.log(itemsArray);
    
        for (let i = 0; i < itemsArray.length; i++){
            listUpdater(itemsArray[i]);
        }
    }
    else{
            console.log("Bruh");
        }
        
        
})


function listUpdater(entry) {
    let valueID = entry[0];
    let value = entry[1];

    let numberofExistinglists = questionsList.childElementCount;
    let nListID = numberofExistinglists++;

    let newItem = document.createElement('li');
    newItem.id = nListID;
    newItem.textContent = value;

    newItem.addEventListener('click', () => {
        let exactLocationoftheIteminDB = ref(database, `questions/${valueID}`);
        remove(exactLocationoftheIteminDB);
        // console.log(exactLocationoftheIteminDB);
    })

    questionsList.appendChild(newItem);

    
    // questionsList.innerHTML += `<li id="${nListID}">${value}</li>`;
}


addButton.addEventListener('click', ()=>{
    let question = qInput.value;

    push(qsInDB, question);
    
    console.log(question);
})
