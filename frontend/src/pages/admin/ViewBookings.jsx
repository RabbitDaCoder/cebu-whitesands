import { useEffect, useState } from "react";
import {
  getBookings,
  updateBookingStatus,
  downloadReceipt,
  deleteBooking,
  confirmInstallment,
  sendInstallmentReminder,
} from "../../services/api";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  Image,
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  Bell,
  Link2,
  RefreshCw,
  CreditCard,
} from "lucide-react";

const STATUS_FILTERS = ["", "pending", "confirmed", "cancelled"];
const PAYMENT_FILTERS = ["", "unpaid", "partial", "pending", "confirmed"];

const paymentStatusStyle = (s) => {
  switch (s) {
    case "confirmed":
      return "bg-green-50 text-green-600";
    case "partial":
      return "bg-blue-50 text-blue-600";
    case "pending":
      return "bg-yellow-50 text-yellow-600";
    case "cancelled":
      return "bg-red-50 text-red-500";
    default:
      return "bg-ocean/5 text-ocean/40";
  }
};

const paymentStatusLabel = (s) => {
  switch (s) {
    case "confirmed":
      return "Paid";
    case "partial":
      return "Half Paid";
    case "pending":
      return "Under Review";
    case "cancelled":
      return "Cancelled";
    default:
      return s || "Unpaid";
  }
};

function PaymentProgressBar({ booking }) {
  if (booking.paymentOption !== "installment" || !booking.installment) {
    return null;
  }
  const inst = booking.installment;
  const first = inst.firstPaymentStatus;
  const second = inst.secondPaymentStatus;
  const step1Done = first === "confirmed";
  const step2Done = second === "confirmed";
  const step1Pending = first === "pending";
  const step2Pending = second === "pending";

  return (
    <div className="mt-2">
      <p className="text-[9px] text-ocean/30 uppercase tracking-[0.15em] mb-1">
        Installment Progress
      </p>
      <div className="flex items-center gap-1">
        <div
          className={`flex-1 h-1.5 rounded-sm ${step1Done ? "bg-green-500" : step1Pending ? "bg-yellow-400" : "bg-ocean/10"}`}
        />
        <div
          className={`flex-1 h-1.5 rounded-sm ${step2Done ? "bg-green-500" : step2Pending ? "bg-yellow-400" : "bg-ocean/10"}`}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span
          className={`text-[9px] ${step1Done ? "text-green-600" : step1Pending ? "text-yellow-600" : "text-ocean/30"}`}
        >
          ₱{inst.firstPaymentAmount?.toLocaleString()}{" "}
          {step1Done ? "✓" : step1Pending ? "…" : ""}
        </span>
        <span
          className={`text-[9px] ${step2Done ? "text-green-600" : step2Pending ? "text-yellow-600" : "text-ocean/30"}`}
        >
          ₱{inst.secondPaymentAmount?.toLocaleString()}{" "}
          {step2Done ? "✓" : step2Pending ? "…" : ""}
        </span>
      </div>
    </div>
  );
}

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loadingLink, setLoadingLink] = useState({});

  const fetchBookings = () => {
    const params = {};
    if (filter) params.status = filter;
    if (paymentFilter) params.paymentStatus = paymentFilter;
    if (search) params.search = search;
    getBookings(params).then((res) => setBookings(res.data.data));
  };

  useEffect(() => {
    fetchBookings();
  }, [filter, paymentFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id, ref) => {
    if (!window.confirm(`Delete booking ${ref}? This cannot be undone.`))
      return;
    try {
      await deleteBooking(id);
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Failed to delete booking");
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

  const handleConfirmInstallment = async (bookingId, num) => {
    try {
      await confirmInstallment(bookingId, num);
      toast.success(`Installment ${num} confirmed`);
      fetchBookings();
    } catch {
      toast.error("Failed to confirm installment");
    }
  };

  const handleSendReminder = async (id) => {
    try {
      await sendInstallmentReminder(id);
      toast.success("Reminder sent to guest");
    } catch {
      toast.error("Failed to send reminder");
    }
  };

  const handleGeneratePaymentLink = async (id, sendEmail = false) => {
    setLoadingLink((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await api.post(`/bookings/${id}/generate-payment-link`, {
        sendEmail,
      });
      const url = res.data.continuationUrl;
      // Try modern clipboard API first, fall back to execCommand
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success(
        sendEmail
          ? "Link sent to guest & copied!"
          : "Payment link copied to clipboard",
      );
    } catch {
      toast.error("Failed to generate payment link");
    } finally {
      setLoadingLink((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold mb-1">
            Reservations
          </p>
          <h2 className="font-serif text-2xl text-ocean">All Bookings</h2>
          <p className="text-ocean/40 text-sm mt-1">
            {bookings.length > 0
              ? `${bookings.length} booking${bookings.length !== 1 ? "s" : ""} found`
              : "Review and manage guest reservations"}
          </p>
        </div>
      </div>

      {/* Toolbar: filters + search */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] text-ocean/35 uppercase tracking-[0.12em] self-center mr-1">
              Status
            </span>
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-medium uppercase tracking-[0.15em] px-4 py-2 transition-colors ${
                  filter === f
                    ? "bg-ocean text-ivory"
                    : "bg-white border border-ocean/10 text-ocean/50 hover:text-ocean hover:border-ocean/20"
                }`}
              >
                {f || "All"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ocean/30"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, ref..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-ocean/10 bg-white focus:outline-none focus:border-teal transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-teal text-ocean text-[11px] font-semibold uppercase tracking-[0.18em] px-5 py-2.5 hover:bg-ocean transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Payment status filter */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-ocean/35 uppercase tracking-[0.12em] mr-1">
            Payment
          </span>
          {PAYMENT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setPaymentFilter(f)}
              className={`text-[11px] font-medium uppercase tracking-[0.15em] px-4 py-2 transition-colors ${
                paymentFilter === f
                  ? "bg-ocean text-ivory"
                  : "bg-white border border-ocean/10 text-ocean/50 hover:text-ocean hover:border-ocean/20"
              }`}
            >
              {f === "partial"
                ? "Half Paid"
                : f === "pending"
                  ? "Under Review"
                  : f || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr] gap-4 px-5 mb-2">
        {["Guest", "Room", "Dates", "Amount", "Status"].map((h) => (
          <span
            key={h}
            className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em]"
          >
            {h}
          </span>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <Calendar size={32} className="text-ocean/15 mx-auto mb-4" />
          <p className="text-sm text-ocean/40">No bookings found</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white border border-ocean/10 p-5">
              <div className="grid md:grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr] gap-4 text-sm">
                {/* Guest */}
                <div>
                  <p className="md:hidden text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-1">
                    Guest
                  </p>
                  <p className="font-medium text-ocean">{b.guestName}</p>
                  <p className="text-xs text-ocean/40">{b.guestEmail}</p>
                  {b.guestPhone && (
                    <p className="text-xs text-ocean/40">{b.guestPhone}</p>
                  )}
                </div>

                {/* Room */}
                <div>
                  <p className="md:hidden text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-1">
                    Room
                  </p>
                  <p className="font-medium text-ocean">
                    {b.room?.name || "—"}
                  </p>
                  <p className="text-xs text-ocean/40">
                    {b.numberOfGuests} guest{b.numberOfGuests > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Dates */}
                <div>
                  <p className="md:hidden text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-1">
                    Dates
                  </p>
                  <p className="text-ocean">
                    {new Date(b.checkIn).toLocaleDateString()} –{" "}
                    {new Date(b.checkOut).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-ocean/40">
                    {b.nights} night{b.nights > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Amount */}
                <div>
                  <p className="md:hidden text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-1">
                    Amount
                  </p>
                  <p className="font-medium text-teal">
                    ₱{b.totalAmount?.toLocaleString()}
                  </p>
                  {b.paymentOption === "installment" && b.amountPaid > 0 && (
                    <p className="text-[10px] text-blue-500 mt-0.5">
                      ₱{b.amountPaid?.toLocaleString()} paid
                    </p>
                  )}
                  <p className="text-[10px] text-ocean/30 font-mono mt-0.5">
                    {b.bookingRef}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="md:hidden text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-1">
                    Status
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${
                        b.status === "confirmed"
                          ? "bg-green-50 text-green-600"
                          : b.status === "cancelled"
                            ? "bg-red-50 text-red-500"
                            : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {b.status}
                    </span>
                    {b.paymentStatus && (
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${paymentStatusStyle(b.paymentStatus)}`}
                      >
                        {paymentStatusLabel(b.paymentStatus)}
                      </span>
                    )}
                  </div>
                  {b.paymentOption === "installment" && (
                    <PaymentProgressBar booking={b} />
                  )}
                </div>
              </div>

              {/* Special requests */}
              {b.specialRequests && (
                <p className="mt-3 text-xs text-ocean/40 italic border-t border-ocean/5 pt-3">
                  "{b.specialRequests}"
                </p>
              )}

              {/* Expand toggle for screenshot & receipt */}
              {(b.paymentScreenshot || b.paymentStatus !== "unpaid") && (
                <button
                  onClick={() => setExpanded(expanded === b._id ? null : b._id)}
                  className="mt-3 pt-3 border-t border-ocean/5 flex items-center gap-1.5 text-[11px] text-teal hover:text-teal transition-colors uppercase tracking-[0.12em] font-medium"
                >
                  {b.paymentScreenshot && <Image size={13} />}
                  {expanded === b._id
                    ? "Hide Details"
                    : "View Payment & Receipt"}
                  {expanded === b._id ? (
                    <ChevronUp size={13} />
                  ) : (
                    <ChevronDown size={13} />
                  )}
                </button>
              )}

              {/* Expanded: screenshot + installment + download receipt */}
              {expanded === b._id && (
                <div className="mt-4 pt-4 border-t border-ocean/5 space-y-6">
                  {/* Installment screenshots */}
                  {b.paymentOption === "installment" && b.installment && (
                    <div>
                      <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-3">
                        Installment Screenshots
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* 1st payment */}
                        <div className="border border-ocean/8 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-medium text-ocean/60">
                              1st — ₱
                              {b.installment.firstPaymentAmount?.toLocaleString()}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 ${paymentStatusStyle(b.installment.firstPaymentStatus)}`}
                            >
                              {b.installment.firstPaymentStatus === "confirmed"
                                ? "Confirmed"
                                : b.installment.firstPaymentStatus === "pending"
                                  ? "Under Review"
                                  : "Unpaid"}
                            </span>
                          </div>
                          {b.installment.firstPaymentScreenshot ? (
                            <a
                              href={b.installment.firstPaymentScreenshot}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={b.installment.firstPaymentScreenshot}
                                alt="1st payment"
                                className="w-full h-36 object-contain bg-ocean/3 border border-ocean/8"
                              />
                            </a>
                          ) : (
                            <div className="h-36 flex items-center justify-center border border-dashed border-ocean/10">
                              <span className="text-xs text-ocean/30">
                                Not uploaded
                              </span>
                            </div>
                          )}
                          {b.installment.firstPaymentStatus === "pending" && (
                            <button
                              onClick={() => handleConfirmInstallment(b._id, 1)}
                              className="mt-2 w-full bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.12em] py-2 hover:bg-ocean/90 transition-colors"
                            >
                              <CheckCircle size={11} className="inline mr-1" />
                              Confirm 1st Payment
                            </button>
                          )}
                        </div>

                        {/* 2nd payment */}
                        <div className="border border-ocean/8 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-medium text-ocean/60">
                              2nd — ₱
                              {b.installment.secondPaymentAmount?.toLocaleString()}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 ${paymentStatusStyle(b.installment.secondPaymentStatus)}`}
                            >
                              {b.installment.secondPaymentStatus === "confirmed"
                                ? "Confirmed"
                                : b.installment.secondPaymentStatus ===
                                    "pending"
                                  ? "Under Review"
                                  : "Unpaid"}
                            </span>
                          </div>
                          {b.installment.secondPaymentScreenshot ? (
                            <a
                              href={b.installment.secondPaymentScreenshot}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={b.installment.secondPaymentScreenshot}
                                alt="2nd payment"
                                className="w-full h-36 object-contain bg-ocean/3 border border-ocean/8"
                              />
                            </a>
                          ) : (
                            <div className="h-36 flex items-center justify-center border border-dashed border-ocean/10">
                              <span className="text-xs text-ocean/30">
                                Not uploaded
                              </span>
                            </div>
                          )}
                          {b.installment.secondPaymentStatus === "pending" && (
                            <button
                              onClick={() => handleConfirmInstallment(b._id, 2)}
                              className="mt-2 w-full bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.12em] py-2 hover:bg-ocean/90 transition-colors"
                            >
                              <CheckCircle size={11} className="inline mr-1" />
                              Confirm 2nd Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full payment screenshot */}
                  {b.paymentOption !== "installment" && (
                    <div className="grid md:grid-cols-[280px_1fr] gap-6">
                      {b.paymentScreenshot ? (
                        <div>
                          <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-2">
                            Payment Screenshot
                          </p>
                          <a
                            href={b.paymentScreenshot}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <img
                              src={b.paymentScreenshot}
                              alt="Payment proof"
                              className="w-full h-52 object-contain border border-ocean/10 bg-ocean/3"
                            />
                            <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-teal hover:text-teal transition-colors">
                              <ExternalLink size={11} /> View full size
                            </span>
                          </a>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em] mb-2">
                            Payment Screenshot
                          </p>
                          <div className="flex items-center justify-center h-52 border border-dashed border-ocean/10 bg-ocean/3">
                            <p className="text-xs text-ocean/30">
                              No screenshot uploaded
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Receipt download */}
                      <div className="flex flex-col gap-3">
                        <p className="text-[10px] font-medium text-ocean/35 uppercase tracking-[0.15em]">
                          Booking Receipt
                        </p>
                        <button
                          onClick={() =>
                            handleDownloadReceipt(b._id, b.bookingRef)
                          }
                          className="inline-flex items-center gap-2 bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 hover:bg-ocean/90 transition-colors self-start"
                        >
                          <Download size={13} /> Download Receipt PDF
                        </button>
                        <p className="text-xs text-ocean/40">
                          Generates a PDF receipt with all booking details for
                          this reservation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Receipt download for installment bookings */}
                  {b.paymentOption === "installment" && (
                    <div>
                      <button
                        onClick={() =>
                          handleDownloadReceipt(b._id, b.bookingRef)
                        }
                        className="inline-flex items-center gap-2 bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 hover:bg-ocean/90 transition-colors"
                      >
                        <Download size={13} /> Download Receipt PDF
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-ocean/5 flex flex-wrap gap-2">
                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(b._id, "confirmed")}
                      className="bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2 hover:bg-ocean transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle size={13} /> Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(b._id, "cancelled")}
                      className="border border-red-200 text-red-500 text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                    >
                      <XCircle size={13} /> Cancel
                    </button>
                  </>
                )}

                {/* Installment actions */}
                {b.paymentOption === "installment" &&
                  b.paymentStatus !== "confirmed" && (
                    <>
                      <button
                        onClick={() => handleSendReminder(b._id)}
                        className="border border-teal/30 text-teal text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-teal-dark/5 transition-colors flex items-center gap-1.5"
                      >
                        <Bell size={13} />{" "}
                        {b.paymentStatus === "partial"
                          ? "Remind Balance"
                          : "Send Reminder"}
                      </button>
                      <button
                        onClick={() => handleGeneratePaymentLink(b._id, false)}
                        disabled={loadingLink[b._id]}
                        className="border border-teal/30 text-teal text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-ocean/5 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                      >
                        <Link2 size={13} />{" "}
                        {loadingLink[b._id] ? "Copying..." : "Copy Pay Link"}
                      </button>
                      <button
                        onClick={() => handleGeneratePaymentLink(b._id, true)}
                        disabled={loadingLink[b._id]}
                        className="border border-gold/40 text-gold text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-gold/5 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                      >
                        <CreditCard size={13} /> Send Pay Link
                      </button>
                    </>
                  )}

                {/* Full booking — unpaid reminder */}
                {b.paymentOption === "full" &&
                  b.paymentStatus === "unpaid" &&
                  b.status !== "cancelled" && (
                    <button
                      onClick={() => handleSendReminder(b._id)}
                      className="border border-teal/30 text-teal text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-teal-dark/5 transition-colors flex items-center gap-1.5"
                    >
                      <Bell size={13} /> Send Reminder
                    </button>
                  )}

                {/* Resend receipt */}
                <button
                  onClick={() => handleDownloadReceipt(b._id, b.bookingRef)}
                  className="border border-ocean/10 text-ocean/50 text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-ocean/5 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={13} /> Receipt
                </button>

                <button
                  onClick={() => handleDelete(b._id, b.bookingRef)}
                  className="ml-auto border border-red-200 text-red-400 text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
