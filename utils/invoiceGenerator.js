import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES MODULE FIX
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateInvoice = async (booking, user, packageData) => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure invoices folder exists
      const invoiceDir = path.join(__dirname, "../invoices");
      if (!fs.existsSync(invoiceDir)) {
        fs.mkdirSync(invoiceDir);
      }

      const invoicePath = path.join(
        invoiceDir,
        `invoice_${booking._id}.pdf`
      );

      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(invoicePath);
      doc.pipe(writeStream);

      // Header
      doc.fontSize(20).text("Travel & Trekking Invoice", { align: "center" });
      doc.moveDown();

      // Booking Details
      doc.fontSize(14).text(`Invoice ID: ${booking._id}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      // User Info
      doc.text(`Customer: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.moveDown();

      // Package Info
      doc.text(`Package: ${packageData.title || packageData.name}`);
      doc.text(`Amount Paid: Rs ${booking.amount}`);
      doc.moveDown();

      // Footer
      doc.text("Thank you for booking with us!", { align: "center" });

      doc.end();

      writeStream.on("finish", () => resolve(invoicePath));
      writeStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
