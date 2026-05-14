const CreateTaskCommand =
require('../../src/modules/core/application/commands/CreateTaskCommand');

describe('CreateTaskCommand', () => {

  test('Create command', () => {

    const command =
      new CreateTaskCommand(
        'Test',
        '2030-01-01'
      );

    expect(command.title)
      .toBe('Test');

  });

});