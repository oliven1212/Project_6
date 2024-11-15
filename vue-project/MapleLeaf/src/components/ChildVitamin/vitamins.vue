<script setup>
import {ref} from "vue";
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



let showVitamins = ref(true);
let ChildVitamins = ref([
    {type:"D", badges:[BadgeSun,BadgeBone],img: DVit,fullName:true},
    {type:"C", badges:[BadgeShield,BadgeEnergy],img:CVit,fullName:true},
    {type:"Calcium", badges:[BadgeBone,BadgeHeart],img: CalciumVit,fullName:false},
    {type:"Magnesium", badges:[BadgeStrength,BadgeSleep],img: MagnesiumVit,fullName:false},
    {type:"Jern", badges:[BadgeBlood,BadgeEnergy],img: JernVit,fullName:false},
    {type:"Multi", badges:[BadgeHappy,BadgeMulti],img: MultiVit,fullName:true}

]);
</script>


<template>
    <button v-on:click="showVitamins = !showVitamins;">
        <p v-if="!showVitamins">Show</p>
        <p v-else>Hide</p>
    </button>
    <div class="vitamins" v-if="showVitamins">
        <div class="generalInformation">

        </div>

        <div class="vitamin" v-for="vitamin in ChildVitamins">
            <h2 v-if="vitamin.fullName">{{vitamin.type}}-Vitamin</h2>
            <h2 v-else>{{vitamin.type}}</h2>
            <img :src="vitamin.img" alt="">
            <div class="badges">
                <img :src="vitamin.badges[0]" alt="">
                <img :src="vitamin.badges[1]" alt="">
            </div>
            <a href=""><p>Læs mere</p></a>
        </div>
    </div>
    <div class="showVitamin" v-if="!showVitamins">
        <div class="information">
            <div>
                <h1>fancy text</h1>
                <p>alot of fancy textalot of fancy textalot of fancy textalot of fancy textalot of fancy text</p>
            </div>
            <img src="../../assets/MomAndChild.png" alt="">
        </div>
        <div class="infograph">

        </div>
    </div>


</template>


<style scoped>
.generalInformation{
    width: 100%;
    background-image: url("");
}
.showVitamin{

    width: 100%;
}
.information{
    width: 100%;
    background: linear-gradient(#FFF3D6 0%, #ffffff72 100%);
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
}
.information div{
    margin: 20px;
    margin-right: auto;
}
.information img{
    width: 30%;
    object-fit: contain;
    margin-top: 0;
    align-self: baseline;
    margin-left: 20px;
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
.vitamin a{
    text-decoration: none;
    background-color: #FFAC00;
    width: 50%;
    padding: 5px 0px;
    margin: 10px auto;
    text-align: center;
    border-radius: 15px;
}
.vitamin a p{
    color: white;
}
.vitamin a:hover{
    background-color: #ad7400;
}
</style>
