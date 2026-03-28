import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { PendingOrder } from "../lib/interfaces";
import { convertNairaToDollar } from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "+16822528501";

const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    n,
  );

const PaymentStatus: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [order, setOrder] = useState<PendingOrder | null>(() => {
    const raw = sessionStorage.getItem("pendingOrder");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [showUSD, setShowUSD] = useState(true);

  useEffect(() => {
    if (!order) {
      sessionStorage.removeItem("pendingOrder");
      navigate("/purchase-product");
    }
  }, [navigate, order]);

  const statusUI = useMemo(() => {
    if (!order) return { title: "Loading...", hint: "" };

    if (order.status === "verified") {
      return {
        title: "Payment Verified",
        hint: "Your payment has been confirmed. We will proceed with processing your order.",
      };
    }

    return {
      title: "Payment Pending",
      hint: "Your receipt has been uploaded successfully. We are currently verifying your payment. This usually takes 5-15 minutes.",
    };
  }, [order]);

  const buildWhatsAppLink = () => {
    if (!order) return "#";

    const dt = new Date(order.dateISO);
    const dateText = dt.toLocaleString();

    const text =
      `Payment Receipt Submission\n\n` +
      `Order ID: ${order.orderId}\n` +
      `Product: ${order.productName}\n` +
      `Quantity: ${order.qty}\n` +
      `Amount: ${showUSD ? `$${convertNairaToDollar(order.amount)}` : naira(order.amount)}\n` +
      `Name: ${order.fullName}\n` +
      `Address: ${order.address}\n` +
      `Date: ${dateText}\n\n` +
      `Receipt: ${receiptFile?.name || order.receiptFileName || "Attached"}\n\n` +
      `Hello, I am following up on my payment. Please verify my receipt.\n` +
      `Note: I will attach the receipt image/PDF in this chat.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handlePickReceipt = () => {
    fileRef.current?.click();
  };

  const handleSaveReceiptName = (fileName: string) => {
    if (!order) return;

    const updated: PendingOrder = {
      ...order,
      receiptFileName: fileName,
      status: "pending",
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(updated));
    setOrder(updated);
  };

  const handleResetOrder = () => {
    sessionStorage.removeItem("pendingOrder");
    toast.success("Order cleared.");
    navigate("/purchase-product");
  };

  if (!order) return null;

  const dt = new Date(order.dateISO);
  const dateText = dt.toLocaleString();

  return (
    <div className="flex flex-col gap-10 lg:gap-14 pb-20 bg-neutral-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary to-primary/80 flex items-center justify-center py-16 text-center lg:py-24 shadow-inner">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 px-6 md:gap-5">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl drop-shadow-md tracking-tight">
            Order Status
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg font-medium drop-shadow-sm">
            Review your precise payment status and forward your verification
            receipt straight to our support team.
          </p>
        </div>
      </section>

      <div className="app-container w-full max-w-2xl flex flex-col gap-8">
        {/* Status Card */}
        <div className="rounded-xl border border-primary/10 bg-white p-8 sm:p-10 shadow-xl shadow-primary/5 text-center flex flex-col items-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-neutral-800 tracking-tight mb-3">
            {statusUI.title}
          </h2>
          <p className="text-sm font-medium text-neutral-500 leading-relaxed mx-auto">
            {statusUI.hint}
          </p>
          <div className="mt-5 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-neutral-100 text-[11px] font-bold tracking-widest uppercase text-neutral-400">
            Ref: {order.orderId}-CONF
          </div>
        </div>

        {/* Order Details Card */}
        <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5">
          <div className="flex items-center justify-between border-b border-primary/10 pb-5 mb-5 relative">
            <h3 className="text-[13px] font-bold uppercase tracking-widest text-neutral-400">
              Transaction Summary
            </h3>
            <div className="inline-flex rounded-xl bg-neutral-100 p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowUSD(true)}
                className={`rounded-xl px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all ${
                  showUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-neutral-500 hover:bg-white"
                }`}
              >
                USD
              </button>
              <button
                type="button"
                onClick={() => setShowUSD(false)}
                className={`rounded-xl px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all ${
                  !showUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-neutral-500 hover:bg-white"
                }`}
              >
                NGN
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between gap-3 bg-neutral-50 p-4 rounded-xl border border-primary/5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Order Ref
              </span>
              <span className="font-black text-neutral-800 tracking-wide text-base">
                {order.orderId}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 bg-neutral-50 p-4 rounded-xl border border-primary/5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Date
              </span>
              <span className="font-bold text-neutral-800 text-right">
                {dateText}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 bg-neutral-50 p-4 rounded-xl border border-primary/5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Product
              </span>
              <span className="font-bold text-neutral-800 text-right">
                {order.productName}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Final Amount
              </span>
              <div className="text-right">
                <p className="font-black text-primary text-lg">
                  {showUSD
                    ? `$${convertNairaToDollar(order.amount)}`
                    : naira(order.amount)}
                </p>
                <p className="text-[11px] font-bold text-neutral-400 mt-0.5">
                  {showUSD
                    ? naira(order.amount)
                    : `$${convertNairaToDollar(order.amount)}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5">
          <h3 className="text-[13px] font-bold uppercase tracking-widest text-neutral-400 mb-5 border-b border-primary/10 pb-4">
            Receipt & Verification
          </h3>

          <div className="flex flex-col gap-4">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setReceiptFile(file);
                if (file) {
                  handleSaveReceiptName(file.name);
                  toast.success(`Receipt selected: ${file.name}`);
                }
              }}
            />

            <button
              type="button"
              onClick={handlePickReceipt}
              className="w-full rounded-xl border border-dashed border-primary/40 bg-neutral-50 px-5 py-4 text-sm font-bold tracking-wide text-primary hover:bg-primary/5 transition"
            >
              {receiptFile || order.receiptFileName
                ? "Change Uploaded Receipt"
                : "Attach Proof of Payment"}
            </button>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-5 text-sm uppercase tracking-widest font-black text-white hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              <FaWhatsapp className="text-lg" /> Forward payment details
            </a>
          </div>

          <p className="mt-5 text-[12px] text-neutral-400 font-medium text-center leading-relaxed">
            Attach your receipt image here, and then drop it directly into the
            WhatsApp chat window to finalize validation.
          </p>

          <div className="mt-6 pt-6 border-t border-primary/10">
            <button
              type="button"
              onClick={handleResetOrder}
              className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 text-xs font-bold tracking-widest uppercase text-neutral-500 hover:bg-neutral-50 transition shadow-sm"
            >
              Start New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
