<script setup>
import Card from "@/components/Card/Card.vue";
import {computed} from "vue";

const props = defineProps(['weather-forecast-props']);
const weatherForecastItems = computed(() => {
  let array = [];
  let counter = 0;
  for (let item of props.weatherForecastProps) {
    if (counter <= 5) {
      if (new Date(item.dt * 1000).getHours() === 14) {
        array.push(item);
        counter++;
      }
    }
    else {
      break;
    }
  }
  return array;
});
</script>

<template>
  <Card>
    <div class="flex-col inline-flex px-2 2xl:px-20 dark:text-white">
      <h3 class="text-2xl sm:text-3xl font-bold pt-10 mb-5 sm:mb-15 inline-flex justify-center">5 Days Forecast</h3>
      <div class="flex justify-around xl:justify-between">
        <div class="flex flex-col">
          <div v-for="item in weatherForecastItems" :key="item.dt" class="pt-1">
            <img :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`" alt="">
          </div>
        </div>
        <div class="flex flex-col justify-around">
          <div v-for="item in weatherForecastItems" class="font-bold sm:text-2xl mr-5 sm:mr-0" :key="item.dt">
            <span>{{item.main.temp}}°C</span>
          </div>
        </div>
        <div class="flex flex-col justify-around">
          <div v-for="item in weatherForecastItems" class="font-bold sm:text-2xl" :key="item.dt">
            <span>{{new Date(item.dt * 1000).toLocaleString('en-US', {weekday: 'long',  day: "numeric",  month: "long"})}}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
