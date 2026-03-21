import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { PendingOrder } from "../lib/interfaces";
import { convertNairaToDollar } from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "+1 317 531 3547";

const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    n,
  );

const PaymentStatus: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [showUSD, setShowUSD] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("pendingOrder");
    if (!raw) {
      navigate("/purchase-product");
      return;
    }
    try {
      const parsed: PendingOrder = JSON.parse(raw);
      setOrder(parsed);
    } catch {
      sessionStorage.removeItem("pendingOrder");
      navigate("/purchase-product");
    }
  }, [navigate]);

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
    <section className="app-container w-full">
      <div className="mx-auto w-full max-w-xl mt-13">
        <div className="p-0">
          <div className="mx-auto mt-5 flex max-w-3xl flex-col items-center gap-3 text-center">
            <h1 className="font-display text-xl font-extrabold text-tetiary sm:text-2xl">
              Payment Update
            </h1>
            <p className="text-sm leading-7 text-neutral-soft">
              Review your current payment status, confirm your order details,
              and continue on WhatsApp if you still need to share your receipt.
            </p>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-secondary-dark/60 bg-[#fff7f8] p-5 text-center sm:p-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_28px_-18px_rgba(231,0,11,0.9)]">
              OK
            </div>

            <h1 className="mt-4 font-display text-2xl font-extrabold text-tetiary">
              {statusUI.title}
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-neutral-soft">
              {statusUI.hint}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-secondary-dark/70 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                Order Summary
              </p>
              <div className="inline-flex rounded-full border border-secondary-dark/70 bg-secondary/20 p-1">
                <button
                  type="button"
                  onClick={() => setShowUSD(true)}
                  className={[
                    "rounded-full px-3 py-1 text-[11px] font-bold uppercase transition",
                    showUSD ? "bg-primary text-white" : "text-neutral-soft",
                  ].join(" ")}
                >
                  USD
                </button>
                <button
                  type="button"
                  onClick={() => setShowUSD(false)}
                  className={[
                    "rounded-full px-3 py-1 text-[11px] font-bold uppercase transition",
                    !showUSD ? "bg-primary text-white" : "text-neutral-soft",
                  ].join(" ")}
                >
                  NGN
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Order ID</span>
                <span className="font-bold text-tetiary">{order.orderId}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Product</span>
                <span className="font-bold text-tetiary">
                  {order.productName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Amount</span>
                <div className="text-right">
                  <p className="font-bold text-tetiary">
                    {showUSD
                      ? `$${convertNairaToDollar(order.amount)}`
                      : naira(order.amount)}
                  </p>
                  <p className="text-[11px] text-neutral-soft">
                    {showUSD
                      ? naira(order.amount)
                      : `$${convertNairaToDollar(order.amount)}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-soft">Date</span>
                <span className="font-bold text-tetiary">{dateText}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
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
              className="w-full rounded-xl border border-secondary-dark/70 bg-white px-5 py-3 text-sm font-bold text-tetiary hover:bg-secondary/30 transition"
            >
              {receiptFile || order.receiptFileName
                ? "Change Receipt"
                : "Upload Receipt"}
            </button>

            <p className="mt-2 text-[11px] text-neutral-soft text-center">
              You will select the receipt here, then attach it in WhatsApp.
            </p>
          </div>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-black/10 hover:brightness-110 transition"
          >
            <FaWhatsapp className="text-lg" />
            Share Receipt via WhatsApp
          </a>

          <div className="mt-6">
            <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft text-center">
              Other options
            </p>

            <div className="mt-3">
              <button
                type="button"
                onClick={handleResetOrder}
                className="inline-flex items-center justify-center rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-xs font-bold text-tetiary hover:bg-secondary/30 transition w-full"
              >
                Start New Order
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="mt-1 text-[11px] text-neutral-soft">
              Transaction Ref:{" "}
              <span className="font-semibold">{order.orderId}-CONF</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;
