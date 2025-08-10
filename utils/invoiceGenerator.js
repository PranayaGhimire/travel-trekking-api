import PDFDocument from "pdfkit";
import fs from 'fs';
import path from "path";

export const generateInvoice = async (booking,user,packageData) => {
    return new Promise((resolve,reject) => {
        try {
            const invoicePath = path.join(__dirname,`../invoices/invoice_${booking._id}.pdf`);
            const doc = new PDFDocument({margin:50});

            const writeStream = fs.createWriteStream(invoicePath);
            doc.pipe(writeStream);

            // Header
            doc.fontSize(20).text('Travel & Trekking Invoice',{align:'center'});
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
            doc.text(`Package: ${packageData.name}`);
            doc.text(`Amount Paid: Rs ${booking.amount}`);
            doc.moveDown();

            // Footer
            doc.text('Thank you for booking with us!',{align:'center'});
            
            doc.end();

            writeStream.on('finish',() => resolve(invoicePath));
        } catch (error) {
            reject(error);
        }
    })
}