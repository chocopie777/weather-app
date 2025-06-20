<script setup>
import {ref} from "vue";
import axios from "axios";
import useGetWeather from "@/composables/useGetWeather.js";
import SearchIcon from '@/assets/img/search.png';
import DarkSearchIcon from '@/assets/img/search-dark.png';

const props = defineProps(['is-dark-theme']);
const emit = defineEmits(['updateWeather', 'updateDate', 'updateIsLoading']);
const city = ref('');
const coordinates = ref({});

async function getСoordinates() {
  emit('updateIsLoading', true);
  try {
    const geoData = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${import.meta.env.VITE_API_KEY}`);
    coordinates.value = {
      lat: geoData.data[0].lat,
      lon: geoData.data[0].lon,
    }
    localStorage.setItem('coordinates', JSON.stringify(coordinates.value));
    await useGetWeather({emit, coordinates});
    emit('updateDate');
    emit('updateIsLoading', false);
  } catch (e) {
    console.log(e);
    emit('updateIsLoading', false);
  }
}

</script>

<template>
  <div class="flex flex-col sm:flex-row sm:flex-row xl:max-w-[920px] w-full mt-5 xl:mt-0">
    <div class="mb-3 sm:mb-0 h-[68px] sm:h-auto flex relative hover:shadow-2xl rounded-3xl transition ease-in xl:max-w-[800px] w-full">
      <input type="text" placeholder="Search for your preffered city..."
             class="border-2 sm:text-lg focus:outline-3 focus:outline-amber-400 rounded-3xl py-2 pl-12 sm:pl-20 pr-10 bg-gray-200 placeholder-black w-200 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-white dark:text-white w-full"
             v-model="city" @keyup.enter="getСoordinates">
      <img class="w-[20px] sm:w-auto absolute left-5 top-[35%] sm:top-[20%] pointer-events-none" :src="props.isDarkTheme ? DarkSearchIcon : SearchIcon" alt="">
    </div>
    <button class="border-2 outline-amber-400 sm:ml-5 p-5 rounded-3xl cursor-pointer font-bold sm:text-lg bg-gray-200 relative before:content-[''] before:absolute before:top-[-2px] before:bottom-[-2px] before:left-[-2px] before:right-[-2px] before:rounded-3xl hover:before:shadow-2xl before:transition before:ease-in focus:outline-3 focus:outline-amber-400 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-white dark:text-white"
            @click="getСoordinates">Search
    </button>
  </div>
</template>

<style scoped>

</style>
