<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import Topbar from '@/components/layout/TopBar.vue';
import TabBar from '@/components/layout/TabBar.vue';
import BaseAccordion from '@/components/ui/BaseAccordion.vue';

const faqs = ref([]);

async function fetchFaqs() {
  const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  faqs.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

onMounted(fetchFaqs);
</script>

<template>
  <BaseAccordion
    v-for="faq in faqs"
    :key="faq.id"
    :question="faq.question"
    :answer="faq.answer"
  />
</template>