<template>
  <div class="cards-plp">
      
      <!-- <div class="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">Workspace</h1>
        <p class="mt-4 max-w-xl mx-auto text-base text-gray-500">The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.</p>
      </div> -->

      <!-- Filters -->
      <Disclosure as="section" aria-labelledby="filter-heading" class="relative z-2 border-t border-b border-gray-200 grid items-center">
        <h2 id="filter-heading" class="sr-only">Filters</h2>
        <div class="relative col-start-1 row-start-1 py-4">
          <div class="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
            <div>
              <DisclosureButton class="group text-gray-700 font-medium flex items-center">
                <FilterIcon class="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                {{ cardStore.activeFilterCount }} Filters
              </DisclosureButton>
            </div>
            <div class="pl-6">
              <button type="button" class="text-gray-500" @click="cardStore.clearAllFilters()">Clear all</button>
            </div>
          </div>
        </div>
        <DisclosurePanel class="border-t border-gray-200 py-10">
          <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div class="grid grid-cols-1 gap-y-10 auto-rows-min lg:grid-cols-2 lg:gap-x-6">
              <fieldset>
                <legend class="block font-medium">Team Effect?</legend>
                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                  <Multiselect v-model="cardStore.gridFilters.teamEffect" :options="['Any', 'No', 'Yes']"
                  placeholder="Choose" />
                </div>
              </fieldset>
              <fieldset class="p-2">
                <legend class="block font-medium">Copper Cost</legend>
                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                  <Slider v-model="cardStore.gridFilters.costMinMax.value" v-bind="cardStore.gridFilters.costMinMax" :min="0" :max="800" :step="25" />
                </div>
              </fieldset>
              <fieldset>
                <legend class="block font-medium">Damage Type</legend>
                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                  <Multiselect v-model="cardStore.gridFilters.damageType" :options="cardStore.cardFilters.damageTypes" mode="tags"
                  :close-on-select="false" :searchable="true" :create-option="false" :classes="{tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full'}"
                  placeholder="Choose Type(s)" />
                </div>
              </fieldset>
              <fieldset>
                <legend class="block font-medium">Effects</legend>
                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                  <Multiselect v-model="cardStore.gridFilters.effects" :options="cardStore.cardFilters.effects" mode="tags"
                  :close-on-select="false" :searchable="true" :create-option="false" :classes="{tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full'}"
                  placeholder="Choose Effect(s)" />
                </div>
              </fieldset>
            </div>

            <div class="grid grid-cols-1 gap-y-10 auto-rows-min lg:grid-cols-2 lg:gap-x-6">
              
              <fieldset>
                <legend class="block font-medium">Supply Line</legend>
                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                  <Multiselect v-model="cardStore.gridFilters.supplyLine" :options="cardStore.cardFilters.supplyLines" mode="tags"
                  :close-on-select="false" :searchable="true" :create-option="false" :classes="{tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full'}"
                  placeholder="Choose Line(s)" />
                </div>
              </fieldset>
              <fieldset>
                <legend class="block font-medium">Supply Track</legend>
                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                  <Multiselect v-model="cardStore.gridFilters.supplyTrack" :options="cardStore.cardFilters.supplyTracks" mode="tags"
                  :close-on-select="false" :searchable="true" :create-option="false" :classes="{tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full'}"
                  placeholder="Choose Track(s)" />
                </div>
              </fieldset>

            </div>
          </div>
        </DisclosurePanel>
        <!-- sort  may use later -->
        <div class="col-start-1 row-start-1 py-4">
          <div class="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-gray-600">{{ cardStore.filteredCards.length }} Results</p>
            <!-- <Menu as="div" class="relative inline-block">
              <div class="flex">
                <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                      <a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">
                        {{ option.name }}
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu> -->
          </div>
        </div>
      </Disclosure>

      <!-- Card grid -->
      <section aria-labelledby="products-heading" class="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 id="products-heading" class="sr-only">Cards</h2>

        <div class="bg-white">
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Cards</h2>
            
            <div class="grid grid-cols-2 gap-y-3 gap-x-2 sm:gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <a v-for="card in cardStore.filteredCards" :key="card.id" class="group" >
                <div class="w-full aspect-w-2 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden">
                    <!-- Front of Card -->
                    <img :src="'/campaign cards/' + card.Image" :alt="card.Name" class="w-full h-full object-center object-cover group-hover:opacity-75"
                      v-show="!cardStore.repo[card.id].flipped" @click="flipCard(card.id)"/>
                    <!-- Back of Card -->
                    <div class="p-2 w-full h-full object-center object-cover group-hover:opacity-50"
                      v-show="cardStore.repo[card.id].flipped" @click="flipCard(card.id)">
                      <p class="text-gray-900 group-hover:text-gray-700">Type: {{ card.Type || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Affinity: {{ card.Card_Affinity || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Team Effect?: {{ card.Team_Effect || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Copper Cost: {{ card.Copper_Cost || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Damage Type: {{ card.Damage_Type || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Supply Line: {{ card.Supply_Line || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Supply Track: {{ card.Supply_Track || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Position in Track: {{ card.Position_In_Track || 'N/A' }}</p>
                      <p class="text-gray-900 group-hover:text-gray-700">Effects:</p>
                      <p v-for="(ek, ev) in card.Effects"
                        class="text-gray-900 group-hover:text-gray-700 border border-gray-400 rounded-md text-xs p-1">{{ev}}: {{ek}}</p>
                    </div>
                </div>
                </a>
            </div>
            </div>
        </div>
      </section>

  </div>
</template>

<script setup>

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import {FilterIcon} from '@heroicons/vue/solid'
import Multiselect from '@vueform/multiselect'
import Slider from '@vueform/slider'
import { useCardsStore } from "@/stores/cards"

const cardStore = useCardsStore();
const flipCard = (cardId) => {cardStore.repo[cardId].flipped = !cardStore.repo[cardId].flipped}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/slider/themes/default.css"></style>