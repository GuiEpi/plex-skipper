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

const delaySkipIntro = storage.defineItem<number>("local:delaySkipIntro", {
  defaultValue: 0,
});

const delaySkipCredits = storage.defineItem<number>("local:delaySkipCredits", {
  defaultValue: 0,
});

export {
  enablePlexSkipper,
  enableSkipIntro,
  enableSkipCredits,
  enablePlayNext,
  delaySkipCredits,
  delaySkipIntro,
};
