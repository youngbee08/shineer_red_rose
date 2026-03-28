import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import product from "../lib/productDetails";
import type { PendingOrder } from "../lib/interfaces";
import { useNavigate } from "react-router-dom";
import {
  convertNairaToDollar,
  getAltPrice,
} from "../utilities/formatterUtility";

const WHATSAPP_NUMBER = "13175313547";

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
  const BANK_DETAILS = showUSD
    ? {
        bankName: "ZELLE",
        accountName: "AFFLUENCE GLOBAL USA",
        accountNumber: "affluenceglobalusa@gmail.com",
        branch: "114 Kirk Rd Wilmington Delaware 19807",
      }
    : {
        bankName: "UBA",
        accountName: "AFFLUENCE GLOBAL NUTRITION AND WELLNESS LTD",
        accountNumber: "1026783434",
        branch: "POWA PLAZA, ABUJA",
      };

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
    <div className="flex flex-col gap-10 lg:gap-14 pb-20 bg-neutral-50/50 min-h-screen">
      
      <section className="relative overflow-hidden bg-linear-to-br from-primary to-primary/80 flex items-center justify-center py-16 text-center lg:py-24 shadow-inner">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 px-6 md:gap-5">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl drop-shadow-md tracking-tight">
            Secure Checkout
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg font-medium drop-shadow-sm">
            Confirm your package details, complete your payment securely, and submit your receipt for rapid verification.
          </p>
        </div>
      </section>

      <div className="app-container w-full max-w-3xl flex flex-col gap-8">
        
        <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-primary/10 pb-5 mb-5 gap-4">
            <h2 className="text-xl font-bold text-neutral-dark inline-flex items-center gap-3">
              {productName}
            </h2>
            <div className="inline-flex rounded-xl bg-neutral-100 p-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowUSD(true)}
                className={`rounded-xl px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                  showUSD ? "bg-primary text-white shadow-md" : "text-neutral-500 hover:bg-white"
                }`}
              >
                USD
              </button>
              <button
                type="button"
                onClick={() => setShowUSD(false)}
                className={`rounded-xl px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                  !showUSD ? "bg-primary text-white shadow-md" : "text-neutral-500 hover:bg-white"
                }`}
              >
                NGN
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Base Price</p>
              <p className="text-xl md:text-2xl font-black text-neutral-800 tracking-tight">
                {showUSD ? `$${convertNairaToDollar(unitPrice)}` : naira(unitPrice)}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Quantity</p>
              <div className="inline-flex items-center bg-neutral-50 rounded-xl border border-primary/10">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 flex items-center justify-center text-xl text-neutral-500 hover:text-primary hover:bg-neutral-100 transition rounded-l-xl"
                >
                  −
                </button>
                <div className="w-10 text-center font-bold text-neutral-800">{qty}</div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-11 w-11 flex items-center justify-center text-xl text-neutral-500 hover:text-primary hover:bg-neutral-100 transition rounded-r-xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information Card */}
        <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5">
          <h2 className="text-lg font-bold text-neutral-dark mb-5 border-b border-primary/10 pb-4">
            Shipping Information
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-primary mb-2 ml-1">
                Full Name *
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex. Jane Doe"
                className="w-full rounded-xl border border-primary/10 bg-neutral-50 px-5 py-4 text-sm font-medium text-neutral-dark outline-none focus:ring-4 focus:ring-primary/5 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-primary mb-2 ml-1">
                Delivery Address *
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, City, State, ZIP"
                className="w-full rounded-xl border border-primary/10 bg-neutral-50 px-5 py-4 text-sm font-medium text-neutral-dark outline-none focus:ring-4 focus:ring-primary/5 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bank Transfer Details */}
        <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5">
          <h2 className="text-lg font-bold text-neutral-dark mb-5 border-b border-primary/10 pb-4">
            Transfer Instructions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl bg-neutral-50 p-5 border border-primary/5">
              <p className="text-[11px] font-bold uppercase text-neutral-400 tracking-widest">Bank Name</p>
              <p className="text-sm md:text-base font-bold text-neutral-800 mt-2">{BANK_DETAILS.bankName}</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-5 border border-primary/5">
              <p className="text-[11px] font-bold uppercase text-neutral-400 tracking-widest">Branch</p>
              <p className="text-sm md:text-base font-bold text-neutral-800 mt-2">{BANK_DETAILS.branch}</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-5 border border-primary/5 sm:col-span-2">
              <p className="text-[11px] font-bold uppercase text-neutral-400 tracking-widest">Account Name</p>
              <p className="text-sm md:text-base font-bold text-neutral-800 mt-2">{BANK_DETAILS.accountName}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-xl bg-primary p-6 shadow-lg shadow-primary/10">
            <div className="flex-1 overflow-hidden">
              <p className="text-[11px] font-bold uppercase text-white/80 tracking-widest">
                {showUSD ? "Transfer ID (Zelle)" : "Account Number"}
              </p>
              <p className="text-xl md:text-2xl font-black text-white mt-1.5 truncate">
                {BANK_DETAILS.accountNumber}
              </p>
            </div>
            <button
              onClick={handleCopyAccountNumber}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold tracking-wide text-primary hover:bg-neutral-100 transition shadow-sm w-full sm:w-auto"
            >
              <HiOutlineClipboardCopy className="text-lg" /> Copy Details
            </button>
          </div>
          <p className="text-center text-[13px] text-neutral-500 font-medium mt-5">
             Ensure you include your full name within the transfer description.
          </p>
        </div>

        {/* Action Panel */}
        <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5">
          <div className="flex items-center justify-between border-b border-primary/10 pb-6 mb-6">
            <p className="text-xs md:text-sm font-bold uppercase text-neutral-500 tracking-widest">
              Total Amount
            </p>
            <p className="text-2xl md:text-4xl font-black text-primary tracking-tight">
              {showUSD ? `$${getAltPrice(convertNairaToDollar(amount))}` : naira(getAltPrice(amount))}
            </p>
          </div>

          <div className="flex flex-col gap-4">
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
               className="w-full rounded-xl border border-dashed border-primary/40 bg-neutral-50 px-5 py-4 text-sm font-bold tracking-wide text-primary hover:bg-primary/5 transition"
             >
               {receiptFile ? "Change Receipt Attachment" : "Attach Proof of Payment"}
             </button>

             <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-xl bg-primary px-5 py-5 text-sm uppercase tracking-[0.2em] font-black text-white hover:bg-primary/90 transition shadow-lg shadow-primary/20"
             >
              Confirm & Continue
             </button>
          </div>
          <p className="text-center text-[12px] text-neutral-400 font-medium mt-5 leading-relaxed">
             Post-submission, your order status remains <span className="font-bold text-neutral-500">Pending</span> until verification completes successfully on WhatsApp.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PurchasePage;
