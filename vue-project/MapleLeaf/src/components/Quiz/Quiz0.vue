<script setup>
import{ref} from "vue";
let quizQuestion =  ref([
    {text: "Rangere dit energi level",
        optionsEnergi:[
            {text:"Meget lav", prompt: "jeg har meget lav energi"},
            {text:"lav", prompt: "jeg harlav energi"},
            {text:"Moderat", prompt: "jeg har moderatenergi"},
            {text:"over gennemsnittet", prompt: "jeg har over gennemsnittet energi"},
            {text:"høj", prompt: "jeg har høj Energi"}
        ],
    }


]);
let userAnswers= [];
let answer1 = ref('');
answer1 = quizQuestion[0].optionsEnergi[0].text; 
answer2 = quizQuestion[1].optionsEnergi[1].text;
answer3 = quizQuestion[2].optionsEnergi[2].text;
answer4 = quizQuestion[3].optionsEnergi[3].text;
answer5 = quizQuestion[4].optionsEnergi[4].text;
</script>

<template>
    <div class="QuizBox" >
        <h1>Rangere dit energi
            level?</h1>
        <div id="options">
            <div class="option">
                <input type="checkbox" name="meget lav" value="meget lav" id="meget lav" checked>
                <label for="meget lav"> {{quizQuestion[0].optionsEnergi[0].text}}</label>
            </div>
            <div class="option">
                <input type="checkbox" name="lav" value="lav" id="lav">
                <label for="lav"> {{ quizQuestion[1].optionsEnergi[1].text}}</label>
            </div>
            <div class="option">
                <input type="checkbox" name="middel" value="middel" id="middel">
                <label for="middel"> {{quizQuestion[2].optionsEnergi[2].text}}</label>
            </div>
            <div class="option">
                <input type="checkbox" name="over gennemsnit" value="over gennemsnit" id="over gennemsnit">
                <label for="over gennemsnit"> {{quizQuestion[3].optionsEnergi[3].text}}</label>
            </div>
            <div class="option">
                <input type="checkbox" name="høj" value="høj" id="høj">
                <label for="høj"> {{quizQuestion[4].optionsEnergi[4].text}}</label>
            </div>
        </div>
        <div id="navigation">
            <button>Forrige</button>
            <button>Næste</button>
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