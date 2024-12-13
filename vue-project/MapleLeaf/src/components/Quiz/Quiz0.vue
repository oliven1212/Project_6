<script setup>
// onMounted gør så alt hvad der er mounted før bliver loaded og laver en DOM ud fra dens child componenter og når den har gjort det putter den inholdet i Parent DOM
import { onMounted, ref } from "vue";
//importere data fra firebase/app for initatlizere for at give adgang til f.eks. at bruge firebase database.
import { initializeApp } from "firebase/app";
//giver adgang til bruger data i form af hvem der er der er logged ind og man tilgå bruger 
import { getAuth } from "firebase/auth";
//initalizere firebase API AI så vi har adgang til vertex AI
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
//initalisere variabler
let firebaseConfig;
let auth;
let vertexAI;
let model;
let currentQuestion = ref(0);
// ref er for at tilgå HTML elementer i stedet for at bruge getElementbyId så variablen currentData ref til et object der indeholde type null og et array
let currentData = ref({ type: null, answers: [] });
//prompt text baseret hardcoded til at prompte AI'en initializere variable
let prompt = `"Analyser og udskriv en liste over vitaminer og kosttilskud,
 der er anerkendt for deres sundhedsmæssige fordele ifølge den nyeste forskning.
  Inkluder kun information, der stammer fra data indsamlet efter [sæt en ønsket dato, f.eks. 2022].
   Sørg for, at alle anbefalinger og beskrivelser er baseret på opdaterede videnskabelige studier og retningslinjer.
    Liste informationen pr. supplement og dæk følgende punkter: 1) Beskrivelse og primære fordele, 2) Anbefalet daglig dosis, 3)
     Eventuelle bivirkninger, og 4) Kilder i naturen (hvis relevant). Sørg for, at data og anbefalinger stemmer overens med moderne, evidensbaserede standarder.
      der kommer en masse spørgsmål og svar du skal forholde dig til. det er dummy data for at vise et eksemple og kan du skrive det"`;
//function = asyncron arrow function async gør det muligt at bruge Await i parenteserne kan man sætte attributter
const initializeFirebase = async () => {
  //try global function prøver at kører koden hvis der sker en error kører koden i cache
  // i stedet i det her tilfælde er det en error besked i consolen 
  try {
    // Await gør at koden skal være færdig før den begynder at læse den næste linje kode
    // fetch er en javascript indbygget kode der bruges til at lave en HTTP request her bruges den til at lave en GET på vores firebase database
    //response gemmer det svar der kommer databasen
    const response = await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/secret.json", { method: "GET" });
    // laver en konstant variable der tager response objektet og konventerer det fra JSON format til javascript object
    const result = await response.json();
    //firebase config tager det object result der indholder konventering og henter alle nøglerne fra realtime database 
    //nøglerne så login informaitonerne ikke ligger i koden og alle kan tilgå AI'en fra github så de ikke bliver leaked
    firebaseConfig = result[Object.keys(result)];
    //opretter en konstant variable der indeholder en funktion fra firebase SDK og tager firebaseconfig så nøglerne er argumenter og parameter er firebaseconfig
    const app = initializeApp(firebaseConfig);
    // tager SDK function fra firebase der bruger app parameter
    auth = getAuth(app);
    //tager getvertexAI og knytter den til vores app
    vertexAI = getVertexAI(app);
    //sætter functionen hvilken model af vertexAI med parameter Ai og hvilken udgaver den tager ind som parameter.
    //systeminstruktioner er indbygget funktion til at prombt hvilken character den skal spille.
    model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash", systemInstruction: `Du er en specialiseret sundhedsassistent, der fokuserer på opdateret og evidensbaseret information om vitaminer og kosttilskud.
Dit mål er at levere en liste med maksimalt tre vitaminer, udvalgt på baggrund af deres relevans og dokumenterede sundhedsmæssige fordele.
Brug kun data fra pålidelige og opdaterede kilder, såsom sundhedsmyndigheder, forskningsstudier eller kliniske retningslinjer, især fra europæiske og amerikanske sundhedsorganisationer.

For hver anbefaling skal du inkludere:

    Beskrivelse og primære sundhedsmæssige fordele - En kort forklaring af, hvad tilskuddet gør, og dets mest væsentlige fordele.
    Skriv ikke kilden til vitaminen og bivirkninger, derudover skriv ikke nogle segmenter om at det er en god ide at snakke med sin læge om det` });
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Error fetching Firebase config or initializing Firebase:", error);
  }
};
//henter dataen fra databasen og putter dem i quizQuestion.value value er et object der referer til værdien af det object 
const getData = async () => {
  try {
    const response = await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/QuizLayout.json", { method: "GET" });
    quizQuestion.value = await response.json();
    update();
  } catch (error) {
    console.error(error);
  }
};
//update variable function der indeholder en if statement hvis quizQuestion har en værdi og
// hvis quiz questions værdi indeholder attribute eller index der er tilsvarende til hvad variablen currentquestion indeholder
//så hvis quizQuestion indeholder en værdi og der findes en værdi for hvilket spørgsmål vi er på kører koden
//variablen currentdata laver en spread syntax der tager en kopi af attributterne og ligger dem i et nyt object
//og ligger dem i et nyt objekt og opretter en kopi af question objektet
const update = () => {
  if (quizQuestion.value && quizQuestion.value[currentQuestion.value]) {
    currentData.value = { ...quizQuestion.value[currentQuestion.value].questions };
  } else {
    console.warn("Ingen spørgsmål fundet for currentQuestion:", currentQuestion.value);
    currentData.value = { type: null, answers: [] }; // fallback hvis spørgsmål ikke findes
  }
};
// Call async functions after mounting to avoid returning promises in `setup`
onMounted(() => {
  initializeFirebase();
  getData();
});

let quizQuestion = ref([]);
let userAnswers=ref([]);
// let prompts = ref([]); // store prompts for hver spørgsmål
// let recommendations = ref([]); // udskriver alle anbefalingerne
// functionen SaveUserAnswer med parameteren værdi if statement hvis currentdata værdi og type er = 0 og er af sammedatatype
function saveUserAnswer(value) {
  if (currentData.value.type === 0) {
    // Checkbox svar - tillader flere valg
    //den type knap har flere svar muligheder variablen index har værdien med javascript metoden til indexof med parameteren værdi
    //så den finder den index af værdi
    //hvis index er number data og har værdien -1 
    //skubbe en værdi ind i brugersvaret
    // hvis den ikke har den værdi sletter den hvad der er på pladsen
    const index = userAnswers.value.indexOf(value);
    if (index === -1) {
      userAnswers.value.push(value);
    } else {
      userAnswers.value.splice(index, 1);
    }
    //hvis den har værdien 1 gemmer den brugerens data der er value ind i en array
    console.log("Checkbox svar opdateret:", userAnswers.value);
  } else if (currentData.value.type === 1) {
    // Radio svar - kun ét valg muligt
    userAnswers.value = [value];
    console.log("Radio svar valgt:", userAnswers.value);
    //den sidste er med 2 textype i stedet men gør det samme som 1
  } else if (currentData.value.type === 2) {
    // Tekstinput svar - lagrer som en enkelt tekststreng
    userAnswers.value = [value];
    console.log("Tekstinput svar:", userAnswers.value[0]);
  }
}
console.log(saveUserAnswer);
    

function createPrompt() {
    let promptText = ` For question ${currentData.value.question}, user selected: `;
    
    // Add answer based on the question type
    if (currentData.value.type === 0) {
        // Checkbox: list all selected answers
        //currentdata er en liste answer en function som tjekker om værdien bruger data findes i useranswer hvis der er answer i useranswer
        const selectedOptions = currentData.value.answers.filter(answer => userAnswers.value.includes(answer));
        //adder svar til prompttext .join metode bruges til at adskille de svar med komma der bliver lagt ind i prompttext
        promptText += selectedOptions.join(", ");

    } else if (currentData.value.type === 1) {
        // Radio: single selection
        promptText += userAnswers.value[0];
    } else if (currentData.value.type === 2) {
        // Text input: free-text answer
        promptText += userAnswers.value[0];
    }
    // console.log(promptText);
    return promptText;
}
function savePrompt() {
    prompt += createPrompt();
    //prompts.value.push(prompt);  // Store each prompt for later use
    // console.log("Prompt saved:", prompt);
}

let responseText;
const generateRecommendations = async () => {
    if (!model) {
        console.error("Model is not initialized yet.");
        return;
    }
    
    // Clear previous recommendations to avoid duplicates
    // recommendations.value = [];
    {
        try {
          setTimeout(()=> { alert('Dine resultater er igang med at blive genereret'); }, 1);
          //variabel som indeholder AI i model med metoden og og indeholder værdierne string prompt
          const result = await model.generateContent(prompt);
          console.log(prompt);
          const response = result.response;
//bruges til at oprett en reaktiv reference response indeholder en text metode som retunerer texten fra svaret
          responseText = ref(response.text());  
          responseText.value = responseText.value.replaceAll('*','');
          console.log(responseText.value);
          update();
            // recommendations.value.push(responseText);
        } catch (error) {
            console.error("Error generating content:", error);
        }
    }

    // console.log("Recommendations generated:", recommendations.value);
    
};
let previousQuestion = ()=>{
    if(currentQuestion.value > 0){
        currentQuestion.value-=1;
        update(); 
    }
}
let nextQuestion = () => {
    savePrompt();  // Save current prompt before moving to the next question
    if (currentQuestion.value < quizQuestion.value.length - 1) {
        currentQuestion.value += 1;
        update();
    }
    progressRate(currentQuestion.value-1);
};

//Fremvisning af forbedring Jeppe
//location = prikkens tal værdi
//currentQuestion.value = nuværende spørgsmål
let navigationTo = (location) => {
  currentQuestion.value = location;
  update();

}
let feedbackComment = () =>{
  if(document.getElementById("commentBox").value.length == 0){
    alert("Udfyld tekst feltet for at sende din feedback, tak");
    return;
  }
    fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/reviews.json", {
        method: "Post", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"suggestion":document.getElementById("commentBox").value}),
    })
        .catch((error) => {
            console.error("Fejl ved uploading af feedback", error);
    });
}

const progressRate = async (question) =>{
  await fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/progressRate.json", {
          method: "GET"})
          .then((response)=>{
            return response.json();
          })
          .then((result)=>{
            if(isNaN(result[`Question${question}Answers`])){
              result[`Question${question}Answers`] = 1;
            }else{
              result[`Question${question}Answers`]++;
            }
            fetch("https://projekt6-ebfa8-default-rtdb.europe-west1.firebasedatabase.app/progressRate.json", {
              method: "PUT", 
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(result),
              })
              .catch((error) => {
                  console.error("Fejl ved uploading af data", error);
              });
          })
          .catch((error) => {
            console.error("Fejl ved modtagelse af data", error);
          });
}

</script>

<template>
  <!--v-if er conditonal rendering er hvor et HTML element bliver lavet men kun din kondition er true-->
  <div v-if="!responseText">
    <div class="QuizBox" v-if="quizQuestion">
      <h1>{{ currentData.question }}</h1>
      <div id="options">
        <!-- Checkbox-options -->
        <div v-if="currentData.type === 0">
          <!-- v-for gør det muligt at opdatere og vise de HTML elementer med det samme når nye elementer bliver tilføjet til Arrayet-->
          <div v-for="(Opt, index) in currentData.answers" :key="index" class="option">
            <input 
              type="checkbox" 
              name="optionss"
              :id="Opt" 
              :value="Opt"
              :checked="userAnswers.includes(Opt)"
              @change="saveUserAnswer(Opt)">
            <label :for="Opt">{{ Opt }}</label>
          </div>
        </div>

        <!-- Radio-options -->
        <div v-if="currentData.type === 1">
          <div v-for="(Opt, index) in currentData.answers" :key="index" class="option">
            <input 
              type="radio" 
              name="Optionss" 
              :value="Opt" 
              :id="Opt"
              :checked="userAnswers.includes(Opt)" 
              @change="saveUserAnswer(Opt)">
            <label :for="Opt">{{ Opt }}</label>
          </div>
        </div>

        <!-- Text-input -->
        <div v-if="currentData.type == 2">
          <div class="option">
            <label for="options" style="width: 100px;">Skriv svar:</label>
            <input 
              type="text" 
              name="optionss"
              class="inputText" 
              @input="saveUserAnswer($event.target.value)">
          </div>  
        </div>
      </div>   
      <div id="navigation">
        <button v-if="currentQuestion > 0" v-on:click="previousQuestion()" class="buttons"><img src="../../assets/icons/ArrowIcon.png" alt="" style="transform: scaleX(-1); margin-left: 0px;"><p>Forrige</p></button>
        <button v-if="currentQuestion >= quizQuestion.length-1" v-on:click="generateRecommendations()" class="buttons"><p>Vis Anbefalinger</p></button>
        <button v-if="currentQuestion > 0" v-on:click="nextQuestion()"class="buttons"><p>Næste</p> <img src="../../assets/icons/ArrowIcon.png" alt="" style="margin-right: 0px;"></button>
        <button v-else  v-on:click="nextQuestion()" class="buttons" style="margin-left: auto"><p>Næste</p><img src="../../assets/icons/ArrowIcon.png" alt="" style="margin-right: 0px;"></button>
      </div>
      
      <div class="progressBar">
        <!-- index = location i javascript functionen -->
        <!-- komma før index er nødvendig for at det bliver sat til indexet vi er på -->
        <!-- v-for = loop -->
        <div  v-for="(,index) in quizQuestion"> 
          <button v-on:click="navigationTo(index)" class="dot" v-if="currentQuestion<index"></button>
          <button v-on:click="navigationTo(index)" class="dotFill" v-else ></button>
        </div>
      </div>
    </div>
    
  </div> 
  <div v-if="responseText" class="responseBox">
    <h2>Dette svar er generet med AI og skal ikke følges uden konsulation med en ekspert</h2>
    <pre>{{ responseText }}</pre>
    <div>
      <label for="commentBox">Hvad kunne forbedres?</label>
      <textarea id="commentBox" type="text"></textarea>
      <button v-on:click="feedbackComment()"><p>Send</p></button>
    </div>
    <a href="./vitamins"><p>Læs mere her</p></a>
  </div>
           
</template>

<style scoped>
#navigation button{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
#navigation button img,#navigation button p{
  display: inline-block;
}
#navigation button img{
  height: 30px;
  margin: 5px;
  
}

.progressBar{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content:center;
  margin: 0px auto;
}
.dot,.dotFill{
  display: block;
  width: 30px;
  height: 30px;
  background-color: white;
  border-style: solid;
  border-color: gray;
  border-width: 2px;
  border-radius: 50%;
  margin: 3px;
}
.dotFill{
  background-color: #FFAC00;
}
.dot:hover {
background-color: lightgrey;
}
.dotFill:hover {
  background-color: #bc7f06;
}

.QuizBox{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  height: 80vh;
  }
.QuizBox h1{
  margin: 0 auto;
  margin-top: 50px;
  width: 50%;
}
#options{
  margin: auto 0px;
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
  margin-top: auto;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 50px 10%;
}
.buttons{
  width: auto;
  padding: 0px 10px;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  background-color: rgb(244, 244, 244);    
}
.buttons:hover{
  background-color: #bebebe;
}
.inputText{
  width: 70%;
  border-width: 2px;
  border-color: #9f9f9f;
  border-style:groove;
  margin: auto;
}


select{
  width: 70%;
}
.Cross {
  width: 30px;
  margin-left: 10px;
  background-color: rgb(255, 165, 165);
  border-width: 1px;
} 
.Cross img {
  width: 100%;
}
.responseBox{
  display: block;
}
.responseBox h2{
  background-color: #ff00005b;
  text-align: center;
}
.responseBox a{
  display: block;
  background-color: #FFAC00;
  padding: 10px;
  border-radius: 20px;
  margin: 20px auto;
  width: 250px;
  text-align: center;
  color: white;
  text-decoration: none;
}
.responseBox pre{
  white-space: pre-wrap;
  margin: 20px 80px;
}
.responseBox div{
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
.responseBox div button{
  display: block;
  width: 250px;
  margin: 10px auto;
  background-color: #FFAC00;
  padding: 10px;
  border-style: none;
  border-radius: 20px;
}
.responseBox div button p{
  color: white;
}
.responseBox div label{
  display: block;
  margin: 10px auto;
  width: auto;
  }
.responseBox div textarea{
  display: block;
  min-height: 200px;
  
}
.responseBox div button:hover, .responseBox a:hover{
  background-color: #ac7300;
  cursor: pointer ;
}
</style>