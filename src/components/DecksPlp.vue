<template>
    <div class="bg-white shadow overflow-hidden  justify-end items-center sm:rounded-md mt-1 flex p-1">
        <button type="button" @click="deckStore.createDeck()" class="inline-flex px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Deck 
            <PlusIcon class="h-6 w-6 ml-1" />
        </button>
    </div>
    <div class="spacer h-4 bg-gray-100"></div>
    <div class="bg-white shadow overflow-hidden sm:rounded-md mt-1">
        <ul role="list" class="divide-y-8 divide-gray-200 w-full">
            
        <li v-for="(deck, index) in deckStore.repo" :key="deck.id">
            <a :href="'#'" class="block hover:bg-gray-50">
            <div class="flex items-center px-2 py-2 sm:px-2">
                <div class="min-w-0 flex-1 flex items-center">
                <div class="max-h-24 max-w-[40%] sm:max-w-none overflow-hidden">
                    <img class="h-auto w-auto" :src="'/campaign cards/' + deck.Image" alt="Deck Cover Image" />
                </div>
                <div class="min-w-0 flex-1 px-4 xs:grid xs:grid-cols-2 xs:gap-4">
                    <div>
                    <p class="text-sm font-medium text-indigo-600 truncate">{{ deck.Name }}</p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                        <MailIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span class="truncate">Deck Id: {{ deck.id }}</span>
                    </p>
                    <p class="flex items-center text-sm text-gray-500">#ofCards: {{ deck.Cards.length }}</p>
                    </div>
                    <div class="hidden xs:block">
                    <div>
                        <p class="text-sm text-gray-900">
                        Deck Index in Repo:
                        {{ index }}
                        <!-- <time :datetime="application.date">{{ application.dateFull }}</time> -->
                        </p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                        <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                            Ids: {{ deck.Cards }}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div>
                <a @click.prevent="deckStore.deleteDeck(deck.id)"><TrashIcon class="h-5 w-5 mb-auto text-red-400 hover:text-red-800"/></a>
                </div>
            </div>
            </a>
        </li>
        </ul>
  </div>
</template>

<script setup>
import { CheckCircleIcon, PlusIcon, MailIcon, TrashIcon } from '@heroicons/vue/solid'
import { useCardsStore } from "@/stores/cards"
import { useDecksStore } from "@/stores/decks"

const cardStore = useCardsStore();
const deckStore = useDecksStore();

const flipDeck = (deckId) => {deckStore.repo[deckId].flipped = !deckStore.repo[deckId].flipped}

</script>