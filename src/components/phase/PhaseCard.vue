<!-- src/components/phase/PhaseCard.vue -->
<script setup>
import PhaseIcon from './PhaseIcon.vue';
import StatusBadge from '../ui/StatusBadge.vue';

defineProps({
  phase: { type: Object, required: true }
});
</script>

<template>
  <div class="phase-card">
    <PhaseIcon :name="phase.name" class="phase-card__icon" />
    <span class="phase-card__name">{{ phase.name }}</span>
    <StatusBadge :completed="phase.completed" class="phase-card__status" />
  </div>
</template>