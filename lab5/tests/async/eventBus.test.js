const EventBus =
require('../../src/modules/core/event-bus/EventBus');

test(
  'event bus publishes event',
  () => {

    const bus =
      new EventBus();

    let called = false;

    bus.subscribe(
      'TaskCreated',
      () => {

        called = true;

      }
    );

    bus.publish(
      'TaskCreated',
      {}
    );

    expect(called)
      .toBe(true);

  }
);