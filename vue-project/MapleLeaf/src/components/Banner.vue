<script setup>

</script>

<template>
      <div id="banner">
    <video src="../assets/FAFAFAFAFA_1.mp4" autoplay muted loop></video>
    <img src="../assets/bannerOverlay.png" alt="">
    <div>
      <h1>Maple Leaf</h1>
      <p>Din vej til et sundere liv med naturlige vitaminer og kosttilskud, skræddersyet til dine behov.</p>
    </div>
  </div>
</template>

<style scoped>
    #banner{
    width: 100%;
    position: relative;
    overflow: hidden;
    display: block;
    }

    #banner video {
    display: block;
    width: 68%;
    position: relative;
    z-index: 1;
    top: 0px;
    left: 35%;
    margin-top: 10%;
    margin-bottom: 8%;
    }
    #banner img{
    display: block;
    width: 100%;
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    }
    #banner div{
      display: block;
      position: absolute;
      top: 0px;
      left: 3%;
      z-index: 3;
      margin-right: 63%;
      margin-top: 10%;
    }
</style>