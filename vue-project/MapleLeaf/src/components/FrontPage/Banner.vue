<script setup>

</script>

<template>
    <div id="banner">
        <img src="../../assets/circleLogo.png" alt="">
        <h3>Maple Leaf produkter <br>kan også købes online på:</h3>
        <div class="linkList">
            <a href="https://apopro.dk/"><img src="../../assets/ApoProDK.png" alt="ApoPro.dk"></a>
            <a href="https://www.webapoteket.dk/"><img src="../../assets/WebApoteketDK.png" alt=""></a>
            <a href="https://www.dinapoteker.dk/"><img src="../../assets/dinApoteker.png" alt=""></a>
            <a href="https://www.apotekeren.dk/"><img src="../../assets/ApotekerenDK.png" alt=""></a>
            <a href="https://apoteket-online.dk/"><img src="../../assets/ApoteketOnlineDK.png" alt=""></a>
        </div>
    </div>
</template>

<style scoped>
.linkList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
#banner{
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url('../../assets/Banner.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 256px;
    background-size: cover;
    padding: 0% 1%;
}
#banner img{
    height: 70%;
}
#banner h3{
    color: white;
    margin: auto 2%;
}
#banner a img{
    height: 25px;
}
#banner .linkList a{
    background-color: #ffffff;
    padding: 0px 12px;
    border-radius: 30px;
    margin: 10px;
}
</style>