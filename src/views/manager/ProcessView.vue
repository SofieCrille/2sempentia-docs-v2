<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import BaseList from '@/components/ui/BaseList.vue';
import PhaseCard from '@/components/phase/PhaseCard.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';

const { phaseStore, loadPhases } = useManagerProject();

onMounted(loadPhases);
</script>

<template>
  <ProgressBar :value="phaseStore.progress" />

  <BaseList :items="phaseStore.phases">
    <template #item="{ item }">
      <RouterLink :to="{ name: 'manager-process-details', params: { id: item.id } }">
        <PhaseCard :phase="item" />
      </RouterLink>
    </template>
  </BaseList>
</template>