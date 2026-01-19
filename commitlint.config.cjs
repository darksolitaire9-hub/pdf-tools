module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'chore', 'docs', 'refactor', 'test', 'build', 'ci', 'perf', 'style']
		],
		'type-case': [2, 'always', 'lower-case'],
		'subject-empty': [2, 'never'],
		'subject-case': [0],
		'header-max-length': [2, 'always', 100]
	}
};
