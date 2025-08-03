import { BProgress } from '@bprogress/core';
import '@bprogress/core/css';

// Start NProgress immediately when the plugin loads (before Vue mounts)
BProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  minimum: 0.2,
  showSpinner: false
});

// Start progress immediately
BProgress.start();

export default defineNuxtPlugin((nuxtApp) => {
  // On initial page load, complete the progress when app is mounted
  nuxtApp.hook('app:mounted', () => {
    BProgress.done();
  });

  // For page navigations
  nuxtApp.hook('page:start', () => {
    BProgress.start();
  });

  nuxtApp.hook('page:finish', () => {
    BProgress.done();
  });

  nuxtApp.hook('app:error', () => {
    BProgress.done();
  });
});
