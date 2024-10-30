<script setup>
</script>

<template>
    <div class="QuizBox" >
        <h1>Hello galaxy</h1>
        <div id="options">
            <input type=" text" class="inputText"/>
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
  .inputText{
    margin: 20px auto;
    width: 30%;
    display: block;
    border-width: 2px;
    border-style: solid;
    height: 20px;
    border-color: black;
    border-radius: 10px;
    padding: 10px;
    font-size: 20px;
    height: 50px;
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