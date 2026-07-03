require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const handler = require("./api/send");

const app = express();
const PORT = process.env.PORT || 3001;

// Detailed dev logging
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(express.json({ limit: "5mb" }));

// Log every incoming request body (email type + recipient)
app.use((req, _res, next) => {
  if (req.method === "POST" && req.path === "/api/send" && req.body) {
    const { type, to, booking } = req.body;
    console.log(`[EMAIL] type=${type || "?"} to=${to || booking?.guestEmail || "?"} ref=${booking?.bookingRef || "?"}`);
  }
  next();
});

app.post("/api/send", (req, res) => handler(req, res));

app.use((_req, res) => {
  res.status(404).json({ error: "Not found. POST to /api/send" });
});

app.listen(PORT, () => {
  console.log(`\n✓ Email service running at http://localhost:${PORT}`);
  console.log(`  SMTP user : ${process.env.SMTP_USER || "(not set)"}`);
  console.log(`  API key   : ${process.env.EMAIL_API_KEY ? process.env.EMAIL_API_KEY.slice(0, 8) + "..." : "(not set)"}`);
  console.log(`  Admin     : ${process.env.ADMIN_EMAIL || "(not set)"}`);
  console.log(`  POST http://localhost:${PORT}/api/send\n`);
});
