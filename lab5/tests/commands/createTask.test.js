const CreateTaskCommand =
require('../../src/application/commands/CreateTaskCommand');

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