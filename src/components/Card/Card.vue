<script setup>
  import {computed} from "vue";

  const props = defineProps(['props']);
  const style = computed(() => ` flex flex-col bg-gray-200 dark:bg-zinc-600 rounded-3xl shadow-md/50 ${props.props}`);
</script>

<template>
  <div :class="style">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
