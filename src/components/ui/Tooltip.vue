<template>
  <div
    class="font-inter absolute z-50 bg-regular-500 text-white text-xs rounded-lg shadow-2xl py-2 px-2 left-full w-[200px]"
    style="top: 50%; transform: translateY(-50%)"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseTooltip',
})
</script>
