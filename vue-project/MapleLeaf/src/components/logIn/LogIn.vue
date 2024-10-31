<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

</script>

<template>
<h1>aaaaaah</h1>
</template>

<style scoped>


</style>