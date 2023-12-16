const { isVideoPage } = require('.../src/skipper');

describe('isVideoPage', () => {
    test('identifies video page URL correctly', () => {
        expect(isVideoPage('https://app.plex.tv/some-video')).toBe(true);
        expect(isVideoPage('https://www.plex.tv/some-video')).toBe(false);
    });
});
