<script setup>
</script>

<template>
    <header> 
        <img src="" alt="">
        <div id="headerItems">
            <div>
                <img src="./icons/homeIcon.png" alt="">
                <a href="./"><h3>Home</h3></a>
            </div>
            <div>
                <img src="./icons/homeIcon.png" alt="">
                <a href="./about"><h3>Find apotek</h3></a>
            </div>
            <div>
                <img src="./icons/homeIcon.png" alt="">
                <a href="./"><h3>Kontakt os</h3></a>
            </div>            <div>
                <img src="./icons/homeIcon.png" alt="">
                <a href="./"><h3>Log ind</h3></a>
            </div>
        </div>



    </header>
</template>

<style scoped>
@import '../assets/main.css';

header{
    background-color: #EEEEEE;
    height: 100px;
}
#headerItems {
    display: flex;
    flex-direction: row;
}
#headerItems div{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100px;
}
#headerItems div a{
    text-align: center
}
#headerItems div img{
    display: block;
    width: 50px;
}
</style>