<!-- src/components/project/ProjectCard.vue -->
<script setup>
defineProps({
  project: { type: Object, required: true }
});
</script>

<template>
  <div class="project-card">
    <img
      v-if="project.imageUrl"
      :src="project.imageUrl"
      :alt="project.name"
      class="project-card__image"
    />
    <div class="project-card__content">
      <h3 class="project-card__title">PROJEKT #{{ project.projectNumber }}</h3>
      <p class="project-card__subtitle">{{ project.address }}</p>
    </div>
  </div>
</template>