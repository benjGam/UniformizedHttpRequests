export default abstract class Command {
  protected abstract readonly _name: string;
  protected abstract readonly _description: string;
  protected abstract readonly _usage: string;

  public abstract execute(args: string[] | undefined);

  public name() {
    return this._name;
  }

  public description() {
    return this._description;
  }

  public usage() {
    return this._usage;
  }

  public toString() {
    return `Usage: ${this._usage}\nDescription: ${this._description}`;
  }
}
