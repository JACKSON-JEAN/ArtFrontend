import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLIENT_PAYMENT_REPORT } from "../../graphql/payments";
import { getUserEmail, getUsername } from "../../utils/decodeToken";

interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}

interface PaymentStatus {
  transactionId: string;
  orderId: number;
  payment_method: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  items: PaymentItem[];
  customerName?: string;
  customerEmail?: string;
}

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const trackingId = new URLSearchParams(location.search).get("session_id");

  const { loading, error, data } = useQuery(GET_CLIENT_PAYMENT_REPORT, {
    skip: !trackingId,
    variables: { trackingId },
  });

  const clientName = getUsername();
  const clientEmail = getUserEmail();

  // -------------------------------
  // GOOGLE ADS CONVERSION TRACKING
  // -------------------------------
  useEffect(() => {
    const report = data?.getClientPaymentReport;
    if (!report) return;

    window.gtag?.("event", "conversion", {
      send_to: "AW-1037563441/LvKfCP2W4sEbELHs3-4D",
      value: report.amount,
      currency: report.currency,
      transaction_id: report.transactionId || "",
    });
  }, [data]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">{error.message}</p>
      </div>
    );

  const report = data?.getClientPaymentReport;
  if (!report)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>No payment report found.</p>
      </div>
    );

  const paymentStatus: PaymentStatus = {
    transactionId: report.transactionId,
    orderId: report.order?.id || 0,
    payment_method: report.paymentMethod,
    amount: report.amount,
    currency: report.currency,
    status: report.status,
    date: dayjs(report.createdAt).format("YYYY-MM-DD HH:mm"),
    customerName: clientName,
    customerEmail: clientEmail,
    items:
      report.order?.items.map((item: any) => ({
        name: item.artwork.title,
        quantity: item.quantity,
        price: item.price,
      })) || [],
  };

  const totalAmount = paymentStatus.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // -------------------------------
  // PDF RECEIPT
  // -------------------------------
  const downloadReceipt = () => {
    const doc = new jsPDF();
    const startX = 15;
    const qtyX = 120;
    const priceX = 195;

    const clientName = paymentStatus.customerName
      ? paymentStatus.customerName
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "N/A";

    const paymentMethod = paymentStatus.payment_method
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const clientEmail = paymentStatus.customerEmail
      ? paymentStatus.customerEmail.toLowerCase()
      : "N/A";

    // Header
    doc.setFontSize(18);
    doc.text("PEARL ART GALLERIES, LLC", 105, 15, { align: "center" });

    doc.setFontSize(11);
    doc.text("Email: pearlartgalleries@gmail.com", 105, 22, {
      align: "center",
    });
    doc.text("Phone: +256 776 286 453", 105, 27, { align: "center" });

    doc.line(15, 35, 195, 35);

    // Transaction Info
    let y = 45;
    doc.text(`Customer: ${clientName}`, 15, y);
    y += 7;
    doc.text(`Email: ${clientEmail}`, 15, y);
    y += 10;

    doc.text(`Transaction ID: ${paymentStatus.transactionId}`, 15, y);
    y += 7;
    doc.text(`Order ID: ${paymentStatus.orderId}`, 15, y);
    y += 7;

    doc.text(`Payment Method: ${paymentMethod}`, 15, y);
    y += 7;
    doc.text(
      `Date: ${new Date().toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`,
      15,
      y
    );
    y += 12;

    // Order Items Header
    doc.setFont("helvetica", "bold");
    doc.text("Order Items", 15, y);
    doc.setFont("helvetica", "normal");
    y += 3;
    doc.line(startX, y, priceX, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("#", startX, y);
    doc.text("Item", startX + 10, y);
    doc.text("Qty", qtyX, y);
    doc.text("Amount", priceX, y, { align: "right" });
    y += 5;
    doc.line(startX, y, priceX, y);
    y += 6;

    // Order Items Content
    doc.setTextColor(0);
    doc.setFontSize(11);

    paymentStatus.items.forEach((item, index) => {
      const title = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      const lineTotal = (item.price * item.quantity).toFixed(2);

      doc.text(String(index + 1), startX, y);
      doc.text(title, startX + 10, y);
      doc.text(String(item.quantity), qtyX, y);
      doc.text(`${paymentStatus.currency} ${lineTotal}`, priceX, y, {
        align: "right",
      });
      y += 7;
    });

    // Total
    // const totalAmount = paymentStatus.items.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // );

    // const totalAmount = paymentStatus.items.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // );
    y += 4;
    doc.line(startX, y, priceX, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", qtyX, y);
    doc.text(`${paymentStatus.currency} ${totalAmount.toFixed(2)}`, priceX, y, {
      align: "right",
    });
    doc.setFont("helvetica", "normal");
    y += 15;

    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = 180; // text width for wrapping
    const lineHeight = 5; // vertical space per line
    const sectionGap = 1; // consistent gap between sections

    // Add new page if necessary
    if (y > pageHeight - 90) {
      doc.addPage();
      y = 20;
    }

    // -------------------------------
    // SHIPPING INFORMATION
    // -------------------------------
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Shipping Information", startX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60);
    y += 4;

    const shippingText =
      "Thanks for your order!\nWe will ship your art in a secure poster tube within 72 hours via DHL. After your order has been shipped we will forward you the tracking information.";
    const shippingLines = doc.splitTextToSize(shippingText, contentWidth);
    doc.text(shippingLines, startX, y);
    y += shippingLines.length * lineHeight + sectionGap;

    // -------------------------------
    // FRAMING SUGGESTION
    // -------------------------------
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Framing Suggestion", startX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60);
    y += 4;

    const framingText =
      "Obviously, a nice frame will enhance your art. Discuss with your local frame shop, but we suggest adding a backing to the art. It keeps everything flat and stable so your piece doesn’t warp, bend, or shift over time… especially for larger works or anything on thinner paper. It should not be an extra expense and make sure they use acid-free backing.";
    const framingLines = doc.splitTextToSize(framingText, contentWidth);
    doc.text(framingLines, startX, y);
    y += framingLines.length * lineHeight + sectionGap;

    // -------------------------------
    // CONTACT INFO
    // -------------------------------
    const contactText =
      "If you have any questions you can reach out to us at:\nEmail: pearlartgalleries@gmail.com\nCall us on WhatsApp: +256 776 286 453";
    const contactLines = doc.splitTextToSize(contactText, contentWidth);
    doc.text(contactLines, startX, y);
    y += contactLines.length * lineHeight;

    // Footer

    const footerY = pageHeight - 20;
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Thank you for your purchase.", 105, footerY, { align: "center" });
    doc.text(
      "For questions or support, contact: pearlartgalleries@gmail.com",
      105,
      footerY + 5,
      { align: "center" }
    );
    doc.setTextColor(0);
    doc.setFontSize(11);

    // Save PDF
    doc.save(`Receipt_${paymentStatus.transactionId}.pdf`);
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-md shadow-sm border p-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-7 w-7 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <Link to="/" className="text-xl font-semibold text-red-950 block mb-2">
          Pearl Art Galleries
        </Link>

        <h1 className="text-xl font-semibold text-green-600 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 text-sm mb-4">
          Thank you for your purchase. Your payment has been received
          successfully.
        </p>

        <div className="bg-gray-100 rounded-sm p-4 text-left text-sm mb-4">
          <p>
            <strong>Amount:</strong> {paymentStatus.currency}{" "}
            {paymentStatus.amount.toFixed(2)}
          </p>
          <p>
            <strong>Paid by:</strong> {paymentStatus.customerName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {paymentStatus.customerEmail || "N/A"}
          </p>
          <p>
            <strong>Transaction ID:</strong> {paymentStatus.transactionId}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={downloadReceipt}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-sm font-medium"
          >
            Download Receipt
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-sm font-medium"
          >
            Go Back Home
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Need help? Contact pearlartgalleries@gmail.com
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
