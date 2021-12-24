import { IMailProvider, IVariables } from "../IMailProvider";

interface IMessage {
  to: string;
  subject: string;
  variables: IVariables;
  path: string;
}

class MailProviderInMemory implements IMailProvider {
  private message: IMessage[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
