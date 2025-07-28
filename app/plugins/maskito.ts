import { defineNuxtPlugin } from '#app';
import { maskito } from '@maskito/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('maskito', maskito);
});
