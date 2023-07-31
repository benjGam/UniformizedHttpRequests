import * as fs from 'fs';
import CommandManager from './command-manager';

export default class CommandHandler {
  private static readonly _commandFolderPath = './dist/commands';
  private static _commandFiles: string[] = [];

  public static async init() {
    CommandHandler.hookCommandFiles();
    await CommandHandler.instanciateCommands();
  }

  private static hookCommandFiles() {
    this._commandFiles.push(
      ...fs
        .readdirSync(this._commandFolderPath)
        .filter((file) => file.endsWith('.js'))
        .map((file) => this._commandFolderPath + '/' + file),
    );
  }

  private static async instanciateCommands() {
    try {
      for (const command_file of this._commandFiles) {
        CommandManager.addCommand(
          new (await import(`../../${command_file}`)).default(),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}
