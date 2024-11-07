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
let currentData = ref({ type: null, answers: [] });
let prompt = `"Analyser og udskriv en liste over vitaminer og kosttilskud,
 der er anerkendt for deres sundhedsmæssige fordele ifølge den nyeste forskning.
  Inkluder kun information, der stammer fra data indsamlet efter [sæt en ønsket dato, f.eks. 2022].
   Sørg for, at alle anbefalinger og beskrivelser er baseret på opdaterede videnskabelige studier og retningslinjer.
    Liste informationen pr. supplement og dæk følgende punkter: 1) Beskrivelse og primære fordele, 2) Anbefalet daglig dosis, 3)
     Eventuelle bivirkninger, og 4) Kilder i naturen (hvis relevant). Sørg for, at data og anbefalinger stemmer overens med moderne, evidensbaserede standarder.
      der kommer en masse spørgsmål og svar du skal forholde dig til. det er dummy data for at vise et eksemple og kan du skrive det"`;

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
    quizQuestion.value = await response.json();
    update();
  } catch (error) {
    console.error(error);
  }
};

const update = () => {
  if (quizQuestion.value && quizQuestion.value[currentQuestion]) {
    currentData.value = { ...quizQuestion.value[currentQuestion].questions };
  } else {
    console.warn("Ingen spørgsmål fundet for currentQuestion:", currentQuestion);
    currentData.value = { type: null, answers: [] }; // fallback hvis spørgsmål ikke findes
  }
};

// Call async functions after mounting to avoid returning promises in `setup`
onMounted(() => {
  initializeFirebase();
  getData();
});

let quizQuestion = ref([]);
let userAnswers=ref([]);
let prompts = ref([]); // store prompts for hver spørgsmål
let recommendations = ref([]); // udskriver alle anbefalingerne

function saveUserAnswer(value) {
  if (currentData.value.type === 0) {
    // Checkbox svar - tillader flere valg
    const index = userAnswers.value.indexOf(value);
    if (index === -1) {
      userAnswers.value.push(value);
    } else {
      userAnswers.value.splice(index, 1);
    }
    console.log("Checkbox svar opdateret:", userAnswers.value);
  } else if (currentData.value.type === 1) {
    // Radio svar - kun ét valg muligt
    userAnswers.value = [value];
    console.log("Radio svar valgt:", userAnswers.value);
  } else if (currentData.value.type === 2) {
    // Tekstinput svar - lagrer som en enkelt tekststreng
    userAnswers.value = [value];
    console.log("Tekstinput svar:", userAnswers.value[0]);
  }
}
console.log(saveUserAnswer)
    

function createPrompt() {
    let promptText = ` For question ${currentData.value.question}, user selected: `;
    
    // Add answer based on the question type
    if (currentData.value.type === 0) {
        // Checkbox: list all selected answers
        const selectedOptions = currentData.value.answers.filter(answer => userAnswers.value.includes(answer));
        promptText += selectedOptions.join(", ");
    } else if (currentData.value.type === 1) {
        // Radio: single selection
        promptText += userAnswers.value[0];
    } else if (currentData.value.type === 2) {
        // Text input: free-text answer
        promptText += userAnswers.value[0];
    }
    // console.log(promptText);
    return promptText;
}
function savePrompt() {
    prompt += createPrompt();
    //prompts.value.push(prompt);  // Store each prompt for later use
    // console.log("Prompt saved:", prompt);
}

let responseText;
const generateRecommendations = async () => {
    if (!model) {
        console.error("Model is not initialized yet.");
        return;
    }
    
    // Clear previous recommendations to avoid duplicates
    recommendations.value = [];
    
    {
        try {
          const result = await model.generateContent(prompt);
console.log(prompt);
const response = result.response;
responseText = ref(response.text());  // Adjust if `result.text` directly contains the output
            console.log(responseText);
            recommendations.value.push(responseText);
        } catch (error) {
            console.error("Error generating content:", error);
        }
    }

    console.log("Recommendations generated:", recommendations.value);
    
};
let previousQuestion = ()=>{
    if(currentQuestion > 0){
        currentQuestion-=1;
        update(); 
    }
}
let nextQuestion = () => {
    savePrompt();  // Save current prompt before moving to the next question
    if (currentQuestion < quizQuestion.value.length - 1) {
        currentQuestion += 1;
        update();
    }
};

</script>

<template>
    <div v-if="!responseText">
    <div class="QuizBox" v-if="quizQuestion">
  <h1>{{ currentData.question }}</h1>
  <div id="options">
    <!-- Checkbox-options -->
    <div v-if="currentData.type === 0">
      <div v-for="(Opt, index) in currentData.answers" :key="index" class="option">
        <input 
          type="checkbox" 
          name="optionss"
          :id="Opt" 
          :value="Opt"
          :checked="userAnswers.includes(Opt)"
          @change="saveUserAnswer(Opt)">
        <label :for="Opt">{{ Opt }}</label>
      </div>
    </div>

    <!-- Radio-options -->
    <div v-if="currentData.type === 1">
      <div v-for="(Opt, index) in currentData.answers" :key="index" class="option">
        <input 
          type="radio" 
          name="Optionss" 
          :value="Opt" 
          :id="Opt"
          :checked="userAnswers.includes(Opt)" 
          @change="saveUserAnswer(Opt)">
        <label :for="Opt">{{ Opt }}</label>
      </div>
    </div>

    <!-- Text-input -->
    <div v-if="currentData.type == 2">
      <div class="option">
        <input 
          type="text" 
          :id="textType2" 
          class="inputText" 
          @input="saveUserAnswer($event.target.value)">
      </div>  
    </div>
  </div>    
</div>
<div v-if="quizQuestion" id="navigation">
    <button @click="saveprompt()"> Næste </button>
    <button @click="generateRecommendations()">hvis Anbefalinger</button>
    <button v-if="currentData.type != 3" v-on:click="previousQuestion()" class="buttons">Forrige</button>
    <button v-if="currentData.type != 3" v-on:click="nextQuestion()"class="buttons">Næste</button>

    </div>
  </div> 
    <div>
      <pre>{{ responseText}}</pre >
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