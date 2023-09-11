module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      0,
      'always',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'env',
        'style',
        'docs',
        'comment',
        'refactor',
        'docs',
        'rename',
        'remove',
        'chore',
        'design',
        'test',
      ],
    ],
  },
};
