<script setup>
import NavBar from '../components/Header.vue';
import FootBar from '@/components/Footer.vue';
import FrontPageTop from '../components/FrontPage/FrontPageTop.vue';
import Banner from '../components/FrontPage/Banner.vue';
import Artikler from '../components/FrontPage/Artikler.vue';
import ChildVitamin from '@/components/FrontPage/ChildVitamin.vue';
import VoresVitaminer from '@/components/FrontPage/VoresVitaminer.vue';

</script>

<template>
  <main>
    <NavBar />

    <FrontPageTop />
    <Banner />
    <VoresVitaminer />
    <ChildVitamin />
    <Artikler />
    
    <FootBar />
  </main>
</template>
