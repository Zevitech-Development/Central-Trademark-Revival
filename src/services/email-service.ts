import { TrademarkRevivalStep01FormType } from "@/types/forms-type";

import { InvoiceState } from "@/states/store-states";

import { SendEmail } from "@/utils/send-email";

export const SendLeadNotificationEmail = async (
  data: TrademarkRevivalStep01FormType
): Promise<boolean> => {
  const subject = `New Trademark Revival Lead: ${data.firstName} ${data.lastName} (${data.formId})`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Trademark Revival Lead</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .email-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 15px;
        }
        h1 {
          color: #164268;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          width: 180px;
          color: #555;
        }
        .detail-value {
          flex: 1;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png" alt="Central Trademark Revival" class="logo">
          <h1>New Trademark Revival Lead</h1>
        </div>
        
        <div class="section">
          <div class="section-title">Lead Information</div>
          <div class="detail-row">
            <div class="detail-label">Form ID:</div>
            <div class="detail-value">${data.formId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Submission Date:</div>
            <div class="detail-value">${new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div class="detail-value">${data.firstName} ${data.lastName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value">${data.emailAddress}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div class="detail-value">${data.phoneNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Landline:</div>
            <div class="detail-value">${
              data.landlineNumber || "Not provided"
            }</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Address Information</div>
          <div class="detail-row">
            <div class="detail-label">Address:</div>
            <div class="detail-value">${data.address}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">City:</div>
            <div class="detail-value">${data.city}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">State:</div>
            <div class="detail-value">${data.state}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Zip Code:</div>
            <div class="detail-value">${data.zipCode}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Additional Information</div>
          <div class="detail-row">
            <div class="detail-label">Preferred Contact Time:</div>
            <div class="detail-value">${
              data.prefferedContactTime || "Not specified"
            }</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated message from the Central Trademark Revival® system.</p>
          <p>© ${new Date().getFullYear()} Central Trademark Revival®. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await SendEmail({
    to: process.env.EMAIL_USER || "info@centraltrademarkrevival.com",
    subject,
    html,
  });
};

export const SendStep2CompletionEmail = async (
  step1Data: TrademarkRevivalStep01FormType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step2Data: any,
  logoUrl?: string
): Promise<boolean> => {
  const subject = `Trademark Revival Step 2 Completed: ${step1Data.firstName} ${step1Data.lastName} (${step1Data.formId})`;

  const formatDate = (date: Date | undefined | null) => {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  let protectionDetails = "";
  switch (step2Data.protectionType) {
    case "name":
      protectionDetails = `
        <div class="detail-row">
          <div class="detail-label">Name to Protect:</div>
          <div class="detail-value">${
            step2Data.protectionName || "Not provided"
          }</div>
        </div>
      `;
      break;
    case "logo":
      protectionDetails = `
        <div class="detail-row">
          <div class="detail-label">Logo Color Scheme:</div>
          <div class="detail-value">${
            step2Data.protectionLogoColorScheme || "Not provided"
          }</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Logo Literal Elements:</div>
          <div class="detail-value">${
            step2Data.protectionLogoLiteralElements || "Not provided"
          }</div>
        </div>
        ${
          logoUrl
            ? `
        <div class="detail-row">
          <div class="detail-label">Logo Image:</div>
          <div class="detail-value"><a href="${logoUrl}" target="_blank">View uploaded logo</a></div>
        </div>
        `
            : ""
        }
      `;
      break;
    case "slogan":
      protectionDetails = `
        <div class="detail-row">
          <div class="detail-label">Slogan to Protect:</div>
          <div class="detail-value">${
            step2Data.protectionSlogan || "Not provided"
          }</div>
        </div>
      `;
      break;
    case "all":
      protectionDetails = `
        <div class="detail-row">
          <div class="detail-label">Name to Protect:</div>
          <div class="detail-value">${
            step2Data.protectionName || "Not provided"
          }</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Slogan to Protect:</div>
          <div class="detail-value">${
            step2Data.protectionSlogan || "Not provided"
          }</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Logo Color Scheme:</div>
          <div class="detail-value">${
            step2Data.protectionLogoColorScheme || "Not provided"
          }</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Logo Literal Elements:</div>
          <div class="detail-value">${
            step2Data.protectionLogoLiteralElements || "Not provided"
          }</div>
        </div>
        ${
          logoUrl
            ? `
        <div class="detail-row">
          <div class="detail-label">Logo Image:</div>
          <div class="detail-value"><a href="${logoUrl}" target="_blank">View uploaded logo</a></div>
        </div>
        `
            : ""
        }
      `;
      break;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Trademark Revival Step 2 Completed</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .email-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 15px;
        }
        h1 {
          color: #164268;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          width: 180px;
          color: #555;
        }
        .detail-value {
          flex: 1;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png" alt="Central Trademark Revival" class="logo">
          <h1>Trademark Revival Step 2 Completed</h1>
        </div>
        
        <div class="section">
          <div class="section-title">Application Information</div>
          <div class="detail-row">
            <div class="detail-label">Form ID:</div>
            <div class="detail-value">${step1Data.formId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Applicant:</div>
            <div class="detail-value">${step1Data.firstName} ${
    step1Data.lastName
  }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value">${step1Data.emailAddress}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Update Date:</div>
            <div class="detail-value">${new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Protection Information</div>
          <div class="detail-row">
            <div class="detail-label">Protection Type:</div>
            <div class="detail-value">${
              step2Data.protectionType.charAt(0).toUpperCase() +
              step2Data.protectionType.slice(1)
            }</div>
          </div>
          ${protectionDetails}
        </div>

        <div class="section">
          <div class="section-title">Trademark Usage</div>
          <div class="detail-row">
            <div class="detail-label">Currently In Use:</div>
            <div class="detail-value">${
              step2Data.isTrademarkInUse ? "Yes" : "No"
            }</div>
          </div>
          ${
            step2Data.isTrademarkInUse
              ? `
          <div class="detail-row">
            <div class="detail-label">First Use Date:</div>
            <div class="detail-value">${formatDate(
              step2Data.trademarkFirstUseDate
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">First Use In Commerce:</div>
            <div class="detail-value">${formatDate(
              step2Data.trademarkFirstUseInCommerceDate
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Ownership Details:</div>
            <div class="detail-value">${
              step2Data.trademarkInUseOwnershipDetails || "Not provided"
            }</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">Ownership Information</div>
          <div class="detail-row">
            <div class="detail-label">Individually Owned:</div>
            <div class="detail-value">${
              step2Data.isIndividuallyOwnedTrademark ? "Yes" : "No"
            }</div>
          </div>
          ${
            !step2Data.isIndividuallyOwnedTrademark
              ? `
          <div class="detail-row">
            <div class="detail-label">US-Based Organization:</div>
            <div class="detail-value">${
              step2Data.isUSBasedOrganization ? "Yes" : "No"
            }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Organization Name:</div>
            <div class="detail-value">${
              step2Data.organizationName || "Not provided"
            }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Organization Type:</div>
            <div class="detail-value">${
              step2Data.organizationType || "Not provided"
            }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${
              step2Data.isUSBasedOrganization
                ? "Formation State:"
                : "Formation Country:"
            }</div>
            <div class="detail-value">${
              step2Data.isUSBasedOrganization
                ? step2Data.organizationFormationState || "Not provided"
                : step2Data.organizationFormationCountry || "Not provided"
            }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Position Held:</div>
            <div class="detail-value">${
              step2Data.organizationPosition || "Not provided"
            }</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">Business Classification</div>
          <div class="detail-row" style="display: block;">
            <div style="white-space: pre-wrap;">${
              step2Data.businessClassification || "Not provided"
            }</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated message from the Central Trademark Revival® system.</p>
          <p>© ${new Date().getFullYear()} Central Trademark Revival®. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await SendEmail({
    to: process.env.EMAIL_USER || "info@centraltrademarkrevival.com",
    subject,
    html,
  });
};

export const SendPaymentPendingEmail = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any,
  packageType: string,
  packageAmount: number
): Promise<boolean> => {
  const subject = `Payment Pending: ${formData.step01Data.firstName} ${formData.step01Data.lastName} (${formData.formId})`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Trademark Revival Payment Pending</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .email-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 15px;
        }
        h1 {
          color: #164268;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          width: 180px;
          color: #555;
        }
        .detail-value {
          flex: 1;
        }
        .package-info {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-top: 10px;
        }
        .price {
          font-size: 24px;
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        .highlight {
          background-color: #fffde7;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #ffd600;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png" alt="Central Trademark Revival" class="logo">
          <h1>Trademark Revival Payment Pending</h1>
        </div>
        
        <div class="highlight">
          <strong>Important:</strong> A customer has completed all application steps and is now at the payment checkout page.
        </div>
        
        <div class="section">
          <div class="section-title">Application Information</div>
          <div class="detail-row">
            <div class="detail-label">Form ID:</div>
            <div class="detail-value">${formData.formId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Applicant:</div>
            <div class="detail-value">${formData.step01Data.firstName} ${
    formData.step01Data.lastName
  }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value">${formData.step01Data.emailAddress}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div class="detail-value">${formData.step01Data.phoneNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Date:</div>
            <div class="detail-value">${new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Selected Package</div>
          <div class="package-info">
            <div class="price">$${packageAmount}.00</div>
            <div class="detail-row">
              <div class="detail-label">Package Type:</div>
              <div class="detail-value">${packageType}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Protection Type:</div>
              <div class="detail-value">${
                formData.step02Data.protectionType.charAt(0).toUpperCase() +
                formData.step02Data.protectionType.slice(1)
              }</div>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated message from the Central Trademark Revival® system.</p>
          <p>© ${new Date().getFullYear()} Central Trademark Revival®. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await SendEmail({
    to: process.env.EMAIL_USER || "info@centraltrademarkrevival.com",
    subject,
    html,
  });
};

export const SendPaymentConfirmationEmails = async (
  invoiceData: InvoiceState,
  customerData: TrademarkRevivalStep01FormType,
  pdfBase64: string
): Promise<boolean> => {
  const adminSubject = `Payment Received: ${customerData.firstName} ${customerData.lastName} (${invoiceData.referenceNumber})`;
  const customerSubject = `Your Trademark Revival Payment Receipt (${invoiceData.referenceNumber})`;

  const pdfAttachment = {
    filename: `invoice-${invoiceData.referenceNumber}.pdf`,
    content: pdfBase64.split("base64,")[1],
    contentType: "application/pdf",
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr?: string | null) => {
    if (!timeStr) return "";
    return new Date(timeStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Received</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .email-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 15px;
        }
        h1 {
          color: #164268;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          width: 180px;
          color: #555;
        }
        .detail-value {
          flex: 1;
        }
        .package-info {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
        }
        .price {
          font-size: 24px;
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
        }
        .success-banner {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 15px;
          border-radius: 5px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 18px;
          border-left: 4px solid #2e7d32;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png" alt="Central Trademark Revival" class="logo">
          <h1>Payment Received</h1>
        </div>
        
        <div class="success-banner">
          Payment Successfully Processed
        </div>
        
        <div class="section">
          <div class="section-title">Payment Information</div>
          <div class="detail-row">
            <div class="detail-label">Reference Number:</div>
            <div class="detail-value">${invoiceData.referenceNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Invoice ID:</div>
            <div class="detail-value">${invoiceData.invoiceId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Payment Date:</div>
            <div class="detail-value">${formatDate(invoiceData.date)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Payment Time:</div>
            <div class="detail-value">${formatTime(
              invoiceData.paymentTime
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Payment Method:</div>
            <div class="detail-value">${
              invoiceData.paymentMethod || "PayPal"
            }</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div class="detail-value">${customerData.firstName} ${
    customerData.lastName
  }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value">${customerData.emailAddress}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div class="detail-value">${customerData.phoneNumber}</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Package Details</div>
          <div class="package-info">
            <div class="price">${invoiceData.totalAmount?.toFixed(2)}</div>
            <div class="detail-row">
              <div class="detail-label">Package Type:</div>
              <div class="detail-value">${invoiceData.packageType}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Package Price:</div>
              <div class="detail-value">${invoiceData.packageAmount?.toFixed(
                2
              )}</div>
            </div>
            ${
              invoiceData.items.length > 0
                ? `
            <div class="detail-row">
              <div class="detail-label">Additional Items:</div>
              <div class="detail-value">
                ${invoiceData.items
                  .map(
                    (item) => `${item.description}: ${item.amount.toFixed(2)}`
                  )
                  .join("<br>")}
              </div>
            </div>
            `
                : ""
            }
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated message from the Central Trademark Revival® system.</p>
          <p>© ${new Date().getFullYear()} Central Trademark Revival®. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Trademark Revival Payment Receipt</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .email-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 15px;
        }
        h1 {
          color: #164268;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          width: 180px;
          color: #555;
        }
        .detail-value {
          flex: 1;
        }
        .package-info {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
        }
        .price {
          font-size: 24px;
          font-weight: bold;
          color: #164268;
          margin-bottom: 10px;
        }
        .success-banner {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 15px;
          border-radius: 5px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 18px;
          border-left: 4px solid #2e7d32;
        }
        .next-steps {
          background-color: #e3f2fd;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
          border-left: 4px solid #1976d2;
        }
        .next-steps-title {
          font-weight: bold;
          color: #1976d2;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        .contact-info {
          text-align: center;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png" alt="Central Trademark Revival" class="logo">
          <h1>Your Trademark Revival Payment Receipt</h1>
        </div>
        
        <div class="success-banner">
          Payment Successfully Processed
        </div>
        
        <div class="section">
          <div class="section-title">Dear ${customerData.firstName},</div>
          <p>Thank you for your payment. We're pleased to confirm that your trademark revival application has been received and is now being processed. Your attached receipt contains all the details of your transaction.</p>
        </div>
        
        <div class="section">
          <div class="section-title">Receipt Information</div>
          <div class="detail-row">
            <div class="detail-label">Reference Number:</div>
            <div class="detail-value">${invoiceData.referenceNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Payment Date:</div>
            <div class="detail-value">${formatDate(invoiceData.date)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Payment Method:</div>
            <div class="detail-value">${
              invoiceData.paymentMethod || "PayPal"
            }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Package:</div>
            <div class="detail-value">${invoiceData.packageType}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Total Amount:</div>
            <div class="detail-value">${invoiceData.totalAmount?.toFixed(
              2
            )}</div>
          </div>
        </div>
        
        <div class="next-steps">
          <div class="next-steps-title">What Happens Next?</div>
          <p>Our trademark specialists will begin processing your application immediately. Here's what to expect:</p>
          <ol>
            <li>Within 24-48 hours, a specialist will review your application and reach out if any additional information is needed.</li>
            <li>Our team will conduct the comprehensive trademark search as specified in your package.</li>
            <li>You will receive regular updates on the progress of your application via email.</li>
          </ol>
        </div>
        
        <div class="contact-info">
          <p>If you have any questions, please contact our support team:</p>
          <p><strong>Email:</strong> ${
            process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
            "info@centraltrademarkrevival.com"
          }</p>
          <p>Please include your reference number (${
            invoiceData.referenceNumber
          }) in all communications.</p>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing Central Trademark Revival®.</p>
          <p>© ${new Date().getFullYear()} Central Trademark Revival®. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const adminEmailSent = await SendEmail({
    to: process.env.EMAIL_USER || "info@centraltrademarkrevival.com",
    subject: adminSubject,
    html: adminHtml,
    attachments: [pdfAttachment],
  });

  const customerEmailSent = await SendEmail({
    to: customerData.emailAddress,
    subject: customerSubject,
    html: customerHtml,
    attachments: [pdfAttachment],
  });

  return adminEmailSent && customerEmailSent;
};
