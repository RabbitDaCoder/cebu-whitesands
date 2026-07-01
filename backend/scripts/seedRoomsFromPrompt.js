/**
 * Seeds / reconciles the Rooms collection against the canonical room list
 * supplied by the owner.
 *
 *  - Matches by slug (with normalised-name fallback)
 *  - Upserts each room with the new pricing / occupancy / features
 *  - Preserves existing images & uploaded media (admin will upload images
 *    via the dashboard for any new rooms)
 *  - Deletes rooms in the DB that are NOT in the canonical list
 *  - Re-runs the global 50% promo seed
 *
 * Usage:  node backend/scripts/seedRoomsFromPrompt.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const mongoose = require("mongoose");
const Room = require("../models/Room");
const Discount = require("../models/Discount");
const connectDB = require("../config/db");

/* ------------------------------------------------------------------ */
/*  Canonical room data (source of truth)                              */
/* ------------------------------------------------------------------ */

const CATEGORY_MAP = {
  standard: "Standard",
  deluxe: "Deluxe",
  premium: "Premium",
  premier: "Premier",
  family: "Family",
  villa: "Villa",
  presidential: "Presidential",
};

const ROOMS = [
  {
    name: "Deluxe Room",
    slug: "deluxe-room",
    category: "deluxe",
    goodFor: 2,
    maxGuests: 2,
    beds: "1 King Size Bed",
    discountedPrice: 7100,
    originalPrice: 14200,
    discountPercentage: 50,
  },
  {
    name: "Garden Rooms",
    slug: "garden-rooms",
    category: "standard",
    goodFor: 4,
    maxGuests: 4,
    beds: "2 Queen Size Beds",
    discountedPrice: 9600,
    originalPrice: 19200,
    discountPercentage: 50,
  },
  {
    name: "Sea Rooms",
    slug: "sea-rooms",
    category: "premium",
    goodFor: 6,
    maxGuests: 6,
    beds: "3 Queen Size Beds",
    discountedPrice: 12400,
    originalPrice: 24800,
    discountPercentage: 50,
  },
  {
    name: "Deluxe Pool View Rooms",
    slug: "deluxe-pool-view-rooms",
    category: "deluxe",
    goodFor: 8,
    maxGuests: 8,
    beds: "4 Queen Size Beds",
    discountedPrice: 14200,
    originalPrice: 28400,
    discountPercentage: 50,
  },
  {
    name: "Villa Alon",
    slug: "villa-alon",
    category: "villa",
    goodFor: 10,
    maxGuests: 10,
    beds: "5 Queen Size Beds",
    discountedPrice: 17000,
    originalPrice: 34000,
    discountPercentage: 50,
  },
  {
    name: "Villa Hali",
    slug: "villa-hali",
    category: "villa",
    goodFor: 16,
    maxGuests: 16,
    beds: "8 Queen Size Beds",
    discountedPrice: 22400,
    originalPrice: 44800,
    discountPercentage: 50,
  },
  {
    name: "Villa Isla",
    slug: "villa-isla",
    category: "villa",
    goodFor: 20,
    maxGuests: 20,
    beds: "10 Queen Size Beds",
    discountedPrice: 27000,
    originalPrice: 54000,
    discountPercentage: 50,
  },
  {
    name: "Villa Solana",
    slug: "villa-solana",
    category: "villa",
    goodFor: 30,
    maxGuests: 30,
    beds: "15 Queen Size Beds",
    discountedPrice: 33000,
    originalPrice: 66000,
    discountPercentage: 50,
  },
];

const DEFAULT_AMENITIES = [
  "Buffet Breakfast",
  "Buffet Lunch",
  "Buffet Dinner",
  "Roundtrip Airport Transfer",
  "Land Transfers",
  "Alcoholic Drinks",
  "Non-Alcoholic Drinks",
  "Coffee",
  "Tea",
  "Welcome Drinks",
  "Fitness Center Access",
  "Free Parking",
  "Express Check-In",
  "Free WiFi",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildDescription(room) {
  return [
    `Sleeps up to ${room.maxGuests} guest${room.maxGuests > 1 ? "s" : ""}.`,
    `Bedding: ${room.beds}.`,
    "Designed for refined comfort with thoughtful in-room amenities and the signature service of this resort.",
  ].join(" ");
}

function toPayload(room) {
  return {
    name: room.name,
    slug: room.slug,
    description: buildDescription(room),
    category: CATEGORY_MAP[room.category] || "Standard",
    capacity: room.goodFor,
    occupancy: room.goodFor,
    maxGuests: room.maxGuests,
    bedType: room.beds,
    pricePerNight: room.originalPrice,
    discountPrice: room.discountedPrice,
    discountLabel: `${room.discountPercentage}% OFF`,
    features:
      Array.isArray(room.amenities) && room.amenities.length
        ? room.amenities
        : DEFAULT_AMENITIES,
    available: true,
  };
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

async function run() {
  await connectDB();

  const canonicalSlugs = ROOMS.map((r) => r.slug);

  let upserted = 0;
  let inserted = 0;
  let updated = 0;

  for (const room of ROOMS) {
    const payload = toPayload(room);

    // Look for an existing record by slug OR by normalised name
    const altSlug = slugify(room.name);
    const existing = await Room.findOne({
      $or: [
        { slug: payload.slug },
        { slug: altSlug },
        { name: new RegExp(`^${room.name}$`, "i") },
      ],
    });

    if (existing) {
      // Preserve images & media — owner uploads those via the dashboard.
      await Room.updateOne({ _id: existing._id }, { $set: payload });
      updated += 1;
    } else {
      // New room — insert with empty images. Admin will upload later.
      await Room.create({ ...payload, images: [] });
      inserted += 1;
    }

    upserted += 1;
  }

  // Delete any rooms NOT in the canonical list
  const deletion = await Room.deleteMany({ slug: { $nin: canonicalSlugs } });

  // Clean up legacy "system-import" per-room discounts (the global promo
  // covers everything from this point on).
  await Discount.deleteMany({ createdBy: "system-import" });

  // Ensure the global 50% promo exists
  const promoName = "50% OFF Resort Promo";
  const now = new Date();
  const oneYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  const promo = await Discount.findOneAndUpdate(
    { name: promoName },
    {
      name: promoName,
      type: "percentage",
      value: 50,
      appliesTo: "all",
      rooms: [],
      categories: [],
      startDate: now,
      endDate: oneYear,
      active: true,
      label: "50% OFF with FREE Breakfast, Lunch, and Dinner",
      minimumNights: 1,
      createdBy: "seed",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log("──────────────────────────────────────────────────");
  console.log(
    ` Rooms upserted : ${upserted}  (inserted: ${inserted}, updated: ${updated})`,
  );
  console.log(` Rooms deleted  : ${deletion.deletedCount}`);
  console.log(
    ` Discount       : ${promo.name} — ${promo.value}% (${promo.appliesTo})`,
  );
  console.log("──────────────────────────────────────────────────");

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err.message || err);
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
