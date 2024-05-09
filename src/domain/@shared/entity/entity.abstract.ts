import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {
  protected _id: string;
  protected notification: Notification;
  private context: string;

  constructor(context?: string) {
    this.context = context || Entity.name;
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }

  addError(...messages: string[]) {
    messages.forEach((message) =>
      this.notification.addError({
        message,
        context: this.context,
      })
    );
  }

  dispatchErrors() {
    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }
}
