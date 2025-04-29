<script setup>
import Search from "@/components/Search.vue";
import CurrentLocation from "@/components/CurrentLocation.vue";
import ThemeButton from "@/components/ThemeButton.vue";
import CardInfo from "@/components/Card/CardInfo.vue";
import CardWeather from "@/components/Card/CardWeather.vue";
import CardDaysForecast from "@/components/Card/CardDaysForecast.vue";
import CardHourlyForecast from "@/components/Card/CardHourlyForecast.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const weather = ref({});
const date = ref({});
const isDarkTheme = ref(false);
const isLoading = ref(false);
const isActiveBurgerMenu = ref(false);

if(localStorage.getItem('isDarkTheme')) {
  isDarkTheme.value = localStorage.getItem('isDarkTheme') === "true";
}

onMounted(async () => {
  isLoading.value = true;
  if(localStorage.getItem('coordinates')) {
    try {
      const coordinates = JSON.parse(localStorage.getItem('coordinates'));
      const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
      const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);

      updateWeather({currentWeather, forecast})
      updateDate();
    } catch (e) {
      console.log(e);
    }
  }
  isLoading.value = false;
})

function updateWeather(data) {
  weather.value = data;
}

function updateDate() {
  date.value = Date.now();
}

function updateDarkTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  localStorage.setItem('isDarkTheme', String(isDarkTheme.value));
}

function updateIsLoading(data) {
  isLoading.value = data;
}

</script>

<template>
  <div class="px-3 sm:px-10 dark:bg-zinc-700 min-h-full" :class="{dark: isDarkTheme}">
    <div class="max-w-[1920px] m-auto pb-5">
      <div class="flex flex-col sm:flex-row justify-between pt-10 mb-10 flex-wrap xl:flex-nowrap">
        <div class="sm:hidden -order-1 flex justify-center mb-5">
          <div class="cursor-pointer block sm:hidden h-15 w-15 relative before:content-[''] before:l-0 before:absolute before:block before:w-full before:h-1 dark:before:bg-white before:bg-black before:top-0 after:content-[''] after:l-0 after:absolute after:block after:w-full after:h-1 after:bg-black dark:after:bg-white after:bottom-0 before:shadow-[0_1.8rem_0_#000] dark:before:shadow-[0_1.8rem_0_#fff]"
            @click="isActiveBurgerMenu=!isActiveBurgerMenu"></div>
        </div>
        <ThemeButton @update-dark-theme="updateDarkTheme" :is-dark-theme-props="isDarkTheme" v-show="isActiveBurgerMenu" class="sm:hidden"/>
        <ThemeButton @update-dark-theme="updateDarkTheme" :is-dark-theme-props="isDarkTheme" class="hidden sm:flex"/>
        <Search @update-weather="updateWeather"
                @update-date="updateDate" @update-is-loading="updateIsLoading" :is-dark-theme="isDarkTheme"/>
        <CurrentLocation @update-weather="updateWeather"
                         @update-date="updateDate" @update-is-loading="updateIsLoading" v-show="isActiveBurgerMenu" class="sm:hidden"/>
        <CurrentLocation @update-weather="updateWeather"
                         @update-date="updateDate" @update-is-loading="updateIsLoading" class="hidden sm:flex"/>
      </div>
      <div v-if="!isLoading">
        <div v-if="Object.keys(weather).length !== 0" class="xl:grid xl:gap-10 xl:grid-cols-5">
          <CardInfo props="xl:col-span-2 mb-5 xl:mb-0" :city-name="weather.currentWeather.data.name"
                    :date-props="date"/>
          <CardWeather props="xl:col-span-3 mb-5 xl:mb-0" :weather-props="weather.currentWeather.data.main"
                       :sunrise-sunset-props="weather.currentWeather.data.sys"
                       :wind-props="weather.currentWeather.data.wind"
                       :description-weather-props="weather.currentWeather.data.weather"
                       :is-dark-theme="isDarkTheme"/>
          <CardDaysForecast props="xl:col-span-2 mb-5 xl:mb-0" :weather-forecast-props="weather.forecast.data.list"/>
          <CardHourlyForecast props="xl:col-span-3" :weather-forecast-props="weather.forecast.data.list"/>
        </div>
        <div v-else class="flex justify-center font-bold text-2xl sm:pt-20 dark:text-white">
          Нет данных. Сделайте поиск по городу в поисковой строке.
        </div>
      </div>
      <div v-else class="dark:text-white text-center sm:mt-50 text-5xl">
        Загрузка...
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  display: none;
}
</style>
