<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMG5HfHDiIvuBMfnAROkBP1WBMpyzNr28",
  authDomain: "projekt6-ebfa8.firebaseapp.com",
  databaseURL: "https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projekt6-ebfa8",
  storageBucket: "projekt6-ebfa8.appspot.com",
  messagingSenderId: "411594793378",
  appId: "1:411594793378:web:b8b4609d3fb963134192fb"
};

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