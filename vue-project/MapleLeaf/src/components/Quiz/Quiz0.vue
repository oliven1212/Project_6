<script setup>
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getVertexAI,getGenerativeModel} from "firebase/vertexai";
import{ref} from "vue";

let firebaseConfig;
let auth;
let vertexAI;
let model;

fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/secret.json",{
    method: "GET"})
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            firebaseConfig = result[Object.keys(result)];
        
        // Initialize Firebase only after configuration is fetched
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        vertexAI = getVertexAI(app);
        model = getGenerativeModel(vertexAI,{model : "gemini-1.5-flash"});

        
        console.log("Firebase initialized successfully.");
        })
        .catch((error) => {
            console.error("Error fetching Firebase config or initializing Firebase:"+error);
        });










let quizQuestion =  ref([
    {text: "Rangere dit energi level",
        optionsEnergi:[
            {text:"Meget lav", prompt: "jeg har meget lav energi", id:"megetlav"},
            {text:"lav", prompt: "jeg harlav energi",id:"lav"},
            {text:"Moderat", prompt: "jeg har moderatenergi",id:"moderat"},
            {text:"over gennemsnittet", prompt: "jeg har over gennemsnittet energi",id:"over gennemsnittet"},
            {text:"høj", prompt: "jeg har høj Energi",id:"høj"}
        ],

    }


]);
let userAnswers=ref([]);
function toggleAnswer(id){
    const index = userAnswers.value.indexOf(id);
    if(index === -1){
        userAnswers.push.value(id)
    
    }
    else{
        userAnswers.value.splice(index,1)
    }
}
    function createPrompt(){
        const selectedOption = quizQuestion.value[0].find(option => userAnswers.value.includes(option.id)
    );
    return selectedOption
    ? `Brugeren har angivet følgende energiniveau: ${selectedOption.prompt}. Giv anbefalinger til relevante vitaminer og kosttilskud, der kan hjælpe med at optimere energiniveau og generelle sundhed.`
    : `ingen energi information er angivet`
    }



async function run()
{ 
    if(!model.value){
        console.error("Model is not inetialized yet.")
        return;
    }
const prompt = createPrompt();
try {
    const result = await model.value.generateContent(prompt);
    console.log("anbefalede vitaminer og kosttilskud:",result.response.text())
} catch (error){
    console.error("Error generating content:",error)
}
}
run();

</script>

<template>
    <div class="QuizBox" >
        <h1>Rangere dit energi
            level?</h1>
        <div id="options">
            <div 
             v-for="(options, index) in quizQuestion[0].optionsEnergi"
             :key="index"
             class="option"
            >
                <input
                type="checkbox"
                :id="option.id"
                :value="option.id"
                :checked="userAnswers.includes(option.id)"
                @change="toggleAnswer(options.id)"
                />

                <Label :for ="options.id">{{ option.text }}</Label>
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