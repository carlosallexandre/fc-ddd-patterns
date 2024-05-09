export interface NotificationErrorProps {
  message: string;
  context: string;
}

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    return this.errors.reduce(
      (msg, error) =>
        !context || context == error.context
          ? msg + `${error.context}: ${error.message},`
          : msg,
      ""
    );
  }
}
