module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    'no-descending-specificity': null,

    'block-no-empty': null,

    'max-empty-lines': null,
  },
}
