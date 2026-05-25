<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useManagerProject } from '@/composables/useManagerProject';
import BaseList from '@/components/ui/BaseList.vue';
import ProjectCard from '@/components/project/ProjectCard.vue';

const route = useRoute();
const { projectStore, loadProjects } = useManagerProject();

onMounted(loadProjects);

function getDestination(projectId) {
  const goto = route.query.goto;
  if (goto === 'documents') return { name: 'manager-documents', params: { projectId } };
  if (goto === 'process') return { name: 'manager-process', params: { projectId } };
  return { name: 'manager-project-details', params: { id: projectId } };
}
</script>

<template>
  <BaseList :items="projectStore.projects">
    <template #item="{ item }">
      <RouterLink :to="getDestination(item.id)">
        <ProjectCard :project="item" />
      </RouterLink>
    </template>
  </BaseList>
</template>