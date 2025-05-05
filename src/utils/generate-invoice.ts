"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { InvoiceState } from "@/states/store-states";

import { TrademarkRevivalStep01FormType } from "@/types/forms-type";

import { BlobToBase64 } from "./blob-base";
import { FormatCurrency } from "./format-currency";

export const GenerateInvoice = async (
  invoice: InvoiceState,
  customerData: TrademarkRevivalStep01FormType
): Promise<string> => {
  const doc = new jsPDF();
  (doc as any).autoTable = autoTable;

  try {
    const logoResponse = await fetch(
      "https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png"
    );
    const logoBlob = await logoResponse.blob();
    const logoBase64 = await BlobToBase64(logoBlob);

    const desiredWidth = 50;
    const aspectRatio = 408 / 834;
    const calculatedHeight = desiredWidth * aspectRatio;

    doc.addImage(logoBase64, "PNG", 20, 10, desiredWidth, calculatedHeight);
  } catch (error) {
    console.error("Error adding logo to PDF:", error);
  }

  // DOCUMENT STYLING VARIABLE
  const secondaryColor = [51, 51, 51];

  // HEADER SECTION
  doc.setFontSize(24);
  doc.setTextColor(22, 22, 22);
  doc.text("RECEIPT", 105, 45, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(`Reference Number: ${invoice.referenceNumber || "N/A"}`, 105, 52, {
    align: "center",
  });

  // SEPRATOR LINE
  doc.setDrawColor(221, 221, 221);
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);

  // FORMATE DATES
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };
  const formatTime = (timeStr?: string | null) => {
    if (!timeStr) return "N/A";
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // CUSTOMER AND PAYMENT INFO SECTION
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);

  // LEFT COLUMN - CUSTOMER INFORMATION
  doc.setFontSize(14);
  doc.setTextColor(22, 22, 22);
  doc.text("Customer Information", 20, 70);

  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(`${customerData.firstName} ${customerData.lastName}`, 20, 78);
  doc.text(customerData.address, 20, 84);
  doc.text(
    `${customerData.city}, ${customerData.state} ${customerData.zipCode}`,
    20,
    90
  );
  doc.text(`Email: ${customerData.emailAddress}`, 20, 96);
  doc.text(`Phone: ${customerData.phoneNumber}`, 20, 102);

  // RIGHT COLUMN - PAYMENT INFORMATION
  doc.setFontSize(14);
  doc.setTextColor(22, 22, 22);
  doc.text("Payment Information", 120, 70);

  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(`Date: ${formatDate(invoice.date)}`, 120, 78);
  doc.text(`Time: ${formatTime(invoice.paymentTime)}`, 120, 84);
  doc.text(`Method: ${invoice.paymentMethod || "PayPal"}`, 120, 90);
  doc.text(`Form ID: ${invoice.formId || "N/A"}`, 120, 96);

  // PAID WATERMARK
  doc.setFontSize(60);
  doc.setTextColor(0, 0, 0, 0.05); 
  doc.setFont("helvetica", "bold"); 
  doc.text("PAID", 160, 80, { angle: 45 });

  // RESET TEXT COLOR
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);

  // ITEMS TABLE
  const tableColumn = ["Item Description", "Amount"];
  const tableRows = [];

  tableRows.push([
    invoice.packageType || "Trademark Revival Package",
    FormatCurrency(invoice.packageAmount || 0),
  ]);

  if (invoice.items && invoice.items.length > 0) {
    invoice.items.forEach((item) => {
      tableRows.push([item.description, FormatCurrency(item.amount)]);
    });
  }

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 115,
    theme: "grid",
    headStyles: {
      fillColor: [22, 68, 104],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "left",
    },
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 5,
    },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" },
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
  });

  const finalY =
    (doc as any)?.lastAutoTable?.finalY != null
      ? (doc as any).lastAutoTable.finalY + 10
      : 125;

  // TOTAL SECTION
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", 130, finalY);
  doc.text(FormatCurrency(invoice.totalAmount || 0), 190, finalY, {
    align: "right",
  });

  // DECORATION LINE
  doc.setDrawColor(22, 68, 104);
  doc.setLineWidth(0.5);
  doc.line(130, finalY + 3, 190, finalY + 3);

  // THANKYOU NOTE
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    "Thank you for choosing Central Trademark Revival®",
    105,
    finalY + 20,
    { align: "center" }
  );

  // FOOTER
  const footerY = finalY + 35;

  // DECORATIVE LINE
  doc.setDrawColor(240, 240, 240);
  doc.setLineWidth(0.5);
  doc.line(20, footerY - 5, 190, footerY - 5);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "For questions or support, contact us at: info@centraltrademarkrevival.com",
    105,
    footerY,
    { align: "center" }
  );

  doc.text(
    `© ${new Date().getFullYear()} Central Trademark Revival®. All rights reserved.`,
    105,
    footerY + 5,
    { align: "center" }
  );

  return doc.output("datauristring");
};
