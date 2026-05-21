<script setup>
import { onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';
import PhaseIcon from './PhaseIcon.vue';

const phaseStore = usePhaseStore();

const model = defineModel({ default: () => [] });

onMounted(() => {
  phaseStore.fetchStandardPhases();
});

function togglePhase(phase) {
  const index = model.value.findIndex(p => p.id === phase.id);
  if (index === -1) {
    model.value.push({ ...phase, order: model.value.length + 1 });
  } else {
    model.value.splice(index, 1);
    model.value.forEach((p, i) => p.order = i + 1);
  }
}

function getOrder(phase) {
  return model.value.find(p => p.id === phase.id)?.order;
}

function isSelected(phase) {
  return model.value.some(p => p.id === phase.id);
}
</script>

<template>
  <div class="phase-selector">
    <div
      v-for="phase in phaseStore.standardPhases"
      :key="phase.id"
      class="phase-option"
      :class="{ 'phase-option--selected': isSelected(phase) }"
      @click="togglePhase(phase)"
    >
      <div class="phase-option__info">
        <PhaseIcon :name="phase.name" />
        <span class="phase-option__name">{{ phase.name }}</span>
      </div>
      <span v-if="getOrder(phase)" class="phase-option__number">
        {{ getOrder(phase) }}
      </span>
    </div>
  </div>
</template>