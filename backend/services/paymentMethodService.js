const PaymentMethod = require("../models/PaymentMethod");
const storage = require("../src/storage/storage");
const AppError = require("../utils/AppError");
const { detailFieldSchema } = require("../validators/paymentMethod.validator");
const { z } = require("zod");
const ogManifestService = require("./ogManifestService");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function generateUniqueSlug(name) {
  const base = slugify(name) || "method";
  let slug = base;
  let suffix = 2;
  while (await PaymentMethod.findOne({ slug })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

function parseDetails(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw || "[]");
  } catch {
    throw new AppError("Details must be a valid list", 400);
  }
  const result = z.array(detailFieldSchema).safeParse(parsed);
  if (!result.success) {
    throw new AppError("One or more payment details are invalid", 400);
  }
  return result.data;
}

const paymentMethodService = {
  async getAll({ active } = {}) {
    const filter = {};
    if (active === "true") filter.isActive = true;
    return PaymentMethod.find(filter).sort({ sortOrder: 1, createdAt: -1 });
  },

  async getBySlug(slug) {
    const method = await PaymentMethod.findOne({ slug });
    if (!method) throw new AppError("Payment method not found", 404);
    return method;
  },

  async create(data, file) {
    const slug = await generateUniqueSlug(data.name);

    let logoUrl, logoKey;
    if (file) {
      const result = await storage.uploadFile(file, storage.FOLDERS.LOGOS);
      logoUrl = result.url;
      logoKey = result.key;
    }

    const method = await PaymentMethod.create({
      name: data.name,
      slug,
      logoUrl,
      logoKey,
      details: parseDetails(data.details),
      instructions: data.instructions || "",
      isActive: data.isActive !== "false",
      sortOrder: data.sortOrder || 0,
    });

    await ogManifestService.writePaymentMethodManifest(method);
    return method;
  },

  async update(id, data, file) {
    const method = await PaymentMethod.findById(id);
    if (!method) throw new AppError("Payment method not found", 404);

    method.name = data.name;
    method.details = parseDetails(data.details);
    method.instructions = data.instructions || "";
    method.isActive = data.isActive !== "false";
    method.sortOrder = data.sortOrder || 0;
    // slug is intentionally never regenerated — it's a public URL already shared

    if (file) {
      const oldKey = method.logoKey;
      const result = await storage.uploadFile(file, storage.FOLDERS.LOGOS);
      method.logoUrl = result.url;
      method.logoKey = result.key;
      if (oldKey) await storage.deleteFile(oldKey);
    }

    await method.save();
    await ogManifestService.writePaymentMethodManifest(method);
    return method;
  },

  async toggle(id) {
    const method = await PaymentMethod.findById(id);
    if (!method) throw new AppError("Payment method not found", 404);
    method.isActive = !method.isActive;
    await method.save();
    await ogManifestService.writePaymentMethodManifest(method);
    return method;
  },
};

module.exports = paymentMethodService;
