<script setup>
const props = defineProps(['is-dark-theme-props']);

</script>

<template>
  <button
    class="-order-1 xl:order-none border-2 rounded-3xl p-5 sm:mr-5 mb-3 sm:mb-0 whitespace-nowrap cursor-pointer font-extrabold sm:text-xl hover:shadow-2xl outline-amber-400 transition ease-in focus:outline-3 focus:outline-amber-400 dark:bg-gray-500 dark:border-gray-500 dark:text-white"
    @click="$emit('updateDarkTheme')">
    {{ props.isDarkThemeProps ? 'Dark Theme' : 'Light Theme'}}
  </button>
</template>

<style scoped>

</style>
