<script setup>
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getVertexAI,getGenerativeModel} from "firebase/vertexai";
import{ref} from "vue";

let firebaseConfig;
let auth;
let vertexAI;
let model;
let currentQuestion = 0;
let data = ref([]);
let currentData = ref("");


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

                <label :for ="option.id">{{ option.text }}</label>
            </div>
        </div>
    </div>
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
        </div>
    </div>
    <div id="navigation">
    <button @click="saveprompt"> Næste </button>
    <button @click="generateRecommendations">hvis Anbefalinger</button>
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