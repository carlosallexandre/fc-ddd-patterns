import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {
  protected _id: string;
  private notification: Notification;

  constructor(private context: string) {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }

  protected set id(val: string) {
    if (val.length === 0) this.addError("Id is required");
    this._id = val;
  }

  validate() {
    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  protected addError(message: string) {
    this.notification.addError({
      message,
      context: this.context,
    });
  }
}
