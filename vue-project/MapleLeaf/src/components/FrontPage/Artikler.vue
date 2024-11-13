<script setup>

</script>

<template>
    <div id="artikler">
        <div class="artikel">
            <img src="../../assets/Artikel0.png" alt="">
            <h2>
                VIDEN OM VITAMINER
            </h2>
            <p class="desc">
                Har børn brug for vitaminer, hvis de kun spiser det, de kan lide?
            </p>
            <p class="time">
                5 min læsetid
            </p>
        </div>
        <div class="artikel">
            <img src="../../assets/Artikel1.png" alt="">
            <h2>
                VIDEN OM VITAMINER
            </h2>
            <p class="desc">
                Har børn brug for vitaminer, hvis de kun spiser det, de kan lide?
            </p>
            <p class="time">
                5 min læsetid
            </p>
        </div>
    </div>
    <a href="/about">
        <h3>
            Læs flere artikler
        </h3>
    </a>
</template>

<style scoped>
#artikler{
    display: flex;
    flex-direction: row;
    width: 94%;
    margin: 50px 3%;

}
.artikel{
    width: 44%;
    margin: 0px 3%;
    display: grid;
    grid-template-columns: auto 200px;
    grid-template-rows: repeat(3,auto);

    grid-template-areas: 
    "pic pic"
    "title time"
    "desc desc";
}
.artikel img{
    width: 100%;
    grid-area: pic;
}
.artikel h2{
    grid-area: title;
    margin-right: auto;
}
.artikel .time{
    grid-area: time;
    border-radius: 15px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    margin: auto;
    margin-top: 10px;
    margin-right: 0px;
    padding: 3px 5px;

}
.artikel .desc{
    grid-area: desc;
    margin-left: 8px 0px;
}
a{
    display: table;
    margin: 50px auto;
    background-color: #FFAC00;
    text-decoration: none;
    color: white;
    padding: 10px 20px;
    border-radius: 15px;
}
a h3{
    display: block;
    text-align: center;
    width: 100%;
}


</style>