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
    },{
        questions: {
            question: "hello world",
            type: 0,
            answers: [
            'Hårtab', 'Søvnmangel' , 'Træthed' ,
            'Hudproblemer' ,
            'Fordøjelsesproblemer' 
            ]


        }
    }]);
let currentData = ref("");







let update = () => {

    fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json",{
    method: "GET"})
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            data = result;

        })
        .catch((error) => {
            console.error(error);
        });


   
}


let update2 = () => {
    currentData.value = data.value[1].questions;


}
update2(); 

console.log(" ");
console.log(data);
console.log(data[0]);
let previousQuestion = ()=>{
currentQuestion-=1;

}
let nextQuestion = ()=>{
currentQuestion+=1;

}
</script>

<template>
      <div class="QuizBox">
        <h1>{{ currentData.question }}</h1>
        <div id="options">
            <div v-if="currentData.type == 0">
               <div v-for="Opt in currentData.answers">
                    <div class="option">
                        <input type="checkbox" :name="Opt" :value="Opt" :id="Opt">
                        <label :for="Opt"> {{ Opt }}</label>
                    </div>
                </div>
            
            </div>

            <div v-else-if="currentData.questions.type == 1" >
                <div class="option">
                    <input type="radio" name="choice" value="choice-1" id="choice-1" checked>
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

            <div v-else-if="currentData.questions.type == 2" >
                <div class="option">
                    <input type="radio" name="choice" value="choice-1" id="choice-1" checked>
                    <label for="choice-1">Choice 1</label>
                </div>
                <div class="option">
                    <input type="radio" name="choice" value="choice-2" id="choice-2">
                    <label for="choice-2">Choice 2</label>
                </div>
            </div>

        
            <div v-else-if="currentData.questions.type == 3" >
                <input type=" text" class="inputText"/>
            </div>
            </div>
     
    </div>
    <div id="navigation">
            <button onclick="nextQuestion">Forrige</button>
            <button onclick="previousQuestion">Næste</button>
    </div>
   
  <div class="QuizBox">
    <h1>Hello World</h1>
    <div id="options">
      <div class="option">
        <input type="radio" name="choice" value="choice-1" id="choice-1" checked>
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
    <div id="navigation">
            <button onclick="nextQuestion">Forrige</button>
            <button onclick="previousQuestion">Næste</button>
    </div>
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
      margin-left: 5px;
      width: 80%;
  }
  #navigation{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 50px 10%;
      
  }
  #navigation button{
      width: 150px;
      height: 75px;
      border-radius: 20px;
      border-style: solid;
      border-width: 2px;
      border-color: black;
      background-color: deeppink;    
  }

</style>