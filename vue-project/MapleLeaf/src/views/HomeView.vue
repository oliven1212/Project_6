<script setup>
import NavBar from '../components/Header.vue';
import FrontPageTop from '../components/FrontPageTop.vue';
import Banner from '../components/Banner.vue';
import Artikler from '../components/Artikler.vue';
import LogIn from '@/components/logIn/LogIn.vue';
</script>

<template>
  <main>
    <NavBar />
    <LogIn />
    <FrontPageTop />
    <Banner />
    <Artikler />
    
  </main>
</template>
