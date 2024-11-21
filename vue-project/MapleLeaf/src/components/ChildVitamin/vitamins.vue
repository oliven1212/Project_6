<script setup>
import {useTemplateRef, ref} from "vue";
import DVit from "../../assets/Vitamins/ChildVitamins/DVitamin.png";
import CVit from "../../assets/Vitamins/ChildVitamins/CVitamin.png";
import CalciumVit from "../../assets/Vitamins/ChildVitamins/CalciumVitamin.png";
import MagnesiumVit from "../../assets/Vitamins/ChildVitamins/MagnesiumVitamin.png";
import JernVit from "../../assets/Vitamins/ChildVitamins/JernVitamin.png";
import MultiVit from "../../assets/Vitamins/ChildVitamins/MultiVitamin.png";

import BadgeBlood from "../../assets/icons/BadgeBlood.png";
import BadgeBone from "../../assets/icons/BadgeBone.png";
import BadgeEnergy from "../../assets/icons/BadgeEnergy.png";
import BadgeHappy from "../../assets/icons/BadgeHappy.png";
import BadgeHeart from "../../assets/icons/BadgeHeart.png";
import BadgeMulti from "../../assets/icons/BadgeMulti.png";
import BadgeShield from "../../assets/icons/BadgeShield.png";
import BadgeSleep from "../../assets/icons/BadgeSleep.png";
import BadgeStrength from "../../assets/icons/BadgeStrength.png";
import BadgeSun from "../../assets/icons/BadgeSun.png";

import HudIcon from "../../assets/icons/HudIcon.png";
import KnogleIcon from "../../assets/icons/KnogleIcon.png";
import VinterIcon from "../../assets/icons/VinterIcon.png";
import MuskelIcon from "../../assets/icons/MuskelIcon.png";


let showVitamins = ref(true);
let ChildVitamins = ref([
    {type:"D", badges:[BadgeSun,BadgeBone],img: DVit,fullName:true,effects:["skin","bones","winter","muscle"], color:"#FC9494", desc:"A-vitamin bidrager til at vedligeholde normalt syn og normal hud"},
    {type:"C", badges:[BadgeShield,BadgeEnergy],img: DVit,fullName:true,effects:["skin"], color:"#E6FFD6", desc:"A-vitamin bidrager til at vedligeholde normalt syn og normal hud"},
    {type:"Calcium", badges:[BadgeBone,BadgeHeart],img: DVit,fullName:false,effects:["winter"], color:"#E6FFD6", desc:"A-vitamin bidrager til at vedligeholde normalt syn og normal hud"},
    {type:"Magnesium", badges:[BadgeStrength,BadgeSleep],img: DVit,fullName:false,effects:["muscle"],color:"##E6FFD6", desc:"A-vitamin bidrager til at vedligeholde normalt syn og normal hud"},
    {type:"Jern", badges:[BadgeBlood,BadgeEnergy],img: DVit,fullName:false,effects:["bones"], color:"#E6FFD6", desc:"A-vitamin bidrager til at vedligeholde normalt syn og normal hud"},
    {type:"Multi", badges:[BadgeHappy,BadgeMulti],img: DVit,fullName:true,effects:[], color:"#E6FFD6", desc:"A-vitamin bidrager til at vedligeholde normalt syn og normal hud"}

]);
const effectList = {
    skin: {title:"Sund hud",text:"Bidrager til blød, stærk og modstandsdygtig hud.", img: HudIcon},
    winter: {title:"Vækst & Udvikling",text:"Ekstra vigtigt om vinteren, når der er mindre sollys, som naturligt danner D-vitamin i kroppen.", img: VinterIcon},
    muscle: {title:"Muskelfunktion",text:"Essentielt for normal vækst og udvikling af celler og væv.", img: MuskelIcon},
    bones: {title:"Knogler og tænder",text:"Hjælper kroppen med at optage kalk og opbygge sunde knogler og tænder.", img: KnogleIcon}

};
let selectedVitamin = ref(ChildVitamins.value[0]);

let updateVitamin = (index) =>{
    selectedVitamin.value = ChildVitamins.value[index];
    showVitamins.value = false;
    window.scrollTo(0,0);

}
const effect1 = useTemplateRef('first');
const effect2 = useTemplateRef('second');
const effect3 = useTemplateRef('theird');
const effect4 = useTemplateRef('fourth');


</script>


<template>
    <div class="general" v-if="showVitamins">
        <div class="generalInformation">
            <div>
                <h1>Børnevitaminer</h1>
                <p>Det kan være en udfordring for børn at få tilstrækkeligt med vitaminer og mineraler gennem deres kost.
                    <br><br>
                    Børnevitaminer kan derfor være en nyttig løsning for at sikre, at dit barn får de essentielle næringsstoffer til vækst og udvikling. 
                    <br><br>
                    Opdag vores børnevitaminer, der støtter dit barns sundhed og velvære.
                </p>
            </div>
            <img src="../../assets/RotatedPills.png" alt="">
        </div>
        <div class="vitamins">
            <div class="vitamin" v-for="(vitamin,index) in ChildVitamins">
                <h2 v-if="vitamin.fullName">{{vitamin.type}}-Vitamin</h2>
                <h2 v-else>{{vitamin.type}}</h2>
                <img :src="vitamin.img" alt="">
                <div class="badges">
                    <img :src="vitamin.badges[0]" alt="">
                    <img :src="vitamin.badges[1]" alt="">
                </div>
                <button v-on:click="updateVitamin(index)"><p>Læs mere</p></button>
            </div>
        </div>
        <img src="../../assets/ChildCornerSquares.png" alt="" style="width: 100%;">
    </div>


    <div class="showVitamin" v-if="!showVitamins" :style="{background: 'linear-gradient('+selectedVitamin.color+' -20%, #ffffff 50%, '+selectedVitamin.color+' 120%)'}">
        <div class="information">
            <div class="container">
                <button v-on:click="showVitamins = true;" class="return"><p>< Tilbage</p></button>
                <h2 v-if="selectedVitamin.fullName">{{ selectedVitamin.type }}-Vitamin</h2>
                <h2 v-else>{{ selectedVitamin.type }}</h2>
                <p>{{ selectedVitamin.desc }}</p>
                <div class="drop">
                    <div class="dropdowns">
                        <button class="dropdown"><p>Anbefales til</p><img class="arrow"src="../../assets/icons/ArrowDownIcon.png" alt=""></button><br>
                        <button class="dropdown"><p>Dosesring</p><img class="arrow"src="../../assets/icons/ArrowDownIcon.png" alt=""></button>
                    </div>
                    <img class="Nr1" src="../../assets/icons/Nr1Icon.png" alt="">
                </div>
                <div class="findAt">
                    <p>Vores produkter kan købes online hos</p>
                    <div>
                        <a href="https://apopro.dk/"><img src="../../assets/ApoProDK.png" alt="ApoPro.dk"></a>
                        <a href="https://www.webapoteket.dk/"><img src="../../assets/WebApoteketDK.png" alt=""></a>
                        <a href="https://www.dinapoteker.dk/"><img src="../../assets/dinApoteker.png" alt=""></a>
                        <a href="https://www.apotekeren.dk/"><img src="../../assets/ApotekerenDK.png" alt=""></a>
                        <a href="https://apoteket-online.dk/"><img src="../../assets/ApoteketOnlineDK.png" alt=""></a>
                    </div>
                </div>
            </div>
            <img class="informationImg" src="../../assets/MomAndChild.png" alt="">
        </div>
        <div class="infograph">
            <div class="danceFloor">
                <img :src="selectedVitamin.img" alt="">
            </div>
            <div class="buttonArea1">
                <button v-if="selectedVitamin.effects[0]" style="text-align: end"><h2>{{ effectList[selectedVitamin.effects[0]].title }}</h2></button>
                <button v-else style="text-align: end"><h2>{{ "" }}</h2></button>
                <div>
                    <svg class="buttonAreaSvg">
                        <line x1="0" y1="0" x2="70%" y2="0" />
                        <line x1="70%" y1="0" x2="130%" y2="140%" />
                    </svg>
                </div>
            </div>
            <div class="buttonArea2">
                <button v-if="selectedVitamin.effects[1]" style="margin-left: 30%; text-align: start"><h2>{{ effectList[selectedVitamin.effects[1]].title }}</h2></button>
                <button v-else style="margin-left: 30%; text-align: start"><h2>{{ "" }}</h2></button>
                <div>
                    <svg class="buttonAreaSvg">
                        <line x1="30%" y1="0" x2="100%" y2="0" />
                        <line x1="30%" y1="0" x2="-30%" y2="140%" />
                    </svg>
                </div>
            </div>
            <div class="buttonArea3">
                <button v-if="selectedVitamin.effects[2]" style="text-align: end;"><h2>{{ effectList[selectedVitamin.effects[2]].title}}</h2></button>
                <button v-else style="text-align: end;"><h2>{{ "" }}</h2></button>
                <div>
                    <svg class="buttonAreaSvg">
                        <line x1="0" y1="0" x2="70%" y2="0" />
                        <line x1="70%" y1="0" x2="130%" y2="-140%" />
                    </svg>
                </div>
            </div>
            <div class="buttonArea4">
                <button v-if="selectedVitamin.effects[3]" style="margin-left: 30%; text-align: start;"><h2>{{ effectList[selectedVitamin.effects[3]].title}}</h2></button>
                <button v-else style="margin-left: 30%; text-align: start;"><h2>{{ "" }}</h2></button>
                <div>
                    <svg class="buttonAreaSvg">
                        <line x1="30%" y1="0" x2="100%" y2="0" />
                        <line x1="30%" y1="0" x2="-30%" y2="-140%" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="effectArea">
            <div v-for="(effect,index) in selectedVitamin.effects" class="effectContainer">
                <div v-if="effect" class="effectBox">
                    <img :src=effectList[effect].img alt="">
                    <div class="effectDesc">
                        <h3>{{ effectList[effect].title }}</h3>
                        <p>{{ effectList[effect].text }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>
button:hover{
    cursor:pointer;
}
.general{
    overflow: hidden;
}
.generalInformation{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-image: url("../../assets/BackgroundForest.png");
}
.generalInformation div{
    display: block;
    background-color: #fef1d5bf;
    width: 55%;
    margin-right: 5%;
    padding: 30px;
}
.generalInformation img{
    width: 40%
}
.generalInformation div p{
    margin-left: 10px;
}
.showVitamin{
    width: 100%;
}
.information{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 50px;
}
.findAt p{
    margin-left: 10px;
}
.findAt div{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 50%;
    justify-content: center;
}
.findAt div a{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    height: 30px;
}
.findAt div a img{
    display: block;
    height: 100%;
    background-color: #f4f4f4;
    padding: 3px;
    border-radius: 20px;

}
.informationImg{
    width: 30%;
    object-fit: contain;
    margin-top: 0;
    align-self: baseline;
    margin-left: 20px;
}
.arrow{
    width: 30px;
}
.container{
    width: 60%;
    margin: 20px;
    margin-right: auto;
}
.drop{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.Nr1{
    width: 15%;
    margin: auto;
    margin-top: 30px;
    margin-left: 100px;
}
.dropdown{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #FFAC00;
    border: none;
    padding: 5px 15px;
    color: white;
}
.dropdowns{
    width: 40%;
    margin-top: 30px;
}
.dropdown:hover,.return{
    background-color: #ad7400;
}
.return{
    display: block;
    background-color: #FFAC00;
    border: none;
    border-radius: 5px;   
    padding: 5px 10px;
    text-align: center;
    margin-bottom: 20px;
    color: white;
}
.vitamins{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 90%;
    margin: auto;
}
.vitamin{
    flex: 1 1 calc(100%/3);
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 50px auto;
}
.vitamin h2{
    text-align: center;
    margin: 10px auto
}
.vitamin img{
    width: 50%;
    margin: auto
}
.badges{
display: flex;
width: 100%;
flex-direction: row;
justify-content:center;
}
.badges img{
    display: block;
    width: 15%;
    margin: auto 10px;
}
.vitamin button{
    background-color: #FFAC00;
    width: 40%;
    padding: 5px 0px;
    margin: 10px auto;
    text-align: center;
    border-radius: 15px;
    border: none;
}
.vitamin button p{
    color: white;
}
.vitamin button:hover{
    background-color: #ad7400;
}
.infograph{
    display: grid;
    grid-template-columns: auto 300px auto;
    grid-template-rows: auto auto 300px auto auto;
    margin: auto 5%;
    position: relative;
    grid-template-areas: 
    ". . ."
    "first . second"
    ". mainImg ."
    "third . fourth"
    ". . .";
    height: 700px
}
.infograph button{
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: transparent;
    height: 80px;
    width: 70%;
    border: none;
    transition: 1s;
}
.infograph button:hover{
    text-shadow: 0px 0px 8px #ff981a;
}
.buttonArea1,.buttonArea2,.buttonArea3,.buttonArea4{
    position: relative;
}
.buttonArea1{
    grid-area: first;
}
.buttonArea2{
    grid-area: second;

}
.buttonArea3{
    grid-area: third;
}
.buttonArea4{
    grid-area: fourth;

}
.buttonAreaSvg{
    overflow: visible;
    position: absolute;
    width: 100%;
}
.buttonAreaSvg line{
    stroke-width: 3px;
    stroke: black;
}

.danceFloor{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    grid-area: mainImg;
    width: 100%;
    height: 100%;
    z-index: 2;
}
.danceFloor img{
    width: 100%;
    display: block;
    animation: imgMovement;
    animation-duration: 4.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}

@keyframes imgMovement{
    0% {width: 100%;}
    50%{width: 95%;}
    100%{width: 100%;}
}
.effectArea{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 10%;
}
.effectContainer{
    width: 50%;

}
.effectBox{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.effectDesc{
    
    display: flex;
    flex-direction: column;
    width: 70%;
    padding: 10px;
}
.effectContainer div img{
    width: 20%;
    margin: 50px 5%;
}
</style>
