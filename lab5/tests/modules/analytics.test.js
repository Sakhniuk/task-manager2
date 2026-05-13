const Listener =
require('../../src/modules/analytics/application/TaskAnalyticsListener');

describe('Analytics module', () => {

  test('should process task created event', () => {

    const listener =
      new Listener();

    listener.handle({
      task: {
        id: 1,
        title: 'Test'
      }
    });

  });

});