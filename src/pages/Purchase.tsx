import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import product from "../lib/productDetails";
import type { PendingOrder } from "../lib/interfaces";
import { useNavigate } from "react-router-dom";
import { convertNairaToDollar } from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "13175313547";

const BANK_DETAILS = {
  bankName: "ZELLE",
  accountName: "AFFLUENCE GLOBAL USA",
  accountNumber: "affluenceglobalusa@gmail.com",
  branch: "114 Kirk Rd Wilmington Delaware 19807",
};

const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    n,
  );

const makeOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const initialQty = useMemo(() => {
    const raw = sessionStorage.getItem("productCount");
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, []);

  const productName = product.name;
  const unitPrice = product.price;
  const [qty, setQty] = useState<number>(initialQty);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [showUSD, setShowUSD] = useState(true);

  const amount = useMemo(() => unitPrice * qty, [unitPrice, qty]);

  useEffect(() => {
    sessionStorage.setItem("productCount", String(qty));
  }, [qty]);

  useEffect(() => {
    const existing = sessionStorage.getItem("pendingOrder");
    if (existing) {
      try {
        const parsed: PendingOrder = JSON.parse(existing);
        setOrderId(parsed.orderId);
        setQty(parsed.qty || initialQty);
        setFullName(parsed.fullName || "");
        setAddress(parsed.address || "");
      } catch {
        setOrderId(makeOrderId());
      }
    } else {
      setOrderId(makeOrderId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildWhatsAppLink = (data: PendingOrder) => {
    const dt = new Date(data.dateISO);
    const dateText = dt.toLocaleString();

    const text =
      `Payment Receipt Submission\n\n` +
      `Order ID: ${data.orderId}\n` +
      `Product: ${data.productName}\n` +
      `Quantity: ${data.qty}\n` +
      `Amount: ${showUSD ? `$${convertNairaToDollar(data.amount)}` : naira(data.amount)}\n` +
      `Name: ${data.fullName}\n` +
      `Address: ${data.address}\n` +
      `Date: ${dateText}\n\n` +
      `Receipt: ${data.receiptFileName || "Attached"}\n\n` +
      `Hello, I've made payment. Please verify my receipt.\n` +
      `Note: I will attach the receipt image/PDF in this chat.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const savePendingOrder = (receiptName?: string) => {
    const data: PendingOrder = {
      orderId: orderId || makeOrderId(),
      productName,
      unitPrice,
      qty,
      amount,
      fullName,
      address,
      dateISO: new Date().toISOString(),
      status: "pending",
      receiptFileName: receiptName,
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(data));
    return data;
  };

  const handlePickReceipt = () => {
    fileRef.current?.click();
  };

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !address.trim()) {
      toast.error("Please fill your full name and delivery address.");
      return;
    }

    const data = savePendingOrder(receiptFile?.name);
    navigate("/payment-status");
    window.open(buildWhatsAppLink(data), "_blank");
    toast.success("Order saved. Please send your receipt on WhatsApp.");
  };

  return (
    <section className="app-container w-full">
      <div className="mx-auto w-full max-w-xl mt-13">
        <div className="p-0">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <h1 className="font-display text-xl font-extrabold text-tetiary sm:text-2xl">
              Complete Your Order
            </h1>
            <p className="text-sm leading-7 text-neutral-soft">
              Follow the steps below: confirm your package, make payment, then
              send your receipt on WhatsApp for verification.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-secondary-dark/70 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-tetiary">{productName}</p>
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
            <div className="flex flex-col gap-1">
              <p className="text-xs text-neutral-soft">
                Unit Price:{" "}
                <span className="font-semibold text-tetiary">
                  {showUSD
                    ? `$${convertNairaToDollar(unitPrice)}`
                    : naira(unitPrice)}
                </span>
              </p>
              <p className="text-xs text-neutral-soft">
                Alternate Price:{" "}
                <span className="font-semibold text-tetiary">
                  {showUSD
                    ? naira(unitPrice)
                    : `$${convertNairaToDollar(unitPrice)}`}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neutral-soft">
              Shipping Information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                  Full name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                  Delivery address
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State"
                  className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-secondary-dark/70 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-tetiary">Quantity</p>
                <p className="text-xs text-neutral-soft">
                  Adjust based on what you want to order
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-xl border border-secondary-dark/70 hover:bg-secondary/30 transition font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="w-10 text-center font-bold text-tetiary">
                  {qty}
                </div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-10 w-10 rounded-xl border border-secondary-dark/70 hover:bg-secondary/30 transition font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-primary/40 bg-primary/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-tetiary">
                Bank Transfer Details
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-primary/40 bg-white p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                    Bank name
                  </p>
                  <p className="mt-1 text-sm font-bold text-tetiary">
                    {BANK_DETAILS.bankName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                    Branch
                  </p>
                  <p className="mt-1 text-sm font-bold text-tetiary uppercase">
                    {BANK_DETAILS.branch}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                  Account name
                </p>
                <p className="mt-1 text-sm font-bold text-tetiary">
                  {BANK_DETAILS.accountName}
                </p>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3 rounded-xl border border-secondary-dark/70 bg-secondary/20 p-4">
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-soft">
                    Zelle Email
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-tetiary tracking-wide">
                    {BANK_DETAILS.accountNumber}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccountNumber}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-secondary-dark/70 bg-white px-4 py-2 text-xs font-bold text-tetiary hover:bg-secondary/30 transition"
                >
                  <HiOutlineClipboardCopy className="hidden lg:flex text-lg" />
                  Copy
                </button>
              </div>

              <p className="mt-4 text-xs text-neutral-soft">
                Please include your name in the transfer description.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-neutral-soft">
                Total Amount to Pay
              </p>
              <p className="mt-1 text-xs text-neutral-soft">
                {showUSD ? naira(amount) : `$${convertNairaToDollar(amount)}`}
              </p>
            </div>
            <p className="font-display text-xl font-extrabold text-primary">
              {showUSD ? `$${convertNairaToDollar(amount)}` : naira(amount)}
            </p>
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
                if (file) toast.success(`Receipt selected: ${file.name}`);
              }}
            />
            <button
              type="button"
              onClick={handlePickReceipt}
              className="w-full rounded-xl border border-secondary-dark/70 bg-white px-5 py-3 text-sm font-bold text-tetiary hover:bg-secondary/30 transition"
            >
              {receiptFile ? "Change Receipt" : "Upload Receipt"}
            </button>
            <p className="mt-2 text-xs text-neutral-soft">
              You'll upload/select the receipt here, then you'll attach it in
              WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-5 w-full rounded-4xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-black/10 hover:brightness-110 transition"
          >
            Submit & Continue on WhatsApp
          </button>
          <p className="mt-3 text-[11px] text-neutral-soft text-center">
            After sending your receipt, your order status will remain{" "}
            <b>Pending</b> until verification is completed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PurchasePage;
