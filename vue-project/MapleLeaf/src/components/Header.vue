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
            <a href="./about">
                <img src="../assets/icons/PillIcon.png" alt="">
                <h3>Piller</h3>
            </a>
            <a href="./">
                <img src="../assets/icons/GoogleMapLogo.png" alt="">
                <h3>Find apotek</h3>
            </a>
            <a href="./">
                <img src="../assets/icons/HeadsetIcon.png" alt="">
                <h3>Kontakt os</h3>
            </a>
            <a href="./">
                <img src="../assets//icons/UserIcon.png" alt="">
                <h3>Log ind</h3>
            </a>
        </div>



    </header>
</template>

<style scoped>
    header{
        background-color: #EEEEEE;
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
    }
    #headerItems a{
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 200px;
        text-decoration: none;
        color: black;
    }
    #headerItems a h3{
        text-align: center;
        text-decoration: none;
    }
    #headerItems a img{
        display: block;
        height: 40px;
        width: auto;
    }
    #headerItems a:hover img{
        box-shadow: 0px 0px 20px #ffaa00c0;    
        background-color: #ffaa0073;
        }
    #headerItems a:hover{
        text-decoration: underline;
    }
</style>