<!-- src/components/ui/BaseAccordion.vue -->
<script setup>
import { ref } from 'vue';
import { ChevronRight, ChevronUp } from 'lucide-vue-next';

defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const open = ref(false);
</script>

<template>
  <div class="base-accordion" :class="{ 'base-accordion--open': open }" @click="open = !open">
    <div class="base-accordion__header">
      <span class="base-accordion__question">{{ question }}</span>
      <component :is="open ? ChevronUp : ChevronRight" class="base-accordion__icon" />
    </div>

    <Transition name="expand">
      <p v-if="open" class="base-accordion__answer">{{ answer }}</p>
    </Transition>
  </div>
</template>