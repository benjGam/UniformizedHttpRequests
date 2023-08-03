import Command from '../command-management/Command';

export default class GenerateCommand extends Command {
  protected _name = 'generate';
  protected _description = 'This command will create base of custom DTO file';
  protected _usage = 'generate [FILENAME] [PATH]';

  public execute(args: string[]) {
    if (args.length < 2) {
      console.log(this.toString());
      return;
    }
  }
}
