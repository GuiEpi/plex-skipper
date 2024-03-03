let listeners = [];

global.chrome = {
    storage: {
        local: {
            get: jest.fn((key, callback) => callback({ enablePlexSkipper: true })),
        },
        onChanged: {
            addListener: jest.fn((listener) => listeners.push(listener)),
            callListeners: (changes) => listeners.forEach((listener) => listener(changes)),
        }
    }
};

const { startMutationObserver } = require('../src/skipper');

describe('startMutationObserver', () => {
  let observer;
  let mockDisconnect;
  let mockObserve;

  beforeEach(() => {
    mockDisconnect = jest.fn();
    mockObserve = jest.fn();

    global.MutationObserver = jest.fn().mockImplementation((callback) => {
      observer = {
        disconnect: mockDisconnect,
        observe: mockObserve,
        callback
      };
      return observer;
    });

    global.document = {
      documentElement: {}
    };

    startMutationObserver();
  });

  it('should create a new MutationObserver', () => {
    expect(global.MutationObserver).toHaveBeenCalled();
  });

  it('should start observing mutations on document.documentElement', () => {
    expect(mockObserve).toHaveBeenCalledWith(document.documentElement, {
      childList: true,
      subtree: true
    });
  });

  it('should disconnect the observer when enablePlexSkipper changes to false', () => {
    chrome.storage.onChanged.callListeners({
      enablePlexSkipper: {
        newValue: false
      }
    });
  
    expect(mockDisconnect).toHaveBeenCalled();
  });
  
  it('should start a new observer when enablePlexSkipper changes to true', () => {
    chrome.storage.onChanged.callListeners({
      enablePlexSkipper: {
        newValue: true
      }
    });
  
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });
});