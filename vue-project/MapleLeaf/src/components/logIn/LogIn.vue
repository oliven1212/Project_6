<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged,updateProfile  } from "firebase/auth";
import { ref,onMounted } from 'vue';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//gets the firebaseconfigs
// Your web app's Firebase configuration
let firebaseConfig = ref(null);
let auth = ref(null);
let isFirebaseInitialized = ref(false);
let LogInOut = ref(true); // login/signup toggle
let emailInput = ref("");
let passwordInput = ref("");
let userName = ref("");

onMounted(async ()=>{
    try {
        const response = await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/secret.json");
        const result = await response.json();
        firebaseConfig.value = result[Object.keys(result)];
        
        const app = initializeApp(firebaseConfig.value);
        auth.value = getAuth(app);
        isFirebaseInitialized.value = true;
        console.log("Firebase initialized.");
    }catch (error) {
        console.log("Error initializing Firebase: " + error.message);
    }

    onAuthStateChanged(auth.value, (user) => {
            if (user) {
                console.log(`User logged in: ${user.email}`);
            } else {
                console.log("User logged out");
            }
        });
    });
let signUp = async () => {
    if (!isFirebaseInitialized.value) return;
    try {
        await createUserWithEmailAndPassword(auth.value, emailInput.value, passwordInput.value);
    } catch (error) {
        console.log(error.message);
    }
};


let signIn = async () => {
    if (!isFirebaseInitialized.value) return;
    try {
        await signInWithEmailAndPassword(auth.value, emailInput.value, passwordInput.value);
    } catch (error) {
        console.log(error.message);
    }
};


let logOut = async () => {
    if (!isFirebaseInitialized.value) return;
    try {
        await signOut(auth.value);
    } catch (error) {
        console.log(error.message);
    }
};


let changeLogInOption = () => {LogInOut.value = !LogInOut.value;}


let logUser = () => {
    if(auth.value.currentUser.displayName != null){
        alert(`Dit navn er ${auth.value.currentUser.displayName}\nEmailen du er logget ind med er ${auth.value.currentUser.email}\nDit password er ...`);
    }else{
        alert(`Dit navn er ikke tilføjet endnu\nEmailen du er logget ind med er ${auth.value.currentUser.email}\nDit password er ...`);

    }
}


let updateUsername = () =>{
    const newName = prompt("Skriv dit navn ",auth.value.currentUser.email);
    if(newName != null){
        updateProfile(auth.value.currentUser, {
            displayName: newName , photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
            // Profile updated!
                console.log(`Name update successful. \n Hello ${auth.value.currentUser.displayName}`)
            }).catch((error) => {
                console.error(error);
            });
    }
}
</script>

<template >

    <div v-if="LogInOut" class="InfoText">
        <h1>Velkommen {{  }} til MapleLeaf.com! </h1>
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
        <button v-on:click="updateUsername()">Tilføj brugernavn</button>
        <button v-on:click="logUser()">Hvem er jeg?</button>
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