const { startMutationObserver } = require('../skipper');

describe('startMutationObserver', () => {
    test('starts observing document', () => {
        // Mock MutationObserver and its observe method
        const mockObserve = jest.fn();
        global.MutationObserver = jest.fn().mockImplementation(() => ({
            observe: mockObserve
        }));

        startMutationObserver();

        // Assert that observer.observe is called with correct arguments
        expect(mockObserve).toHaveBeenCalledWith(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
});
