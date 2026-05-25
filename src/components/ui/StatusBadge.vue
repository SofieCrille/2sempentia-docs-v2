<script setup>
import { getStatusIcon } from '@/utils/phaseIcons';

defineProps({
  completed: { type: Boolean, default: false }
});
</script>

<template>
  <img
    :src="`/icons/${getStatusIcon(completed)}`"
    :alt="completed ? 'Færdig' : 'I gang'"
    class="status-badge"
  />
</template>