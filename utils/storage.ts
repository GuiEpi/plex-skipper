const enablePlexSkipper = storage.defineItem<boolean>(
  "local:enablePlexSkipper",
  {
    defaultValue: true,
  },
);

const enableSkipIntro = storage.defineItem<boolean>("local:enableSkipIntro", {
  defaultValue: true,
});

const enableSkipCredits = storage.defineItem<boolean>(
  "local:enableSkipCredit",
  {
    defaultValue: true,
  },
);

const enablePlayNext = storage.defineItem<boolean>("local:enablePlayNext", {
  defaultValue: true,
});

export {
  enablePlexSkipper,
  enableSkipIntro,
  enableSkipCredits,
  enablePlayNext,
};
