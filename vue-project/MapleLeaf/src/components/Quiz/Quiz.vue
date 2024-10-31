<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getVertexAI,getGenerativeModel} from "firebase/vertexai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//gets the firebaseconfigs
let secret;
await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/secret.json",{
    method: "GET"})
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            secret = result[Object.keys(result)];
            
        })
        .catch((error) => {
            console.error(error);
        });




// Your web app's Firebase configuration
const firebaseConfig = secret;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize the Vertex AI service
const vertexAI = getVertexAI(app);

const model = getGenerativeModel(vertexAI,{model : "gemini-1.5-flash"});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
//wrap en an async function som can use await
async function run(){ 
    //provide a prompt that contains text
    const prompt = "write a story about a magic backpack in 5 lines."
    //to generate text output, call generate content with the text input
    const result = await model.generateContent(prompt);
    const response = result.response
    const text = response.text();
    console.log(text);
    
}
run();

</script>

<template>
    <div class='QuizMoreCHoice' >
        <h1>Hvad vil du gerne have hjælp til?</h1>
            <div>
               <div><input type="checkbox" name="check-1" value="check-1" id="check-1" checked>
      <label for="check-1">Choice 1</label></div>
    <div><input type="checkbox" name="check-2" value="check-2" id="check-2">
      <label for="check-2">Choice 2</label></div>
    <div><input type="checkbox" name="check-3" value="check-3" id="check-3">
      <label for="check-3">Choice 3</label></div>
            </div>
    </div>

    <div class="QuizOneCHoice"  >
        <div><input type="radio" name="choice" value="choice-1" id="choice-1" checked>
      <label for="choice-1">Choice 1</label></div>
    <div><input type="radio" name="choice" value="choice-2" id="choice-2">
      <label for="choice-2">Choice 2</label></div>
    <div><input type="radio" name="choice" value="choice-3" id="choice-3">
      <label for="choice-3">Choice 3</label></div>
    </div>
    <div class="QuizYesNo"  >
        <div><input type="radio" name="choice" value="choice-1" id="choice-1" checked>
      <label for="choice-1">Choice 1</label></div>
    <div><input type="radio" name="choice" value="choice-2" id="choice-2">
      <label for="choice-2">Choice 2</label></div>
    </div>
    <div class="QuizString">
    <div>
        <input type=" text"/>
    </div>
    </div>
</template>

<style scoped>


</style>