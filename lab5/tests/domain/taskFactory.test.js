const TaskFactory =
require('../../src/modules/core/domain/factories/TaskFactory');

describe('TaskFactory', () => {

  test('should throw if title empty', () => {

    expect(() => {

      TaskFactory.create(
        '',
        '2030-01-01'
      );

    }).toThrow();

  });

});