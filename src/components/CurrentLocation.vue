<script setup>
import {ref} from "vue";
import CurrentLocationIcon from '@/assets/img/current location icon.png';
import useGetWeather from "@/composables/useGetWeather.js";

const emit = defineEmits(['updateWeather', 'updateDate', 'updateIsLoading']);
const coordinates = ref({});
async function getCurrentLocation() {
  emit('updateIsLoading', true);
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(async (position) => {
        coordinates.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        localStorage.setItem('coordinates', JSON.stringify(coordinates.value));
        await useGetWeather({emit, coordinates});
        emit('updateDate');
        emit('updateIsLoading', false);
      },
      (e) => {
        console.log(e)
        emit('updateIsLoading', false);
      }
    );
  } else {
    /* geolocation IS NOT available */
    console.log('geolocation IS NOT available');
    emit('updateIsLoading', false);
  }
}
</script>

<template>
  <button class="-order-1 xl:order-none outline-amber-400 flex justify-center items-center bg-lime-600 text-white py-4 px-10 sm:ml-5 min-w-[280px] rounded-3xl font-bold sm:text-xl cursor-pointer hover:shadow-2xl transition ease-in focus:outline-3 focus:outline-amber-400 whitespace-nowrap"
          @click="getCurrentLocation">
    <img class="pr-2" :src="CurrentLocationIcon" alt="">
    Current Location
  </button>
</template>

<style scoped>

</style>
