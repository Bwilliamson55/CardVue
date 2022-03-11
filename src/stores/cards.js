import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import cardsDataSeed from "@/CardsSeed.json";

export const useCardsStore = defineStore("cards", () => {

    let baseRepo = cardsDataSeed.Cards; //hydrate the repo with the json if not already
    const repo = ref(baseRepo);
    const gridFilterDefaults = {
        teamEffect:'',
        costMinMax: {
        value: [0, 800],
        tooltipPosition: 'bottom',
        orientation: 'horizontal'
        },
        supplyLine:[],
        supplyTrack:[],
        damageType:[],
        effects:[]
    };
    
    let gridFilters = reactive({...gridFilterDefaults});
    
    const filteredCards = computed(() => {
        return filterCardsByRange(
            filterCardsByEffect(
                filterCardsByDamageType(
                    filterCardsBySupplyLine(
                        filterCardsBySupplyTrack(
                            filterCardsByTeamEffect(repo.value)
                        )
                    )
                )
            )
        )
    });

    const activeFilterCount = computed(() => {
        let count = 0 //excluding cost range
        let filtList = ['damageType', 'effects', 'supplyLine', 'supplyTrack', 'teamEffect']
        filtList.forEach((fname) => {
            (gridFilters[fname].length > 0 && gridFilters[fname] != "") ? count++ : ''})
        return count
    });
    const cardEffectsList = computed(() => {
        let effects = []
        repo.value.forEach(card => {
            effects.push(Object.keys(card.Effects))
        })
        let uniqueEffects = effects.flat(Infinity).filter((x, i, a) => a.indexOf(x) === i)
        uniqueEffects.sort()
        return uniqueEffects.reduce((obj, cur) => ({...obj, [cur]: cur.replaceAll('_', ' ')}), {})
    });
    const cardFilters = computed(() => {
        return {
            effects: cardEffectsList,
            supplyLines: getUniqueValues(repo.value, 'Supply_Line').sort(),
            supplyTracks: getUniqueValues(repo.value, 'Supply_Track').sort(),
            damageTypes: getUniqueValues(repo.value, 'Damage_Type').sort()
          }
    });
    
    // methods: clearAllFilters, getUniqueValues(arrofobj, key), filterCardsBy...(6 types)

    function clearAllFilters() {
        Object.assign(gridFilters, gridFilterDefaults);
    }
    function getUniqueValues(arrayOfObjects, key) {
        let array = []
        arrayOfObjects.forEach(obj => {
            array.push(obj[key])
        })
        return array.flat(Infinity).filter((x, i, a) => a.indexOf(x) === i)
    }
    function filterCardsByTeamEffect(Cards) {
        return Cards.filter(card => ((card.Team_Effect === gridFilters.teamEffect)
            || gridFilters.teamEffect === "Any" || gridFilters.teamEffect.length <= 0))
    }
    function filterCardsByRange(Cards) {
        return Cards.filter(card =>
            ((card.Copper_Cost >= gridFilters.costMinMax.value[0] &&
              card.Copper_Cost <= gridFilters.costMinMax.value[1])
              || !('Copper_Cost' in card))
          )
    }
    function filterCardsBySupplyLine(Cards){
        return Cards.filter(card => (gridFilters.supplyLine.includes(card.Supply_Line)
            || gridFilters.supplyLine.length <= 0))
    }
    function filterCardsBySupplyTrack(Cards){
        return Cards.filter(card => (gridFilters.supplyTrack.includes(card.Supply_Track)
            || gridFilters.supplyTrack.length <= 0))
    }
    function filterCardsByDamageType(Cards){
        if (gridFilters.damageType.length <= 0){return Cards} 
        return Cards.filter(card => (gridFilters.damageType.includes(card.Damage_Type)
            || gridFilters.damageType.length <= 0))
    }
    function filterCardsByEffect(Cards){
        if (gridFilters.effects.length <= 0){return Cards} 
        return Cards.filter(card => gridFilters.effects.find(el => el in card.Effects))
    }

    return {
        repo,
        activeFilterCount,
        cardFilters,
        filteredCards,
        gridFilters,
        clearAllFilters
    }
}, {
    persist: true
});