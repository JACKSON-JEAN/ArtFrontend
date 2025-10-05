import React from "react";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLIENT_PAYMENT_REPORT } from "../../graphql/payments";

// ----------------------------
// TypeScript Interfaces
// ----------------------------
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
}

// ----------------------------
// Component
// ----------------------------
const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trackingId = searchParams.get("trackingId");

  // Fetch payment report
  const { loading, error, data } = useQuery(GET_CLIENT_PAYMENT_REPORT, {
    skip: !trackingId,
    variables: { trackingId },
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );

  const report = data?.getClientPaymentReport;
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No payment report found.</p>
      </div>
    );
  }

  // Build PaymentStatus object dynamically
  const paymentStatus: PaymentStatus = {
    transactionId: report.id,
    orderId: report.order?.id || 0,
    payment_method: report.paymentMethod,
    amount: report.amount,
    currency: report.currency,
    status: report.status,
    date: dayjs(report.createdAt).format("YYYY-MM-DD HH:mm"),
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

  // ----------------------------
  // PDF Receipt Generation
  // ----------------------------

  const downloadReceipt = () => {
  const doc = new jsPDF("p", "mm", "a4");

  // Logo text (centered)
  doc.setFont("Playfair Display serif", "bold");
  doc.setFontSize(22);
  doc.setTextColor("#450a0a");
  doc.text("Pearl Art Galleries", 105, 20, { align: "center" });

  // Title
  doc.setFontSize(18);
  doc.setTextColor("#059669");
  doc.text("Payment Receipt", 105, 35, { align: "center" });

  // Separator line
  doc.setDrawColor(200);
  doc.setLineWidth(0.5);
  doc.line(15, 40, 195, 40);

  // ----------------------------
  // Styled Info Box (matches the HTML look)
  // ----------------------------
  const boxX = 15;          // left margin
  const boxY = 45;          // top position
  const boxWidth = 180;     // width of box
  const boxHeight = 50;     // height (adjusted for padding + 4 lines)
  const cornerRadius = 3;   // subtle rounded corners

  // Draw rounded box background
  doc.setFillColor("#f3f4f6"); // Tailwind gray-100
  doc.roundedRect(boxX, boxY, boxWidth, boxHeight, cornerRadius, cornerRadius, "F");

  // Text padding inside the box
  const paddingX = 8;
  const paddingY = 8;
  let textY = boxY + paddingY + 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor("#111827");

  // Line spacing between <p> elements
  const lineHeight = 8;

  doc.text(`Payment Method: ${paymentStatus.payment_method}`, boxX + paddingX, textY);
  textY += lineHeight;
  doc.text(
    `Amount Paid: ${paymentStatus.currency} ${paymentStatus.amount.toFixed(2)}`,
    boxX + paddingX,
    textY
  );
  textY += lineHeight;
  doc.text(`Status: ${paymentStatus.status}`, boxX + paddingX, textY);
  textY += lineHeight;
  doc.text(`Date: ${paymentStatus.date}`, boxX + paddingX, textY);

  // ----------------------------
  // Items Section
  // ----------------------------
  let startY = boxY + boxHeight + 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Order Items", 20, startY);
  startY += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Item", 20, startY);
  doc.text("Qty", 100, startY);
  doc.text("Price", 140, startY);
  startY += 4;

  doc.setDrawColor(180);
  doc.line(15, startY, 195, startY);
  startY += 6;

  doc.setFont("helvetica", "normal");
  paymentStatus.items.forEach((item) => {
    doc.text(item.name, 20, startY);
    doc.text(item.quantity.toString(), 100, startY);
    doc.text((item.price * item.quantity).toFixed(2), 140, startY);
    startY += 8;
  });

  // Total
  doc.setFont("helvetica", "bold");
  doc.text(
    `Total: ${paymentStatus.currency} ${totalAmount.toFixed(2)}`,
    140,
    startY + 4
  );

  // ----------------------------
  // Footer
  // ----------------------------
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#6b7280");
  doc.text("Thank you for your purchase at Pearl Art Galleries!", 105, 280, {
    align: "center",
  });

  doc.save(`receipt_${paymentStatus.transactionId}.pdf`);
};


  // ----------------------------
  // UI Render
  // ----------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-sm rounded-sm p-8 max-w-xl w-full">
        <p className="text-center mb-2 w-full">
          <Link
            to="/"
            className="text-2xl text-red-950 font-semibold font-logo whitespace-nowrap"
          >
            Pearl Art Galleries
          </Link>
        </p>

        <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
          Payment Successful!
        </h2>

        {/* Info Box */}
        <div className="bg-gray-100 px-4 py-2 rounded-sm mb-4">
          <p>
            <strong>Payment Method:</strong> {paymentStatus.payment_method}
          </p>
          <p>
            <strong>Amount Paid:</strong>{" "}
            {paymentStatus.currency} {paymentStatus.amount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {paymentStatus.status}
          </p>
          <p>
            <strong>Date:</strong> {paymentStatus.date}
          </p>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Order Items</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-0.5 px-3 border">Item</th>
                <th className="py-0.5 px-3 border">Quantity</th>
                <th className="py-0.5 px-3 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {paymentStatus.items.map((item, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="py-0.5 px-3 border">{item.name}</td>
                  <td className="py-0.5 px-3 border">{item.quantity}</td>
                  <td className="py-0.5 px-3 border">
                    {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td className="py-0.5 px-3 border font-bold" colSpan={2}>
                  Total
                </td>
                <td className="py-0.5 px-3 border font-bold">
                 {paymentStatus.currency} {totalAmount.toFixed(2)} 
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={downloadReceipt}
            className="bg-green-600 text-white whitespace-nowrap px-3 sm:px-6 py-1.5 rounded-sm hover:bg-green-700 transition"
          >
            Download Receipt
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white whitespace-nowrap px-3 sm:px-6 py-1.5 rounded-sm hover:bg-gray-700 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
