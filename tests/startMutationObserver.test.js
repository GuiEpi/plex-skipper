let listeners = [];

global.chrome = {
    storage: {
        onChanged: {
            addListener: jest.fn((listener) => listeners.push(listener)),
            callListeners: (changes) => listeners.forEach((listener) => listener(changes)),
        }
    }
};

const { startMutationObserver } = require('../src/skipper');

describe('startMutationObserver', () => {
    let mockObserve;
    let mockDisconnect;
    let observer;

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();

        // Set up common mocks
        mockObserve = jest.fn();
        mockDisconnect = jest.fn();
        global.MutationObserver = jest.fn().mockImplementation(() => {
            observer = {
                observe: mockObserve,
                disconnect: mockDisconnect
            };
            return observer;
        });

        // Mock window.addEventListener
        window.addEventListener = jest.fn((event, handler) => {
            if (event === 'beforeunload') {
                handler();
            }
        });
    });

    test('starts mutation observer when isSkipperOn changes to true and observer is defined', () => {
        startMutationObserver();

        const changes = { isSkipperOn: { newValue: true } };

        chrome.storage.onChanged.callListeners(changes);

        expect(mockObserve).toHaveBeenCalledWith(document.documentElement, {
            childList: true,
            subtree: true
        });
    });

    test('disconnects mutation observer when isSkipperOn changes to false', () => {
        startMutationObserver();

        const changes = { isSkipperOn: { newValue: false } };

        chrome.storage.onChanged.callListeners(changes);

        expect(mockDisconnect).toHaveBeenCalled();
    });

    test('disconnects observer on beforeunload event', () => {
        startMutationObserver();

        const beforeUnloadEvent = new Event('beforeunload');
        window.dispatchEvent(beforeUnloadEvent);

        expect(mockDisconnect).toHaveBeenCalled();
    });
});