<script setup>
</script>

<template>
    <div class="Items">
        <div class="Item">
            <div style="background-color: #E6FFD6;">
                <img src="../../assets/Vitamins/AVitamin.png" alt="A picture of A-Vitamins">
                <h2>A Vitamin</h2>
                <p class="text">90 tabletter</p>
                <p>A-vitamin bidrager til at vedligeholde normalt syn og normal hud</p>
            </div>
            <a href=""><p>Læs mere</p></a>
        </div>
        <div class="Item">
            <div style="background-color: #D6EEFF;">
                <img src="../../assets/Vitamins/BVitamin.png" alt="A picture of B-Vitamins">
                <h2>B-vitamin</h2>
                <p class="text">90 tabletter</p>
                <p>Med bl. a. biotin, der vedligeholder normal hud og normalt hår</p>
            </div>
            <a href=""><p>Læs mere</p></a>
        </div>
        <div class="Item">
            <div style="background-color: #FFF2D6;">
                <img src="../../assets/Vitamins/CVitamin.png" alt="A picture of C-Vitamins">
                <h2>C-vitamin</h2>
                <p class="text">90 tabletter</p>
                <p>Til dig der tænker på dit immunforsvar</p>
            </div>
            <a href=""><p>Læs mere</p></a>
        </div>
    </div>
</template>

<style scoped>
.Items{
    margin: 40px 2%;
    display: flex;
    justify-content: space-evenly;
    overflow: hidden;
    
}
.Item{
    display: flex;
    flex-direction: column;
}
.Item div{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.Item img{
width: 100%;
}
.Item p{
    margin: auto;
}

.Item h2{
    margin: auto;
}

.Item a{
    display: flex;
    margin: auto;
    margin-top: 35px;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    border-style: none;
    background-color: #FFAC00;
    text-decoration: none;
}
.Item a p{
    color: white;
    font-size: 24px;
    margin: auto;
}
.Item a:hover{
    background-color: #ad7400;
}
.text{
    color: #FF7F00;
}
</style>