import Command from './Command';
import CommandHandler from './command-handler';
import HelpCommand from '../commands/help-command';

export default class CommandManager {
  private static _Commands: Map<string, Command> = new Map<string, Command>();

  public static async init() {
    await CommandHandler.init();
  }

  public static dispatch(args: string[] = []) {
    const targetedCommand = CommandManager.getCommand(args[0]);
    if (targetedCommand == undefined) {
      (CommandManager.getCommand('help') as HelpCommand).execute();
    } else {
      args.shift();
      targetedCommand.execute(args);
    }
  }

  public static addCommand(commandToAdd: Command) {
    this._Commands.set(commandToAdd.name(), commandToAdd);
  }

  public static getCommand(commandName: string) {
    return this._Commands.get(commandName);
  }

  static get Commands() {
    return this._Commands;
  }
}
