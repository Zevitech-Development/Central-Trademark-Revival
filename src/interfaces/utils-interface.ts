import { EmailAttachment } from "./services-interface";

export interface GenerateSerialNumberOptionsInterface {
  prefix?: string;
  length?: number;
  includeTimestamp?: boolean;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}
