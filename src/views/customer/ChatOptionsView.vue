<script setup>
import Topbar from '@/components/layout/TopBar.vue';
import Tabbar from '@/components/layout/TabBar.vue';
import NavCard from '@/components/ui/NavCard.vue';
</script>

<template>

  <div class="dashboard-grid">
    <RouterLink :to="{ name: 'customer-faq' }" class="no-underline">
      <NavCard label="FAQ" class="nav-card--small" />
    </RouterLink>

    <RouterLink :to="{ name: 'customer-chat' }" class="no-underline">
      <NavCard icon="Chat.png" class="nav-card--small" />
    </RouterLink>

    <RouterLink :to="{ name: 'customer-chat' }" class="no-underline full-width">
      <NavCard icon="Manager.png" label="Tal med byggeleder" />
    </RouterLink>

    <RouterLink :to="{ name: 'customer-chat' }" class="no-underline full-width">
      <NavCard icon="milton.png" label="Tal med din Milton Huse rådgiver" />
    </RouterLink>
  </div>
</template>