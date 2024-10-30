<script setup>
</script>

<template>
  <div class="QuizBox" >
    <h1>Hello World</h1>
    <div id="options">
      <div class="option">
        <input type="radio" name="choice" value="choice-1" id="choice-1" checked>
        <label for="choice-1">Choice 1</label>
      </div>
      <div class="option">
        <input type="radio" name="choice" value="choice-2" id="choice-2">
        <label for="choice-2">Choice 2</label>
      </div>
      <div class="option">
        <input type="radio" name="choice" value="choice-3" id="choice-3">
        <label for="choice-3">Choice 3</label>
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
      height: 100%;
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