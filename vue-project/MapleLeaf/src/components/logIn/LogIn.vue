<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
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
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(`Welcome ${user.email}`);
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
});
}

let signIn = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`Welcome back ${user.email}`)

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
let logOut = () => {
    signOut(auth).then(() => {
    console.log(`You signed out!`)
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}
let LogInOut = ref(true);
let changeLogInOption = () => {LogInOut.value = !LogInOut.value;}
let emailInput = ref("");
let passwordInput = ref("");

function logUser(){
    console.log("____________________");
    console.log(auth);
}
</script>

<template >
    <div v-if="LogInOut" class="InfoText">
        <h1>Velkommen til MapleLeaf.com! </h1>
        <p>Log ind for at gemme dine oplysninger og sikre en personlig oplevelse. 
            Indtast din e-mail og adgangskode for at gemme dine data og komme i gang.</p>
    </div>
    <div v-else class="InfoText">
        <h1>Velkommen til MapleLeaf.com! </h1>
        <p>Opret en konto for at gemme dine oplysninger og få en personlig oplevelse. 
            Indtast din e-mail og opret en adgangskode for at komme i gang.</p>
    </div>
        <div class="inputFields">
                <label for="email">Email: </label>
                <input type="text" v-model="emailInput" placeholder="Type your Email" id="email"><br>
                <label for="password">Password:</label>
                <input type="text" v-model="passwordInput" placeholder="Type your Password" id="password">
        </div>
    <div class="buttons">
        <button v-if="LogInOut"  v-on:click="signIn(emailInput,passwordInput)">Log ind</button>
        <button v-else v-on:click="signUp(emailInput,passwordInput)">Opret dig</button>
        <button v-if="LogInOut" v-on:click="changeLogInOption()">Bliv medlem</button>
        <button v-else v-on:click="changeLogInOption()">Gå til Log ind</button>
        <button v-on:click="logOut()">Log ud</button>
        <button v-on:click="logUser()">GIVE ME INFO</button>

    </div>
</template>

<style scoped>
.InfoText{
    width: 60%;
    margin: 40px auto;
}
.InfoText p{
    margin-left: 20px;
}

.inputFields{
    display: block;
    width: 25%;
    margin: auto;
}
.inputFields label{
    display: block;
    margin-top: 20px;
}
.inputFields input{
    padding: 5px;
    margin: 5px auto;
    margin-right: 0px;
    width: 100%;
}
.buttons{
    display: flex;
    margin: auto;
    width: 200px;
    flex-direction: column;
}
.buttons button{
    width: 100%;
    margin: 10px auto;
    padding: 10px;
    background-color: #e2e2e2;
    border-style: solid;
    border-color: black;
    border-width: 1.5px;
    border-radius: 10px;
}
.buttons button:hover{
    background-color: #d0d0d0;
}
</style>