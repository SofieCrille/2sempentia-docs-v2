<script setup>
import { ref } from 'vue';
import { useProjectStore } from '@/stores/project';
import { useRouter } from 'vue-router';
import PhotoUpload from '@/components/project/PhotoUpload.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import PhaseSelector from '@/components/phase/PhaseSelector.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const projectStore = useProjectStore();
const router = useRouter();


const selectedPhases = ref([]);
const projectNumber = ref('');
const name = ref('');
const address = ref('');
const imageUrl = ref('');


function handleUploaded(url) {
  imageUrl.value = url;
};

function handleCreate() {
	const id = projectStore.createProject({
		projectNumber: projectNumber.value,
		name: name.value,
		address: address.value,
		imageUrl: imageUrl.value,
		phases: selectedPhases.value
	});
	router.push(`/manager/projects/${id}`);
};
</script>

<template>
<section class="card-titled">
  <h3 class="card-titled__title">Projektoplysninger</h3>
  <BaseInput v-model="projectNumber" placeholder="Projektnummer" />
  <BaseInput v-model="name" placeholder="Projektnavn" />
  <BaseInput v-model="address" placeholder="Projekt Adresse" />
</section>

<section class="card-titled">
  <h3 class="card-titled__title">Projektbillede</h3>
  <PhotoUpload @uploaded="handleUploaded" />
</section>

<section class="card-titled">
  <h3 class="card-titled__title">Faser</h3>
  <PhaseSelector v-model="selectedPhases" />
</section>
	<BaseButton variant="primary" @click="handleCreate">Opret Projekt</BaseButton>
</template>