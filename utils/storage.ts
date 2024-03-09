const enablePlexSkipper = storage.defineItem<boolean>(
	'local:enablePlexSkipper',
	{
		defaultValue: true,
	},
);

const enableSkipIntroCredit = storage.defineItem<boolean>(
	'local:enableSkipIntroCredit',
	{
		defaultValue: true,
	},
);

const enablePlayNext = storage.defineItem<boolean>(
	'local:enablePlayNext',
	{
		defaultValue: true,
	},
);

export { enablePlexSkipper, enableSkipIntroCredit, enablePlayNext };