<script setup>
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getVertexAI,getGenerativeModel} from "firebase/vertexai";
import{ref} from "vue";

let firebaseConfig;
let auth;
let vertexAI;
let model;

const initializeFirebase = async () => {
    try {
        const response = await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/secret.json", {
            method: "GET"
        });
        const result = await response.json();
        firebaseConfig = result[Object.keys(result)];

        // Initialize Firebase after fetching configuration
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        vertexAI = getVertexAI(app);
        model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

        console.log("Firebase initialized successfully.");
    } catch (error) {
        console.error("Error fetching Firebase config or initializing Firebase:", error);
    }
};
initializeFirebase();

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
    recommendations.value = [];// clear previous recommendations
    for (const prompt of prompts.value){
         
            const result = await model.generateContent(prompt)
            const responseText = await result.response.text();
            recommendations.value.push(responseText);
        
    }
}

const run = async () =>{
    if (!model) {
        console.error("model is not initalized yet");
        return;
    }



const prompt = createPrompt();

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    console.log("anbefalede vitaminer og kosttilskud:",response);


};
 

</script>

<template>
    <div class="QuizBox" >
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

                <Label :for ="option.id">{{ option.text }}</Label>
            </div>
        </div>
    <div id="navigation">
    <button @click="run"> Næste </button>
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