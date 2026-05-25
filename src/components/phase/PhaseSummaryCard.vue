<!-- src/components/phase/PhaseSummaryCard.vue -->
<script setup>
import PhaseIcon from './PhaseIcon.vue';

defineProps({
  label: { type: String, required: true },
  phase: { type: Object, required: true }
});
</script>

<template>
  <div class="phase-summary-card">
    <h3 class="phase-summary-card__label">{{ label }}</h3>
    <PhaseIcon :name="phase.name" class="phase-summary-card__icon" />
    <span class="phase-summary-card__name">{{ phase.name }}</span>
  </div>
</template>