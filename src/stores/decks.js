import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import decksDataSeed from '@/DecksSeed.json';
import { useCardsStore } from '@/stores/cards.js';
import { objectToString } from '@vue/shared';

export const useDecksStore = defineStore(
  'decks',
  () => {
    //let baseRepo = decksDataSeed.Decks; //hydrate the repo with the json if not already
    const repo = ref([]);
    const cardStore = useCardsStore();
    let currentDeckId = ref(0);

    const deckDefaults = {
      id: 0,
      sort: 0,
      flipped: false,
      Name: 'Sample Deck',
      Image: '',
      Cards: [0, 1, 2],
      Totals: {},
    };

    const computedDecks = computed(() => {
      return computeDecks(repo.value);
    });
    const currentDeck = computed(() => {
      return repo.value[currentDeckId.value];
    });

    function computeDecks(array) {
      let deckIds = [];
      array.forEach((deck) => {
        let firstCardId = 0;
        if (Object.keys(deck.Cards).length !== 0) {
          firstCardId = deck.Cards[0];
        }
        if (deck.Image != cardStore.repo[firstCardId].Image) {
          assignImage(deck, firstCardId);
        }
        sumEffects(deck);
        deckIds.push(deck.id);
      });
      return deckIds;
    }
    function sumEffects(deckObj) {
      if (repo.value[deckObj.id]) {
        deckObj.Cards.forEach((cardId) => {
          let effects = cardStore.repo[cardId].Effects;
          for (let effect in effects) {
            if (deckObj.Totals.hasOwnProperty(effect)) {
              if (isNaN(effects[effect])) {
                deckObj.Totals[effect + '_' + cardId] = effects[effect];
              } else {
                deckObj.Totals[effect] = Number(deckObj.Totals[effect]) + Number(effects[effect]);
              }
            } else {
              deckObj.Totals[effect] = isNaN(effects[effect]) ? effects[effect] : Number(effects[effect]);
            }
          }
        });
        Object.assign(repo.value[deckObj.id].Totals, deckObj.Totals);
      }
    }
    function assignImage(deckObj, cardId = -1) {
      if (cardId >= 0) {
        deckObj.Image = cardStore.repo[cardId].Image;
      } else if (Object.keys(deckObj.Cards).length !== 0) {
        deckObj.Image = cardStore.repo[0].Image;
      } else {
        deckObj.Image = cardStore.repo[deckObj.Cards[0]].Image;
      }
    }
    function addCard(deckId, CardId) {
      let deckIndex = getDeckIndex(deckId);
      if (CardId in repo.value[deckIndex].Cards) {
        return false;
      }

      repo[deckIndex].Cards.push(CardId);
      return deckId;
    }
    function removeCard(deckId, CardId) {
      let deckIndex = getDeckIndex(deckId);
      if (CardId in repo[deckIndex].Cards) {
        repo[deckIndex].Cards = repo[deckIndex].Cards.filter((el) => {
          return el != CardId;
        });
      }
    }
    function createDeck() {
      let ids = repo.value.map((deck) => {
        return deck.id;
      });
      let newId = ids.length ? Math.max(...ids) + 1 : 0;
      let newDeck = { ...deckDefaults };
      newDeck.id = newId;
      console.log(newDeck.id);
      return repo.value.push(newDeck) - 1;
    }
    function deleteDeck(deckId) {
      let index = getDeckIndex(deckId);
      repo.value.splice(index, 1);
    }
    function setCurrentDeck(deckId) {
      currentDeckId = deckId;
    }
    function getDeckIndex(deckId) {
      return repo.value.findIndex((deck) => deck.id === deckId);
    }

    return {
      repo,
      computedDecks,
      currentDeckId,
      currentDeck,
      deleteDeck,
      createDeck,
    };
  },
  {
    persist: {
      key: 'decks',
      storage: localStorage,
    },
  }
);
