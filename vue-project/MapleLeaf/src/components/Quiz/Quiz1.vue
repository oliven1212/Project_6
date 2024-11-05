<script setup>
import {ref} from "vue";
let currentQuestion = 0;
let data = ref([{
        questions: {
            question: "hello world",
            type: 0,
            answers: [
                "hellogalaxy","worldhello"
            ]
        }


    }]);
let currentData = ref("");
let temptype = ref(0);











    fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json",{
    method: "GET"})
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            data.value =  result;
            
        })
        .catch((error) => {
            console.error(error);
        });

        
    let putDatabase =()=>{
    fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.value), // Send `data.value` som ny værdi for at overskrive eksisterende data
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("Data er blevet overskrevet:", result);
            update(); // Opdater for at vise de nye data
        })
        .catch((error) => {
            console.error("Fejl ved overskrivning af data:", error);
        });
    }
let update = () => {

    currentData.value = data.value[currentQuestion].questions;


}
update(); 

//denne funktion gemmer dataen fra skemaet til databasen
let saveQuestion = () => {
    let answer = [];
    for(let i = 0; i < inputBoxes.value.length; i++){
        answer.push(document.getElementById("inputbox"+i).value);
    }
    
    console.log(answer);
    data.value.push({
            questions: {
                question: document.getElementById("inputTitel").value,
                type: temptype,
                answers: [...answer],
            },
        });  
        currentQuestion = data.value.length-1;
        update();
        console.log(data.value.questions);
        putDatabase();
}

let inputBoxes = ref([]);

let addQuestion = () => {
    currentData.value.type=3;
    currentData.value.question = "";
    addInputbox();
};

let addInputbox = () => {
    inputBoxes.value.push(`inputbox${inputBoxes.value.length}`);

}

let deleteQuestion = () => {
    if (data.value.length > 1) { // Sørg for, at der er mindst ét spørgsmål tilbage
        data.value.splice(currentQuestion, 1);
        currentQuestion = Math.min(currentQuestion, data.value.length - 1); // Juster `currentQuestion`
        update();
    } else {
        alert("Der skal være mindst ét spørgsmål tilbage!");
    }
};

console.log(" ");
console.log(data);
console.log(data[0]);
let previousQuestion = ()=>{
    if(currentQuestion > 0){
        currentQuestion-=1;
        update(); 
    }
}
let nextQuestion = ()=>{
    if(currentQuestion < data.value.length-1){
        currentQuestion+=1;
        update();

    }
}


let isEditing = false;

</script>

<template>
      <div class="QuizBox">
        <h1 v-if="currentData.type != 3">{{ currentData.question }}</h1>
        <div id="options">
            <div v-if="currentData.type == 0">
               <div v-for="Opt in currentData.answers">
                    <div class="option">
                        <input type="checkbox" :name="Opt" :value="Opt" :id="Opt">
                        <label :for="Opt"> {{ Opt }}</label>
                    </div>
                </div>
            </div>


            <div v-else-if="currentData.type == 1" >
                <div class="option">
                    <input type="radio" name="choice" value="choice-1" id="choice-1">
                    <label for="choice-1">Choice 1</label>
                </div>
                <div class="option">
                    <input type="radio" name="choice" value="choice-2" id="choice-2">
                    <label for="choice-2">Choice 2</label>
                </div>
                <div class="option">
                    <input type="radio" name="choice" value="choice-3" id="choice-3">
                    <label for="choice-3">Choice 3</label>
                </div>
            </div>


        
            <div v-else-if="currentData.type == 2" >
                <input type=" text" class="inputText"/>
            </div>


            <div v-else-if="currentData.type == 3" >
                <div class="option">
                    <label for="inputTitel">Spørgsmål:</label>
                    <input type="text" id="inputTitel" class="inputText" />
                </div>
                <div class="option">
                    <label for="listeType">Vælg format</label>
                <select v-model="temptype" name="" id="listeType">
                    <option value="0">Flere svarmuligheder</option>
                    <option value="1">En svarmulighed</option>
                    <option value="2">Skrevet svar</option>
                </select>

                </div>
                <div v-for="(input,index) in inputBoxes" class="option">
                    <label :for="input">Svar  {{ index+1 }}: </label>
                    <input type="text" :id="input" class="inputText"/>
                </div>
                
            </div>
            </div>
     
    </div>
    <div v-if="isEditing">
            <h2>Rediger Spørgsmål</h2>
            <input v-model="editInput" type="text" class="inputText" />
            <button @click="saveEditedQuestion" class="buttons">Gem Ændringer</button>
            <button @click="isEditing = false" class="buttons">Annuller</button>
        </div>
    <div id="navigation">
            <button v-if="currentData.type != 3" v-on:click="previousQuestion()" class="buttons">Forrige</button>
            <button v-if="currentData.type != 3" v-on:click="addQuestion()"class="buttons">Tilføj Spørgsmål</button> 
        <button v-on:click="deleteQuestion()"class="buttons">Slet Spørgsmål</button> 
        <button v-if="currentData.type != 3" v-on:click="saveChanges()"class="buttons">Redigere spørgsmål</button> 
        <button v-if="currentData.type == 3" v-on:click="addInputbox()" class="buttons">Tilføj input</button>
        <button v-if="currentData.type == 3" v-on:click="saveQuestion()"class="buttons">Gem svar</button>
        <button v-if="currentData.type != 3" v-on:click="nextQuestion()"class="buttons">Næste</button>
    </div>
   

</template>

<style scoped>
  .QuizBox{
    display: block;
    width: 100%;
    margin: auto;

  }
  .QuizBox h1{
      margin:auto;
      margin-top: 50px;
      width: 50%;
  }
  .option{
      border-style:solid;
      border-radius: 10px;
      border-width: 2px;
      width: 40%;
      height: 100%;
      margin: 15px auto;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
  }
  label{
      margin-left: 22px;
      margin-right: 10px;
      width: 25%;
  }
  #navigation{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 50px 10%;
      
  }
 .buttons{
      width: 150px;
      height: 75px;
      border-radius: 20px;
      border-style: solid;
      border-width: 2px;
      border-color: black;
      background-color: lightgrey;    
  }
  .inputText{
    width: 70%;
    margin: auto;
  }

  
  select{
    width: 70%;
  }

</style>