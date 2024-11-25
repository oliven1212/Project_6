<script setup>

</script>

<template>
  <div id="front">
    <video src="../../assets/Reklame.mp4" autoplay muted loop></video>
    <img src="../../assets/bannerOverlay.png" alt="">
    <div>
      <h1>Maple Leaf</h1>
      <p>Prøv vores Vitamin guide. Din vej til et sundere liv med naturlige vitaminer og kosttilskud, 
        skræddersyet til dine behov.</p>
      <a href="/quiz">Prøv vitamin guiden</a>
    </div>
  </div>
</template>

<style scoped>
  #front{
  width: 100%;
  position: relative;
  overflow: hidden;
  display: block;
  }
  #front video {
  display: block;
  width: 56.5%;
  position: absolute;
  z-index: 1;
  top: 4.3%;
  left: 41%;
  margin-top: 6%;
  margin-bottom: 8%;
  }
  #front img{
  display: block;
  width: 100%;
  position: relative;
  z-index: 2;
  top: 0px;
  left: 0px;
  
  }
  #front div{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left: 4%;
    z-index: 3;
    margin-right: 63%;
    margin-top: 10%;
  }
  #front div h1,p{
    color: white;
  }
  #front div a{
    display: block;
    padding: 10px;
    margin: auto;
    margin-top: 30px;
    margin-left: 0px;
    border-radius: 20px;
    background-color: #FFAC00;
    text-decoration: none;
    color: white;
    width: 80%;
    text-align: center;
  }
</style>