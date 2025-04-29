<script setup>
import Card from "@/components/Card/Card.vue";
import useZeroPadding from "../../composables/useZeroPadding.js";

const {cityName, dateProps} = defineProps(['city-name', 'date-props']);
</script>

<template>
  <Card>
    <h3 class="text-2xl sm:text-3xl font-bold pt-10 mb-5 sm:mb-15 inline-flex justify-center dark:text-white">{{ cityName }}</h3>
    <span class="font-bold text-4xl sm:text-7xl inline-flex justify-center mb-5 dark:text-white">{{useZeroPadding(new Date(dateProps).getHours())}}:{{useZeroPadding(new Date(dateProps).getMinutes())}}</span>
    <span class="inline-flex justify-center sm:text-xl mb-10 dark:text-white">{{new Date(dateProps).toLocaleString('en-US', {weekday: 'long',  day: "numeric",  month: "long"})}}</span>
  </Card>
</template>

<style scoped>

</style>
