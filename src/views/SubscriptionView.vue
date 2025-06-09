<template>
  <div class="p-6 h-full overflow-auto">
    <div class="flex justify-end items-center mb-6">
      <button
        v-show="!showNewSubscriptionForm"
        @click="showNewSubscriptionForm = true"
        class="bg-regular-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        Nova assinatura
      </button>
    </div>

    <SubscriptionList v-if="!showNewSubscriptionForm" :subscriptions="subscriptions" />

    <SubscriptionForm
      v-if="showNewSubscriptionForm"
      @submit="createSubscription"
      @cancel="showNewSubscriptionForm = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubscriptionForm from '../components/subscription/SubscriptionForm.vue'
import SubscriptionList from '../components/subscription/SubscriptionList.vue'

defineOptions({
  name: 'SubscriptionView',
})

const showNewSubscriptionForm = ref(false)
const subscriptions = ref([])
const createSubscription = (newSubscription) => {
  subscriptions.value.push(newSubscription)
  showNewSubscriptionForm.value = false
}
</script>
