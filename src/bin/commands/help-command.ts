/* eslint-disable @typescript-eslint/no-unused-vars */
import Command from '../command-management/Command';
import CommandManager from '../command-management/command-manager';

export default class HelpCommand extends Command {
  protected _name = 'help';
  protected _description = 'This command will provide help';
  protected _usage = 'help';

  public execute(args: string[] = []) {
    for (const command of CommandManager.Commands.values()) {
      console.log(`${command.toString()}`);
    }
  }
}
