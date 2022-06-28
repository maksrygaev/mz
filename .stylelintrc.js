module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    indentation: 2,
    'max-nesting-depth': 3,
    // 'order/properties-alphabetical-order': true,
    // 'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'rules'],
    // 'custom-property-empty-line-before': [
    //   'always',
    //   {
    //     except: ['after-custom-property', 'first-nested'],
    //   },
    // ],
    // 'declaration-empty-line-before': [
    //   'always',
    //   {
    //     except: ['after-declaration', 'first-nested'],
    //   },
    // ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    // 'declaration-block-semicolon-newline-after': 'always',
    // 'block-opening-brace-newline-after': 'always',
    // 'block-closing-brace-newline-before': 'always',
    // 'block-closing-brace-empty-line-before': 'never',
    'block-no-empty': true,
    'comment-no-empty': true,
  },
};
