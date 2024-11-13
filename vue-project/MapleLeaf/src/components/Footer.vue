<script setup>

</script>

<template>
    <footer>
        <div>
            <h2>Kontakt</h2>
            <p>Telefon: 42 06 94 20</p>
            <p style="display: inline-block;">Email: </p><a href="./" style="margin-left: 10px;">info@mapletree.com</a>
        </div>

        <div class="line"></div>
        <div>
            <h2>Maple Tree</h2>
            <p>Læs mere om Mapletree<br> Healthcare A/S på</p>
            <p>www.Mapletree.com</p>
        </div>
        <div class="line"></div>
        <div>
            <h2>Mediebiblioteket</h2>
            <p>Som apotek, kan du her finde<br> SoMe materialer let og nemt</p>
            <a href="./">Gå til mediebibliotek</a>
        </div>
    </footer>
    <div id="controlReport">
        <a href="./"><img src="../assets/icons/KontrolRapport.png" alt="Se kontrol rapporten"></a>
    </div>
</template>

<style scoped>
    footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #FFF8EC;
        height: 220px;
        padding: 0px 5%;
    }
    .line{
        border-color: #4D4D4D;
        border-style: solid;
        border-radius: 15px;
        border-width: 1.5px;
        width: 0px;
        height: 160px;
    }
    a{
        font-size: 18px;
        color: black;
    }
    #controlReport{
        display: block;
        background-color: #FFF8EC;
        width: 100%;
    }
    #controlReport img{
        display: block;
        width: 200px;
        margin: auto;
    }
</style>