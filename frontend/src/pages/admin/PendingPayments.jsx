import { useEffect, useState } from "react";
import {
  getBookings,
  updateBookingStatus,
  downloadReceipt,
  confirmInstallment,
  sendInstallmentReminder,
} from "../../services/api";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  CreditCard,
  Download,
  Bell,
} from "lucide-react";

export default function PendingPayments() {
  const [bookings, setBookings] = useState([]);
  const [balanceDue, setBalanceDue] = useState([]);
  const [tab, setTab] = useState("pending");

  const fetchPending = () =>
    getBookings({ paymentStatus: "pending" }).then((res) =>
      setBookings(
        res.data.data.filter(
          (b) =>
            b.paymentScreenshot ||
            b.installment?.firstPaymentScreenshot ||
            b.installment?.secondPaymentScreenshot,
        ),
      ),
    );

  const fetchBalanceDue = () =>
    getBookings({}).then((res) => {
      const all = res.data.data || [];
      setBalanceDue(
        all.filter(
          (b) =>
            b.paymentOption === "installment" &&
            b.installment?.firstPaymentStatus === "confirmed" &&
            b.installment?.secondPaymentStatus !== "confirmed",
        ),
      );
    });

  useEffect(() => {
    fetchPending();
    fetchBalanceDue();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Booking ${status}`);
      fetchPending();
      fetchBalanceDue();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleConfirmInstallment = async (id, num) => {
    try {
      await confirmInstallment(id, num);
      toast.success(`Installment ${num} confirmed`);
      fetchPending();
      fetchBalanceDue();
    } catch {
      toast.error("Failed to confirm installment");
    }
  };

  const handleSendReminder = async (id) => {
    try {
      await sendInstallmentReminder(id);
      toast.success("Reminder sent");
      fetchBalanceDue();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reminder");
    }
  };

  const handleDownloadReceipt = async (id, ref) => {
    try {
      const res = await downloadReceipt(id);
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Receipt_${ref}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Receipt downloaded");
    } catch {
      toast.error("Failed to download receipt");
    }
  };

  // Determine which screenshot + amount to show for a pending booking
  const getPendingInfo = (b) => {
    if (b.paymentOption === "installment") {
      if (b.installment?.secondPaymentStatus === "pending") {
        return {
          screenshot: b.installment.secondPaymentScreenshot,
          label: "2nd Installment",
          amount: b.installment.secondPaymentAmount,
          installmentNumber: 2,
        };
      }
      if (b.installment?.firstPaymentStatus === "pending") {
        return {
          screenshot: b.installment.firstPaymentScreenshot,
          label: "1st Installment",
          amount: b.installment.firstPaymentAmount,
          installmentNumber: 1,
        };
      }
    }
    return {
      screenshot: b.paymentScreenshot,
      label: "Full Payment",
      amount: b.totalAmount,
      installmentNumber: null,
    };
  };

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold mb-1">
          Finance
        </p>
        <h2 className="font-serif text-2xl text-ocean">Payment Review</h2>
        <p className="text-ocean/40 text-sm mt-1">
          Confirm uploaded payment screenshots and manage installments
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-ocean/10">
        <button
          onClick={() => setTab("pending")}
          className={`pb-3 text-sm font-medium transition-colors ${
            tab === "pending"
              ? "text-teal border-b-2 border-teal"
              : "text-ocean/40 hover:text-ocean/60"
          }`}
        >
          Pending Payments ({bookings.length})
        </button>
        <button
          onClick={() => setTab("balance")}
          className={`pb-3 text-sm font-medium transition-colors ${
            tab === "balance"
              ? "text-teal border-b-2 border-teal"
              : "text-ocean/40 hover:text-ocean/60"
          }`}
        >
          Balance Due ({balanceDue.length})
        </button>
      </div>

      {tab === "pending" && (
        <>
          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <CreditCard size={32} className="text-ocean/15 mx-auto mb-4" />
              <p className="text-sm text-ocean/40">
                No pending payments to review
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-ocean/40 mb-6">
                {bookings.length} payment{bookings.length !== 1 ? "s" : ""}{" "}
                awaiting review
              </p>

              <div className="grid gap-4">
                {bookings.map((b) => {
                  const info = getPendingInfo(b);
                  return (
                    <div
                      key={b._id}
                      className="bg-white border border-ocean/5 p-6"
                    >
                      <div className="grid md:grid-cols-[1fr_280px] gap-6">
                        {/* Guest details */}
                        <div className="space-y-3 text-sm">
                          <div className="flex items-baseline gap-3">
                            <h4 className="font-serif text-lg text-ocean">
                              {b.guestName}
                            </h4>
                            <span className="text-[10px] font-mono text-ocean/30">
                              {b.bookingRef}
                            </span>
                            {b.paymentOption === "installment" && (
                              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                                {info.label}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-2">
                            <div>
                              <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                                Email
                              </p>
                              <p className="text-ocean/70">{b.guestEmail}</p>
                            </div>
                            {b.guestPhone && (
                              <div>
                                <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                                  Phone
                                </p>
                                <p className="text-ocean/70">
                                  {b.guestPhone}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                                Room
                              </p>
                              <p className="text-ocean/70">
                                {b.room?.name || "\u2014"}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                                Dates
                              </p>
                              <p className="text-ocean/70">
                                {new Date(b.checkIn).toLocaleDateString()} -{" "}
                                {new Date(b.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                                Nights
                              </p>
                              <p className="text-ocean/70">{b.nights}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                                Amount
                              </p>
                              <p className="font-medium text-teal">
                                PHP {info.amount?.toLocaleString()}
                                {b.paymentOption === "installment" && (
                                  <span className="text-ocean/40 font-normal ml-1">
                                    / PHP {b.totalAmount?.toLocaleString()}{" "}
                                    total
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Screenshot */}
                        <div>
                          <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-2">
                            Payment Proof
                          </p>
                          <a
                            href={info.screenshot}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <img
                              src={info.screenshot}
                              alt="Payment proof"
                              className="w-full h-48 object-contain border border-ocean/10 bg-ocean/3"
                            />
                            <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-teal hover:text-teal transition-colors">
                              <ExternalLink size={11} /> View full size
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 pt-5 border-t border-ocean/5 flex flex-wrap gap-2">
                        {info.installmentNumber ? (
                          <button
                            onClick={() =>
                              handleConfirmInstallment(
                                b._id,
                                info.installmentNumber,
                              )
                            }
                            className="bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-2.5 hover:bg-ocean transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle size={13} /> Confirm {info.label}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(b._id, "confirmed")}
                            className="bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-2.5 hover:bg-ocean transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle size={13} /> Confirm
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(b._id, "cancelled")}
                          className="border border-red-200 text-red-500 text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-2.5 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                        >
                          <XCircle size={13} /> Reject
                        </button>
                        <button
                          onClick={() =>
                            handleDownloadReceipt(b._id, b.bookingRef)
                          }
                          className="border border-teal text-teal text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-2.5 hover:bg-teal hover:text-ocean transition-colors flex items-center gap-1.5 ml-auto"
                        >
                          <Download size={13} /> Receipt PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {tab === "balance" && (
        <>
          {balanceDue.length === 0 ? (
            <div className="text-center py-20">
              <CreditCard size={32} className="text-ocean/15 mx-auto mb-4" />
              <p className="text-sm text-ocean/40">
                No installment bookings with balance due
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {balanceDue.map((b) => (
                <div
                  key={b._id}
                  className="bg-white border border-ocean/5 p-6"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <h4 className="font-serif text-lg text-ocean">
                      {b.guestName}
                    </h4>
                    <span className="text-[10px] font-mono text-ocean/30">
                      {b.bookingRef}
                    </span>
                    <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                      Partially Paid
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                        Room
                      </p>
                      <p className="text-ocean/70">
                        {b.room?.name || "\u2014"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                        Check-in
                      </p>
                      <p className="text-ocean/70">
                        {new Date(b.checkIn).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                        Balance Due
                      </p>
                      <p className="font-medium text-red-500">
                        PHP{" "}
                        {b.installment?.secondPaymentAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-0.5">
                        Due Date
                      </p>
                      <p className="text-ocean/70">
                        {b.installment?.secondPaymentDueDate
                          ? new Date(
                              b.installment.secondPaymentDueDate,
                            ).toLocaleDateString()
                          : "\u2014"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-ocean/5">
                    <span className="text-xs text-ocean/40">
                      2nd Payment:{" "}
                      {b.installment?.secondPaymentStatus === "pending"
                        ? "Screenshot uploaded - awaiting review"
                        : "Awaiting payment"}
                    </span>
                    {b.installment?.secondPaymentStatus !== "pending" && (
                      <button
                        onClick={() => handleSendReminder(b._id)}
                        disabled={b.installment?.secondPaymentReminderSent}
                        className="ml-auto border border-teal text-teal text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-teal hover:text-ocean transition-colors flex items-center gap-1.5 disabled:opacity-40"
                      >
                        <Bell size={12} />{" "}
                        {b.installment?.secondPaymentReminderSent
                          ? "Reminder Sent"
                          : "Send Reminder"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
