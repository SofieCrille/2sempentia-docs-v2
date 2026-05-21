<script setup>
import { ref } from 'vue';
import { storage } from '@/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImagePlus } from 'lucide-vue-next';

const emit = defineEmits(['uploaded']);

const uploading = ref(false);
const previewUrl = ref(null);

async function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  uploading.value = true;

  // Upload til Firebase Storage
  const fileRef = storageRef(storage, `projects/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);

  // Hent download-URL
  const url = await getDownloadURL(fileRef);
  previewUrl.value = url;

  // Send URL'en op til forælderen
  emit('uploaded', url);
  uploading.value = false;
}
</script>

<template>
  <div class="photo-upload">
    <label class="photo-upload__dropzone">
      <input
        type="file"
        accept="image/*"
        class="photo-upload__input"
        @change="handleFileChange"
      />

      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Preview"
        class="photo-upload__preview"
      />

      <div v-else class="photo-upload__placeholder">
        <ImagePlus class="photo-upload__icon" :size="32" />
        <span>{{ uploading ? 'Uploader...' : 'Tilføj billede' }}</span>
      </div>
    </label>
  </div>
</template>