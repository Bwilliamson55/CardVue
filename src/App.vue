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

<script>
import TheNavigation from '@/components/TheNavigation.vue'
export default{
  components: {TheNavigation},
  setup() {
    return {
      
      }
    }
}
</script>