const storage = require("../src/storage/storage");

// Best-effort writer for the small public JSON manifests that back
// crawler-facing link previews (see frontend/api/og/rooms/[slug].js).
// Failures here must never break the caller's create/update/delete flow —
// the manifest is a cache of data the live API already serves, not a
// source of truth, so we log and swallow rather than throw.
const ogManifestService = {
  async writeRoomManifest(room) {
    if (!room?.slug) return;
    try {
      await storage.putJson(`${storage.FOLDERS.OG_ROOMS}/${room.slug}.json`, {
        name: room.name,
        description: room.tagline || room.description || "",
        image: room.images?.[0] || null,
        available: room.available !== false,
      });
    } catch (err) {
      console.warn(
        `ogManifestService: failed to write manifest for room "${room.slug}": ${err.message}`,
      );
    }
  },

  async deleteRoomManifest(slug) {
    if (!slug) return;
    await storage.deleteFile(`${storage.FOLDERS.OG_ROOMS}/${slug}.json`);
  },

  async writePaymentMethodManifest(method) {
    if (!method?.slug) return;
    try {
      await storage.putJson(
        `${storage.FOLDERS.OG_PAYMENT_METHODS}/${method.slug}.json`,
        {
          name: method.name,
          image: method.logoUrl || null,
          active: method.isActive !== false,
        },
      );
    } catch (err) {
      console.warn(
        `ogManifestService: failed to write manifest for payment method "${method.slug}": ${err.message}`,
      );
    }
  },

  async deletePaymentMethodManifest(slug) {
    if (!slug) return;
    await storage.deleteFile(
      `${storage.FOLDERS.OG_PAYMENT_METHODS}/${slug}.json`,
    );
  },
};

module.exports = ogManifestService;
