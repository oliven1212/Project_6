<script setup>
</script>

<template>
    <div class="QuizBox" >
        <h1>Rangere dit energi
            level?</h1>
        <div id="options">
            <div class="option">
                <input type="checkbox" name="check-1" value="check-1" id="check-1" checked>
                <label for="check-1"> Lav</label>
            </div>
            <div class="option">
                <input type="checkbox" name="check-2" value="check-2" id="check-2">
                <label for="check-2"> Mellem</label>
            </div>
            <div class="option">
                <input type="checkbox" name="check-3" value="check-3" id="check-3">
                <label for="check-3"> Høj</label>
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