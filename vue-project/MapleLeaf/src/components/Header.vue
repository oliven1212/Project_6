<script setup>

</script>

<template>
    <header> 
        <a href="/" id="logoA">
            <img src="../assets/Logo.png" alt="">
        </a>
        <div id="headerItems">
            <a href="./">
                <img src="../assets/icons/homeIcon.png" alt="">
                <h3>Home</h3>
            </a>
            <a href="./">
                <img src="../assets/icons/PillIcon.png" alt="">
                <h3>Vitaminer</h3>
            </a>
            <a href="./adminQuiz">
                <img src="../assets/icons/PillIcon.png" alt="">
                <h3>Rediger Guiden</h3>
            </a>
            <a href="./">
                <img src="../assets/icons/GoogleMapLogo.png" alt="">
                <h3>Find apotek</h3>
            </a>
            <a href="./">
                <img src="../assets/icons/HeadsetIcon.png" alt="">
                <h3>Kontakt os</h3>
            </a>
            <a href="./LogInd">
                <img src="../assets//icons/UserIcon.png" alt="">
                <h3>Log ind</h3>
            </a>

        </div>



    </header>
</template>

<style scoped>
    header{
        background-color: #ffffff;
        height: auto;
        overflow: hidden;
        display: flex;
        flex-direction: row;
    }
    header img{
        display: block;
        height: 100px;
        width: auto;
    }
    header #logoA{
        margin:auto 30px;
    }
    #headerItems {
        display: flex;
        flex-direction: row;
        margin: 20px 0px;
        margin-left: auto;
        width: 70%;
    }
    #headerItems a{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: auto;
        text-decoration: none;
        color: black;
    }
    #headerItems a h3{
        text-align: center;
        text-decoration: none;
    }
    #headerItems a img{
        display: block;
        height: 45px;
        width: auto;
        padding: 5px;
    }
    #headerItems a:hover img {
        background-color: rgba(170, 170, 170, 0.349);
        border-radius: 10px;
       }
    #headerItems a:hover{
        text-decoration: underline;
    }
</style>