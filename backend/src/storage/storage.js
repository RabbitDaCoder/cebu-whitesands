const {
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } = require("./providers/r2");

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// Folder constants — all nested under the project root
const FOLDERS = {
  ROOMS: "cebu-whitesand-resort/rooms",
  PAYMENTS: "cebu-whitesand-resort/payments",
  RECEIPTS: "cebu-whitesand-resort/receipts",
  SOCIAL: "cebu-whitesand-resort/social-media-posts",
  PROFILES: "cebu-whitesand-resort/profiles",
  LOGOS: "cebu-whitesand-resort/logos",
  DOCUMENTS: "cebu-whitesand-resort/documents",
  OG_ROOMS: "cebu-whitesand-resort/og/rooms",
  OG_PAYMENT_METHODS: "cebu-whitesand-resort/og/payment-methods",
};

/**
 * Generate a unique key for an uploaded file.
 * @param {object} file - Multer file object { originalname, mimetype }
 * @param {string} folder - Destination folder (use FOLDERS constants)
 * @returns {string} e.g. "cebu-whitesand-resort/rooms/abc123.jpg"
 */
function generateUniqueFilename(file, folder) {
  const ext =
    mime.extension(file.mimetype) ||
    path.extname(file.originalname).replace(".", "") ||
    "bin";
  return `${folder}/${uuidv4()}.${ext}`;
}

/**
 * Upload a file to R2.
 * @param {object} file - Multer memory-storage object { buffer, mimetype, size, originalname }
 * @param {string} folder - Destination folder path
 * @returns {Promise<{ key: string, url: string, filename: string, mimetype: string, size: number }>}
 */
async function uploadFile(file, folder) {
  if (!file || !file.buffer) {
    throw new Error("uploadFile: file.buffer is required");
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new Error(
      `uploadFile: MIME type "${file.mimetype}" is not allowed. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `uploadFile: file size ${file.size} bytes exceeds the 10 MB limit`,
    );
  }

  const key = generateUniqueFilename(file, folder);

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size || file.buffer.length,
    }),
  );

  return {
    key,
    url: getFileUrl(key),
    filename: path.basename(key),
    mimetype: file.mimetype,
    size: file.size || file.buffer.length,
  };
}

/**
 * Write a small public JSON object to R2 at an exact key (no unique-name
 * generation — callers pass a deterministic key, e.g. for OG preview
 * manifests keyed by slug).
 * @param {string} key
 * @param {object} data
 */
async function putJson(key, data) {
  const body = JSON.stringify(data);
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: "application/json",
      ContentLength: Buffer.byteLength(body),
    }),
  );
  return { key, url: getFileUrl(key) };
}

/**
 * Delete a file from R2 by its key. Errors are swallowed (idempotent).
 * @param {string} key
 */
async function deleteFile(key) {
  if (!key) return;
  try {
    await r2Client.send(
      new DeleteObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }),
    );
  } catch (err) {
    // Swallow — deletion is best-effort
    console.warn(`deleteFile: failed to delete key "${key}": ${err.message}`);
  }
}

/**
 * Return the public URL for a stored key.
 * @param {string} key
 * @returns {string}
 */
function getFileUrl(key) {
  return `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}

/**
 * Check whether an object exists in R2.
 * @param {string} key
 * @returns {Promise<boolean>}
 */
async function fileExists(key) {
  try {
    await r2Client.send(
      new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }),
    );
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  uploadFile,
  putJson,
  deleteFile,
  getFileUrl,
  generateUniqueFilename,
  fileExists,
  FOLDERS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
};
