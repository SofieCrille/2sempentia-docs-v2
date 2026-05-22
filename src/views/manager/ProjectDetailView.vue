<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import { ArrowRight } from 'lucide-vue-next';

const { projectId, projectStore, loadProject, loadPhases } = useManagerProject();

onMounted(() => {
  loadProject();
  loadPhases();
});
</script>

<template>
  <section class="card-titled">
    <h3 class="card-titled__title">Projektbillede</h3>
    <img
      v-if="projectStore.project?.imageUrl"
      :src="projectStore.project.imageUrl"
      alt="Projektbillede"
      class="project-photo"
    />
  </section>

  <section class="card-titled">
    <h3 class="card-titled__title">Projektoplysninger</h3>
    <p class="info-label">Projektnummer</p>
    <p class="info-value">{{ projectStore.project?.projectNumber }}</p>
    <p class="info-label">Adresse</p>
    <p class="info-value">{{ projectStore.project?.address }}</p>
  </section>

  <nav class="nav-list">
    <RouterLink :to="{ name: 'manager-process', params: { projectId } }" class="nav-list__item">
      Byggeforløb
      <ArrowRight :size="20" />
    </RouterLink>
    <RouterLink :to="{ name: 'manager-documents', params: { projectId } }" class="nav-list__item">
      Dokumenter
      <ArrowRight :size="20" />
    </RouterLink>
    <RouterLink :to="{ name: 'manager-chat', params: { projectId } }" class="nav-list__item">
      Chat
      <ArrowRight :size="20" />
    </RouterLink>
  </nav>

  <section class="card-titled">
    <h3 class="card-titled__title">Kunde</h3>
    <p class="info-label">Fuldnavn</p>
    <p class="info-value">{{ projectStore.customer?.name }}</p>
    <p class="info-label">Email</p>
    <p class="info-value">{{ projectStore.customer?.email }}</p>
  </section>
</template>