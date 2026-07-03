const logger = require("../config/logger");
const generateReceipt = require("../utils/generateReceipt");

/**
 * POST to the email service.
 * Env vars are read inside the function (never at module-load time)
 * so they're always current after dotenv has loaded.
 * Never throws — email failures are logged and swallowed.
 */
async function callEmailService(payload) {
  const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;
  const EMAIL_SERVICE_API_KEY = process.env.EMAIL_SERVICE_API_KEY;

  if (!EMAIL_SERVICE_URL || !EMAIL_SERVICE_API_KEY) {
    logger.warn({
      message:
        "Email service not configured (EMAIL_SERVICE_URL / EMAIL_SERVICE_API_KEY missing)",
    });
    return { success: false, error: "Email service not configured" };
  }
  try {
    const res = await fetch(EMAIL_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": EMAIL_SERVICE_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      logger.error({ message: `Email service error (${payload.type})`, data });
      return { success: false, error: data.error || "Email service error" };
    }
    return data;
  } catch (err) {
    logger.error({
      message: `Email service unreachable (${payload.type})`,
      err: err.message,
    });
    return { success: false, error: err.message };
  }
}

async function toPdfBase64(booking, label) {
  try {
    const buf = await generateReceipt(booking);
    return buf.toString("base64");
  } catch (err) {
    logger.error({
      message: `PDF generation failed (${label})`,
      err: err.message,
    });
    return undefined;
  }
}

const emailService = {
  // 1. Guest gets booking received + payment link
  sendBookingConfirmationToGuest(booking) {
    callEmailService({ type: "booking_received", booking }).catch(() => {});
  },

  // 2. Admin notified of new booking
  sendBookingNotification(booking) {
    callEmailService({ type: "admin_new_booking", booking }).catch(() => {});
  },

  // 3. Guest receipt when payment proof uploaded (PDF attached)
  async sendAutoReceipt(booking) {
    const pdfBase64 = await toPdfBase64(booking, "auto receipt");
    callEmailService({ type: "payment_received", booking, pdfBase64 }).catch(
      () => {},
    );
  },

  // 4. Admin notified of payment proof upload (PDF attached)
  async sendAdminPaymentAlert({ booking, screenshotUrl }) {
    const pdfBase64 = await toPdfBase64(booking, "admin payment alert");
    callEmailService({
      type: "admin_payment_alert",
      booking,
      screenshotUrl,
      pdfBase64,
    }).catch(() => {});
  },

  // 5. Guest gets confirmation when admin confirms booking (PDF attached)
  async sendGuestConfirmation(booking) {
    const pdfBase64 = await toPdfBase64(booking, "guest confirmation");
    callEmailService({ type: "booking_confirmed", booking, pdfBase64 }).catch(
      () => {},
    );
  },

  // 6. Manual receipt send — awaitable, reports success/failure
  async sendReceiptEmail(booking, pdfBuffer) {
    const pdfBase64 = Buffer.isBuffer(pdfBuffer)
      ? pdfBuffer.toString("base64")
      : pdfBuffer;
    return callEmailService({ type: "payment_received", booking, pdfBase64 });
  },

  // 7. Payment reminder (reminderType 1 = first, 2 = final; optional continuationUrl)
  async sendPaymentReminder(booking, reminderType, continuationUrl) {
    return callEmailService({
      type: "payment_reminder",
      booking,
      reminderType,
      continuationUrl,
    });
  },

  // 8. Installment due reminder (called by admin "Send Reminder" button)
  async sendInstallmentReminder(id) {
    const Booking = require("../models/Booking");
    const AppError = require("../utils/AppError");
    const booking = await Booking.findById(id).populate(
      "room",
      "name pricePerNight",
    );
    if (!booking) throw new AppError("Booking not found", 404);
    await callEmailService({
      type: "payment_reminder",
      booking,
      reminderType: 1,
    });
    return booking;
  },

  // 9. Partial payment email (sent after 1st installment confirmed, includes continuation link)
  async sendPartialPaymentEmail(booking, continuationUrl) {
    return callEmailService({
      type: "partial_payment",
      booking,
      continuationUrl,
    });
  },

  // 10. Remaining balance reminder (targeted installment reminder with continuation link)
  async sendRemainingBalanceReminder(booking, continuationUrl) {
    return callEmailService({
      type: "remaining_balance_reminder",
      booking,
      continuationUrl,
    });
  },

  // 11. Booking cancelled notification
  async sendPaymentCancelledEmail(booking, reason) {
    return callEmailService({ type: "booking_cancelled", booking, reason });
  },
};

module.exports = emailService;
