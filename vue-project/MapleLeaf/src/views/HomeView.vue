<script setup>
import NavBar from '../components/Header.vue';
import FrontPageTop from '../components/FrontPageTop.vue';
import Banner from '../components/Banner.vue';
import Artikler from '../components/Artikler.vue';
import GoogleLogin from '../components/logIn/LogIn.vue';

</script>

<template>
  <main>
    <NavBar />
    <GoogleLogin />

    <FrontPageTop />
    <Banner />
    <Artikler />
    
  </main>
</template>
