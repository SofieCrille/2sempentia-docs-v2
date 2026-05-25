<script setup>
import { Download, Trash2 } from '@lucide/vue';

defineProps({
  document: { type: Object, required: true },
  deletable: { type: Boolean, default: false }
});

defineEmits(['delete']);
</script>

<template>
  <div class="document-card">
    <a :href="document.url" target="_blank" class="document-card__link">
      <span class="document-card__name">{{ document.name }}</span>
      <Download :size="20" />
    </a>
    <button
      v-if="deletable"
      class="document-card__delete"
      @click="$emit('delete')"
    >
      <Trash2 :size="20" />
    </button>
  </div>
</template>