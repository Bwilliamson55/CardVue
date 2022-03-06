<template>
  <div>
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Some Stats!</h3>
      <dl class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
          <dt class="text-base font-normal text-gray-900">
            {{ item.name }}
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
              {{ item.stat }}
              <span class="ml-2 text-sm font-medium text-gray-500"> from {{ item.previousStat }} </span>
            </div>

            <div :class="[item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0']">
              <ArrowSmUpIcon v-if="item.changeType === 'increase'" class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true" />
              <ArrowSmDownIcon v-else class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true" />
              <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
              {{ item.change }}
            </div>
          </dd>
        </div>
      </dl>
    </div>
    <hr class="border-2 my-3"/>
    <div>
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Quick Actions</h2>
      <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="project in projects" :key="project.name" class="col-span-1 flex shadow-sm rounded-md">
          <div :class="[project.bgColor, 'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md']">
            {{ project.initials }}
          </div>
          <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div class="flex-1 px-4 py-2 text-sm truncate">
              <a :href="project.href" class="text-gray-900 font-medium hover:text-gray-600">{{ project.name }}</a>
              <p class="text-gray-500">{{ project.members }} Members</p>
            </div>
            <div class="flex-shrink-0 pr-2">
              <button type="button" class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Open options</span>
                <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ArrowSmDownIcon, ArrowSmUpIcon, DotsVerticalIcon } from '@heroicons/vue/solid'

const stats = [
  { name: 'Highest Damage Deck', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'Avg. Deck Damage', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Worst Deck', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]
const projects = [
  { name: 'Create Card', initials: 'CC', href: '#', members: 16, bgColor: 'bg-pink-600' },
  { name: 'Create Deck', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
  { name: 'Create Team', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
  { name: 'Stat View', initials: 'SV', href: '#', members: 8, bgColor: 'bg-green-500' },
]

export default {
  components: {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    DotsVerticalIcon,
  },
  setup() {
    return {
      stats,
      projects,
    }
  },
}
</script>
