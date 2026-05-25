<!-- src/components/ui/NavCard.vue -->
<script setup>
defineProps({
  label: { type: String, default: '' },
  icon: { type: String, default: '' }
});
</script>

<template>
  <div class="nav-card">
    <img v-if="icon" :src="`/icons/${icon}`" :alt="label" class="nav-card__icon" />
    <span v-if="label" class="nav-card__label">{{ label }}</span>
  </div>
</template>