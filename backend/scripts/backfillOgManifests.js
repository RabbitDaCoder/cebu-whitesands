/**
 * Writes the crawler-facing OG preview manifest (R2 JSON) for every existing
 * room and payment method. Needed once because ogManifestService only
 * writes manifests on create/update/toggle going forward — records already
 * in the DB before that code shipped have no manifest yet, so their link
 * previews silently fall back to the live API (which defeats the point of
 * the manifest: staying up even if the Render backend is cold/asleep).
 *
 * Usage: node backend/scripts/backfillOgManifests.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Room = require("../models/Room");
const PaymentMethod = require("../models/PaymentMethod");
const connectDB = require("../config/db");
const ogManifestService = require("../services/ogManifestService");

(async () => {
  await connectDB();

  const rooms = await Room.find({});
  console.log(`Writing OG manifests for ${rooms.length} room(s):\n`);
  for (const room of rooms) {
    await ogManifestService.writeRoomManifest(room);
    console.log(`  ✓ rooms/${room.slug}`);
  }

  const methods = await PaymentMethod.find({});
  console.log(`\nWriting OG manifests for ${methods.length} payment method(s):\n`);
  for (const method of methods) {
    await ogManifestService.writePaymentMethodManifest(method);
    console.log(`  ✓ payment-methods/${method.slug}`);
  }

  console.log("\nDone.");
  await mongoose.disconnect();
})();
