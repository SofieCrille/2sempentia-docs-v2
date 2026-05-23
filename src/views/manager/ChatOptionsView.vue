<script setup>
import NavCard from '@/components/ui/NavCard.vue';
</script>

<template>
  <div class="dashboard-grid">
    <RouterLink :to="{ name: 'manager-chat-list' }" class="no-underline full-width">
      <NavCard icon="Chat.png" class="nav-card--small" />
    </RouterLink>

    <RouterLink :to="{ name: 'manager-chat-list' }" class="no-underline full-width">
      <NavCard icon="Customer.png" label="Opret ny chat med kunde" />
    </RouterLink>

    <RouterLink :to="{ name: 'manager-chat-list' }" class="no-underline full-width">
      <NavCard icon="milton.png" label="Opret ny chat med Milton Huse" />
    </RouterLink>
  </div>
</template>