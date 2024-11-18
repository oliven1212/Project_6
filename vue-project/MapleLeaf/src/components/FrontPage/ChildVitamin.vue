<script setup>

</script>

<template>
    <div class="background">
        <div class="top">
            <img src="../../assets/WomanKissingFeet.png" alt="">
            <div>
                <h2>Har mit barn brug for vitaminer?</h2>
                <p>Hvis dit barn spiser som anbefalet, dækkes behovet for vitaminer og mineraler. Børn mellem 4 og 10 år bør spise 300-500 gram frugt og grønt dagligt. Opfyldes dette ikke, kan en multivitamin til børn være en god idé.
                    <br><br>
                    Skal mit barn have D-vitamin?
                    <br><br>
                    Sundhedsstyrelsen anbefaler 10 µg D-vitamin dagligt fra barnet er 2 uger til 4 år. Børn med mørk hud eller som går tildækket bør også tage 10 µg dagligt.
                    <br><br>
                    Har mit barn brug for kalk?
                    <br><br>
                    Hvis dit barn er mælkeallergisk, anbefales et kalktilskud: 500 mg dagligt op til 9 år, og 750 mg fra 10 år.
                </p>
            </div>
        </div>
        <div class="callToAction">
            <img src="../../assets/ChildCallToAction.png" alt="" class="callPic">
            <a href="/ChildVitamins"><h2>se vores udvalg af børnevitaminer</h2></a>
        </div>
    </div>
</template>

<style scoped>
.background{
    background-image: linear-gradient(#ffffff 0%, #FFF2D6 50%);
}
.top{
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
}
.top img{
width: 30%;
margin-left: 5%;
}
.top div{
    width: 60%;
    padding: 0px 40px;
}
.callToAction{
    display: block;
    position: relative;
    width: 100%;
}
.callToAction .callPic{
    width: 100%;
    position: relative;
    top: 0;
    left: 0;

}
.callToAction a{
    display: block;
    background-color: #FFAC00;
    text-decoration: none;
    position: absolute;
    padding: 15px;
    border-radius: 20px;
    left: 50%;
    top: 55%;
}
.callToAction a h2{
    text-align: center;
    color: white;
}
</style>