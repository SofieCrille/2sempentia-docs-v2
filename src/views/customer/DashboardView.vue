<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import { customerDashboardLinks } from '@/config/navigation';
import BaseList from '@/components/ui/BaseList.vue';
import NavCard from '@/components/ui/NavCard.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import PhaseSummaryCard from '@/components/phase/PhaseSummaryCard.vue'
import dashboardImage from '/images/ProcessHouse.jpg';

const { projectId, projectStore, phaseStore, loadPhases } = useCustomerProject();

watch(projectId, loadPhases);
</script>

<template>
  <div class="dashboard-page">
    <section class="dashboard-header fullbleed">
      <img
        :src="projectStore.projects[0]?.imageUrl || dashboardImage"
        alt="Mit byggeprojekt"
        class="dashboard-header__image"
      />
    </section>

    <ProgressBar :value="phaseStore.progress" />

    <div class="dashboard-grid">
      <RouterLink
        v-if="phaseStore.currentPhase"
        :to="{ name: 'customer-process-details', params: { id: phaseStore.currentPhase.id } }"
      >
        <PhaseSummaryCard label="NUVÆRENDE FASE" :phase="phaseStore.currentPhase" />
      </RouterLink>

      <RouterLink
        v-if="phaseStore.nextPhase"
        :to="{ name: 'customer-process-details', params: { id: phaseStore.nextPhase.id } }"
      >
        <PhaseSummaryCard label="NÆSTE FASE" :phase="phaseStore.nextPhase" />
      </RouterLink>
    </div>

    <BaseList :items="customerDashboardLinks" class="dashboard-list">
      <template #item="{ item }">
        <RouterLink :to="item.route" class="no-underline">
          <NavCard :label="item.label" :icon="item.icon" class="nav-card--small" />
        </RouterLink>
      </template>
    </BaseList>
  </div>
</template>