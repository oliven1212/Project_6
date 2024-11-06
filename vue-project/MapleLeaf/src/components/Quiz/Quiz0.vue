<script setup>
import { onMounted, ref } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

let firebaseConfig;
let auth;
let vertexAI;
let model;
let currentQuestion = 0;
let data = ref(null);
let currentData = ref("");

const initializeFirebase = async () => {
  try {
    const response = await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/secret.json", { method: "GET" });
    const result = await response.json();
    firebaseConfig = result[Object.keys(result)];
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    vertexAI = getVertexAI(app);
    model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Error fetching Firebase config or initializing Firebase:", error);
  }
};

const getData = async () => {
  try {
    const response = await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json", { method: "GET" });
    data.value = await response.json();
    update();
  } catch (error) {
    console.error(error);
  }
};

const update = () => {
  if (data.value && data.value[currentQuestion]) {
    currentData.value = { ...data.value[currentQuestion].questions };
  }
};

// Call async functions after mounting to avoid returning promises in `setup`
onMounted(() => {
  initializeFirebase();
  getData();
});

let quizQuestion = ref([
    {
        text: "Rangere dit energi level",
        optionsEnergi:[
            {text:"Meget lav", prompt: "jeg har meget lav energi", id: "megetlav"},
            {text:"lav", prompt: "jeg harlav energi",id: "lav"},
            {text:"Moderat", prompt: "jeg har moderatenergi",id: "moderat"},
            {text:"over gennemsnittet", prompt: "jeg har over gennemsnittet energi",id: "over gennemsnittet"},
            {text:"høj", prompt: "jeg har høj Energi",id: "høj"}
        ]

    }


]);
let userAnswers=ref([]);
let prompts = ref([]); // store prompts for hver spørgsmål
let recommendations = ref([]); // udskriver alle anbefalingerne

function toggleAnswer(id){
    const index = userAnswers.value.indexOf(id);
    if(index === -1){
        userAnswers.value.push(id)
    
    } else{
        userAnswers.value.splice(index,1);
    }
}
    function createPrompt() {
        const selectedOption = quizQuestion.value[0].optionsEnergi.find(option => userAnswers.value.includes(option.id));
    return selectedOption
    ? `Brugeren har angivet følgende energiniveau: ${selectedOption.prompt}. Giv anbefalinger til relevante vitaminer og kosttilskud, der kan hjælpe med at optimere energiniveau og generelle sundhed.`
    : `ingen energi information er angivet`;
    }

    function saveprompt(){
        const prompt = createPrompt();
        prompts.value.push(prompt); // skubber hver prompt ind i array
        console.log("prompt saved:",prompt);

    }
const generateRecommendations = async () => {
    if (!model){
        console.error("Model is not initialized yet.");
        return;
    }
    
    for (const prompt of prompts.value){
         
        try{
            const result = await model.generateContent(prompt)
            const responseText = await result.response.text();
            recommendations.value.push(responseText);
        }catch(error){
            console.error("error generating content",error);
        }
        
    }
};
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

</script>

<template>
    <div class="QuizBox" v-if="1==2" >
        <h1>Rangere dit energi
            level?</h1>
        <div id="options">
            <div 
             v-for="(option, index) in quizQuestion[0].optionsEnergi"
             :key="index"
             class="option"
            >
                <input
                type="checkbox"
                :id="option.id"
                :value="option.id"
                :checked="userAnswers.includes(option.id)"
                @change="toggleAnswer(option.id)"
                />

                <label :for ="option.id">{{ option.text }}</label>
            </div>
        </div>
    </div>
    <div class="QuizBox" v-if="data">
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


            <div v-else-if="currentData.type == 1" >
                <div v-for="Opt in currentData.answers">
                    <div class="option">
                        <input type="radio" name="Optionss" :value="Opt" :id="Opt">
                        <label :for="Opt"> {{ Opt }}</label>
                    </div>
                </div>
            </div>

        
            <div v-else-if="currentData.type == 2" >
                <div class="option">
                    <input type=" text" id="textType2" class="inputText"/>
                </div>  
            </div>
        </div>    
    </div>
    <div v-if="data" id="navigation">
    <button @click="saveprompt()"> Næste </button>
    <button v-if="data.lenght == currentQuestion" @click="generateRecommendations()">hvis Anbefalinger</button>
    <button v-if="currentData.type != 3" v-on:click="previousQuestion()" class="buttons">Forrige</button>
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
      width: 100%;

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
  .Cross {
    width: 30px;
    margin-left: 10px;
    background-color: rgb(255, 165, 165);
    border-width: 1px;
  } 
  .Cross img {
    width: 100%;
  }

</style>