<script setup>
import Card from "@/components/Card/Card.vue";
import {computed} from "vue";
import useZeroPadding from "@/composables/useZeroPadding.js";
const props = defineProps(['weather-forecast-props']);
const weatherForecastItems = computed(() => props.weatherForecastProps.slice(0, 5));
</script>

<template>
  <Card>
    <h3 class="text-2xl sm:text-3xl font-bold pt-10 mb-5 sm:mb-15 inline-flex justify-center dark:text-white">Hourly Forecast</h3>
    <div class="flex px-5 2xl:px-20 justify-around xl:justify-between mb-5 flex-wrap lg:flex-nowrap">
      <div v-for="item in weatherForecastItems" class="bg-amber-400 inline p-5 sm:ml-5 mb-5 lg:mb-0 first:ml-0 rounded-4xl text-center w-full sm:w-auto" :key="item.dt">
        <div class="mb-2 font-bold sm:text-xl">{{useZeroPadding(new Date(item.dt * 1000).getHours())}}:{{useZeroPadding(new Date(item.dt * 1000).getMinutes())}}</div>
        <img :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" alt="" class="mb-2 justify-self-center">
        <div class="mb-2 font-bold sm:text-lg">{{item.main.temp}}°C</div>
        <div class="mb-2 font-bold sm:text-lg">{{item.wind.speed}}m/s</div>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
