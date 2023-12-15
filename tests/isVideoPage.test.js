const { isVideoPage } = require('../skipper');

describe('isVideoPage', () => {
    test('identifies video page URL correctly', () => {
        expect(isVideoPage('https://www.plex.tv/watch/some-video')).toBe(true);
        expect(isVideoPage('https://www.plex.tv/not-watch/some-video')).toBe(false);
    });
});
