/**
 * Writes the crawler-facing OG preview manifest (R2 JSON) for every existing
 * room. Needed once because ogManifestService.writeRoomManifest only fires
 * on room create/update going forward — rooms already in the DB before that
 * code shipped have no manifest yet, so their link previews silently fall
 * back to the live API (which defeats the point of the manifest: staying up
 * even if the Render backend is cold/asleep).
 *
 * Usage: node backend/scripts/backfillOgManifests.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Room = require("../models/Room");
const connectDB = require("../config/db");
const ogManifestService = require("../services/ogManifestService");

(async () => {
  await connectDB();

  const rooms = await Room.find({});
  if (rooms.length === 0) {
    console.log("No rooms found.");
    await mongoose.disconnect();
    return;
  }

  console.log(`Writing OG manifests for ${rooms.length} room(s):\n`);

  for (const room of rooms) {
    await ogManifestService.writeRoomManifest(room);
    console.log(`  ✓ ${room.slug}`);
  }

  console.log("\nDone.");
  await mongoose.disconnect();
})();
