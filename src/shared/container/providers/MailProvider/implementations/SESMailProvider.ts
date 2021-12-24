import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider, IVariables } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path, { encoding: "utf-8" });
    const compiledTemplate = handlebars.compile(templateFileContent);

    const templateHTML = compiledTemplate(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <rentx@luiscapelletto.com>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
