<script setup>
import {ref} from "vue";

// Opsætning af data
// Først opsætter vi quizstrukturen og klargør, hvordan spørgsmål skal hentes og vises.
let currentQuestion = 0; // Holder styr på hvilket spørgsmål vi er på
let data; // henter fra Firebase
let currentData = ref(""); // Ref til at holde det nuværende spørgsmål

// Hentning af quizdata
const getData = async () => { //arrowfunction
        await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json",{
        method: "GET"}) //hvilken aktion vi ber om af data
            .then((response) => {// response = fetched data
                return response.json(); // konverter response til javascript kode
            })
            .then((result) => {
                data = ref(result); // Gemmer hentet data i en ref
                update(); //  til at vise det visuelle .
                
            })
            .catch((error) => {
                console.error(error); //Håndtere fejl
            });
        
    }
// Kør `getData` for at hente quizdata, når app'en starter
    getData();


//  Opdatering af data til databasen
// `putDatabase()` sender data til Firebase og opdaterer quizzen.
// Med `PUT`-anmodningen gemmes quizændringer, så de opdateres i databasen.
let putDatabase =()=>{
    fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json", {
        method: "PUT", // Sender en PUT-anmodning for at overskrive eksisterende data
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.value), // specificere hvad den skal sætte i databasen
    })
        .then(() => {
            update(); 
        })
        .catch((error) => {
            console.error("Fejl ved overskrivning af data:", error);
        });
}

// Denne funktion opdaterer det viste spørgsmål ved at ændre currentData baseret på det aktuelle spørgsmål.
let update = () => {
    currentData.value = {...data.value[currentQuestion].questions}; //opdatere currentData med det man har valgt
}


// `saveQuestion()` giver brugeren mulighed for at oprette og gemme nye spørgsmål i quizzen.
let saveQuestion = () => {
    let answer = []; //array for at gemme svarmuligheder

    //I tilfaldet at det er 2 vil vi ikke tilføje answer, da man ikke kan give svar mulighed til den. 
    if(parseInt(document.getElementById("listeType").value) != 2){
        //loop igennem svarmulighederne
        for(let i = 0; i < inputBoxes.value.length; i++){
            answer.push(document.getElementById("inputbox"+i).value); // for at brugeren kan vælge imellem flere inputboxe
        }
    }
    
    //tilføjer sporgsmål til data
    data.value.push({ //tilføjer til array/object
            questions: {
                question: document.getElementById("inputTitel").value, //henter spørgsmålet
                type: parseInt(document.getElementById("listeType").value), //typen
                answers: [...answer] //spreadoperator
            }
        });  
        // sætter currentquestionn til det sidste spørgsmål
        currentQuestion = data.value.length-1;

        //Dataen bliver sendt og opdateret til databasen 
        putDatabase();  
        update(); 
}

// ref til svarmulighedernes inputbokse
let inputBoxes = ref([]);
// Funktionen `addQuestion()`  giver brugeren mulighed for at tilføje et nyt spørgsmål med inputfelter.
let addQuestion = () => {
    currentData.value.type=3;
    currentData.value.question = "";
    addInputbox();
};
//tilføjer en ny inputboks til svar
let addInputbox = () => {
    inputBoxes.value.push(`inputbox${inputBoxes.value.length}`);

}
//sletter input når man trykker på krydset
let removeInput = (index) => {
    for(let i = index;i<inputBoxes.value.length-1;i++){
        document.getElementById("inputbox"+i).value = document.getElementById("inputbox"+(i+1)).value;
    }
    
    inputBoxes.value.splice(inputBoxes.value.length-1, 1); //forkorter et sepcifik elememt

    
}

//giver brugeren mulighed for at slette det aktuelle spørgsmål i quizzen.

let deleteQuestion = () => {
    if (data.value.length > 1) { // Sørger for, at der er mindst ét spørgsmål tilbage

        //Hvis der er flere end et spørgsmål
        data.value.splice(currentQuestion, 1); //fjerner spørgsmål på nuverende sted
        currentQuestion = 0; //nulstiller til første spørgsmål
        putDatabase(); //opdatere til firebase
    } else {
        alert("Der skal være mindst ét spørgsmål tilbage!");
    }
    update(); 
};

//Navigation af inputfelter
//Funktion til at navigere til forrige spørgsmål 
let previousQuestion = ()=>{
    if(currentQuestion > 0){ //Tjekker placering for at vi ikke går længere tilbage
        currentQuestion-=1; //går til forrige spørgsmål
        update(); 
    }
}
//funktionen til næste spørgsmål
let nextQuestion = ()=>{
    if(currentQuestion < data.value.length-1){ //tjekker om vi er på sidste spørgsmål
        currentQuestion+=1; //næste sprøgsmål
        update();
    }
}
// fortyd funktion
let CancelEditing = () => {
    currentQuestion = 0; //sætter os til spørgsmål 1
  
    update();
}


</script>

<template>
    <div class="QuizBox" v-if="data">
        <h1 v-if="currentData.type != 3">{{ currentData.question }}</h1>
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
                <div v-for="Opt in currentData.answers">
                    <div class="option">
                        <input type="radio" name="optionss" :value="Opt" :id="Opt">
                        <label :for="Opt"> {{ Opt }}</label>
                    </div>
                </div>
            </div>

        
            <div v-else-if="currentData.type == 2" >
                <div class="option">
                    <label for="textInput" style="width: 20%;">Svar:</label>
                    <input name="textInput" type="text" id="textType2" class="inputText"/>
                </div>  
            </div>


            <div v-else-if="currentData.type == 3" >
                <div class="option">
                    <label for="inputTitel">Spørgsmål:</label>
                    <input type="text" id="inputTitel" class="inputText" />
                </div>
                <div class="option">
                    <label for="listeType">Vælg format</label>
                <select name="" id="listeType">
                    <option value="0">Flere svarmuligheder</option>
                    <option value="1">En svarmulighed</option>
                    <option value="2">Skrevet svar</option>
                </select>

                </div>
                <div v-for="(input,index) in inputBoxes" class="option">
                    <label :for="input">Svar  {{ index+1 }}: </label>
                    <input type="text" :id="input" class="inputText"/>
                    <button class="Cross" v-on:click="(removeInput(index))" ><img src="../../assets/icons/CrossIcon.png" alt=""></button>
                    
                </div> 
            </div>
        </div>
    </div>

    <div id="navigation">
        <button v-if="currentData.type != 3" v-on:click="previousQuestion()" class="buttons">Forrige</button>
        <button v-if="currentData.type != 3" v-on:click="addQuestion()"class="buttons">Tilføj Spørgsmål</button> 
        <button v-if="currentData.type != 3" v-on:click="deleteQuestion()"class="buttons">Slet Spørgsmål</button> 
        <button v-if="currentData.type == 3" v-on:click="CancelEditing()" class="buttons">Annuler</button>
        <button v-if="currentData.type == 3" v-on:click="addInputbox()" class="buttons">Tilføj input</button>
        <button v-if="currentData.type == 3" v-on:click="saveQuestion()"class="buttons">Gem svar</button>
        <button v-if="currentData.type != 3" v-on:click="nextQuestion()"class="buttons">Næste</button>
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
    margin-left: 4px;
    background-color: rgb(255, 165, 165);
    border-width: 1px;
  } 
  .Cross img {
    width: 100%;
  }

</style>