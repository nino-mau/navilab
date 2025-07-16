export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'comment-empty-line-before': false,
    'custom-property-empty-line-before': false,
    'selector-class-pattern': false,
    'keyframes-name-pattern': false,
    'custom-property-pattern': null,
  },
};
