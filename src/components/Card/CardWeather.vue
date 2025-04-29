<script setup>
import Card from "@/components/Card/Card.vue";
import HumidityIcon from '@/assets/img/humidity.png';
import WindIcon from '@/assets/img/wind.png';
import Pressure from '@/assets/img/pressure-white.png';
import UVIcon from '@/assets/img/uv-white.png';
import SunriseIcon from '@/assets/img/sunrise-white.png';
import SunsetIcon from '@/assets/img/sunset-white.png';
import DarkSunriseIcon from '@/assets/img/sunrise-dark.png';
import DarkSunsetIcon from '@/assets/img/sunset-dark.png';
import DarkHumidityIcon from '@/assets/img/humidity-dark.png';
import DarkWindIcon from '@/assets/img/wind-dark.png';
import DarkPressure from '@/assets/img/pressure-dark.png';
import DarkUVIcon from '@/assets/img/uv-dark.png';

import useZeroPadding from "@/composables/useZeroPadding.js";

const props = defineProps(['weather-props', 'sunrise-sunset-props', 'wind-props', 'description-weather-props', 'is-dark-theme']);
</script>

<template>
  <Card>
    <div class="col lg:flex justify-around xl:justify-between pt-10 px-5 w-full mb-7 dark:text-white">
      <div class="text-center lg:text-left">
        <div class="text-4xl sm:text-7xl font-bold mb-2">{{props.weatherProps.temp}}°C</div>
        <div class="sm:text-xl mb-5">Feels like: {{props.weatherProps.feels_like}}°C</div>
        <div class="justify-center lg:justify-start flex items-center mb-1">
          <img class="pr-3" :src="props.isDarkTheme ? DarkSunriseIcon : SunriseIcon" alt="">
          <div class="flex flex-col sm:text-xl font-medium mb-2"><span class="font-bold">Sunrise</span> {{useZeroPadding(new Date(props.sunriseSunsetProps.sunrise * 1000).getHours())}}:{{useZeroPadding(new Date(props.sunriseSunsetProps.sunrise * 1000).getMinutes())}} AM</div>
        </div>
        <div class="justify-center lg:justify-start flex items-center">
          <img class="pr-3" :src="props.isDarkTheme ? DarkSunsetIcon : SunsetIcon" alt="">
          <div class="flex flex-col sm:text-xl font-medium"><span class="font-bold">Sunset</span> {{useZeroPadding(new Date(props.sunriseSunsetProps.sunset * 1000).getHours())}}:{{useZeroPadding(new Date(props.sunriseSunsetProps.sunset * 1000).getMinutes())}} AM</div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center lg:block">
        <img :src="`https://openweathermap.org/img/wn/${props.descriptionWeatherProps[0].icon}@2x.png`" alt="">
        <div class="text-2xl sm:text-4xl font-bold">{{ props.descriptionWeatherProps[0].main }}</div>
      </div>
      <div class="flex flex-col pt-5 lg:pt-0">
        <div class="flex mb-5 justify-center lg:justify-start">
          <div class="flex flex-col items-center justify-end text-center sm:text-lg pr-10">
            <img :src="props.isDarkTheme ? DarkHumidityIcon : HumidityIcon" alt="">
            <div class="font-bold">{{props.weatherProps.humidity}}%</div>
            <div>Humidity</div>
          </div>
          <div class="flex flex-col items-center text-center sm:text-lg">
            <img :src="props.isDarkTheme ? DarkWindIcon :WindIcon" alt="">
            <div class="font-bold">{{props.windProps.speed}}m/s</div>
            <div>Wind Speed</div>
          </div>
        </div>
        <div class="flex justify-center lg:justify-start">
          <div class="flex flex-col items-center text-center sm:text-lg pr-15">
            <img :src="props.isDarkTheme ? DarkPressure: Pressure" alt="">
            <div class="font-bold">{{props.weatherProps.pressure}}hPa</div>
            <div>Pressure</div>
          </div>
          <div class="flex flex-col items-center text-center sm:text-lg">
            <img :src="props.isDarkTheme ? DarkUVIcon : UVIcon" alt="">
            <div class="font-bold">-</div>
            <div>UV</div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
