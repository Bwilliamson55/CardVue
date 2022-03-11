<template>
  <TheNavigation #content>
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="fade" mode="out-in">
        <div :key="$route.name">
          <component :is="Component" :key="$route.path"></component>
        </div>
      </transition>
    </router-view>
  </TheNavigation>
</template>

<script setup>
import TheNavigation from '@/components/TheNavigation.vue'
</script>