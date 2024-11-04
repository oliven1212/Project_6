<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword  } from "firebase/auth";
import { ref } from 'vue';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//gets the firebaseconfigs
// Your web app's Firebase configuration
let firebaseConfig = {};
let auth;

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
        
        console.log("Firebase initialized successfully.");
        })
        .catch((error) => {
            console.error("Error fetching Firebase config or initializing Firebase:"+error);
        });

let signUp = (email, password) => {
let user;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
    user = userCredential.user;
    console.log(`${user.uid} is made`);
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
});
}
let emailInput = ref("");
let passwordInput = ref("");


</script>

<template>
<h1>aaaaaah</h1>
<input type="text" v-model="emailInput" placeholder="type your Email">
<input type="text" v-model="passwordInput" placeholder="type your Password">
<button v-on:click="signUp(emailInput,passwordInput)">Join the cult!!!<br> we got cookies</button>
</template>

<style scoped>


</style>