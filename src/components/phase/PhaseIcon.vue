<script setup>
import { getPhaseIcon } from '@/utils/phaseIcons';

defineProps({
  name: String,
});

</script>

<template>
  <img v-if="name" 
  :src="`/icons/${getPhaseIcon(name)}`" 
  :alt="name"
  class="phase-icon"
  />
</template>