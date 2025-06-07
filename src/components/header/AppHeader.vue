<template>
  <header class="flex items-center justify-between bg-white w-full h-[80.5px]">
    <AppLogo class="ml-[35.5px]" />
    <div class="flex items-center mr-[90px]">
      <AppSearchBar class="mr-[99px]" />
      <AppNotificationIcon class="mr-[58px]" />
      <AppUserProfile />
    </div>
  </header>
</template>

<script setup>
import AppLogo from './Logo.vue'
import AppSearchBar from './SearchBar.vue'
import AppNotificationIcon from './NotificationIcon.vue'
import AppUserProfile from './UserProfile.vue'
</script>
