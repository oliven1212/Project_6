<script setup>
</script>
<template>
    <div>
        <img src="../assets/FacebokOpslagsBab.png" alt="">
        <hr>
        <img src="../assets/MapleleafInstagram.png" alt="">
    </div>
    <video src="../assets/ReklameKvindeStemme.mp4" type="video/mp4" controls></video>
    <hr>
    <video src="../assets/Reklame.mp4" type="video/mp4" controls></video>
    <hr>
    <video src="../assets/AmeliaTiktok.mp4" type="video/mp4" controls></video>
    <hr>
    <video src="../assets/KarolineTiktok.mp4" type="video/mp4" controls></video>
    <h2>Scroll ned for<br>resten af content<br>produktionerne</h2>
</template>

<style scoped>
    div{
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
    }
    video{
        display: block;
        width: 100%;
        height: 100vh;
    }
    img{
        display: block;
        margin: 20px auto;
        width: 50%;
        object-fit: contain;
    }
    h2{
        display: block;
        position: fixed;
        right: 10px;
        bottom: 10px;
    }
</style>