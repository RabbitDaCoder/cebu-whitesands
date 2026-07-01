import { useEffect, useState } from "react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Upload, Image } from "lucide-react";

const CATEGORIES = [
  "Standard",
  "Premium",
  "Luxury",
  "Deluxe",
  "Premier",
  "Loft",
  "Annex",
  "Villa",
  "Dormitory",
  "Cabin",
];

const EMPTY_FORM = {
  name: "",
  description: "",
  pricePerNight: "",
  discountPrice: "",
  discountLabel: "",
  weekendPrice: "",
  minGuests: "",
  maxGuests: "",
  bedType: "",
  size: "",
  features: "",
  note: "",
  category: "Standard",
  available: true,
};

const inputClass =
  "w-full border border-ocean/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors";

export default function ManageRooms() {
  const MAX_IMAGES = 15;
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchRooms = () =>
    getRooms().then((res) => {
      const d = res.data.data || res.data;
      setRooms(Array.isArray(d) ? d : []);
    });

  useEffect(() => {
    fetchRooms();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setFiles([]);
    setEditing(null);
    setExistingImages([]);
    setShowForm(false);
  };

  const startEdit = (room) => {
    setEditing(room._id);
    setForm({
      name: room.name,
      description: room.description,
      pricePerNight: room.pricePerNight,
      discountPrice: room.discountPrice || "",
      discountLabel: room.discountLabel || "",
      weekendPrice: room.weekendPrice || "",
      minGuests:
        room.minGuests ||
        Math.max(
          1,
          (room.maxGuests || 2) - Math.floor((room.maxGuests || 2) * 0.4),
        ),
      maxGuests: room.maxGuests || "",
      bedType: room.bedType || "",
      size: room.size || "",
      features: room.features?.join(", ") || "",
      note: room.note || "",
      category: room.category || "Standard",
      available: room.available,
    });
    setExistingImages(room.images || []);
    setFiles([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("pricePerNight", form.pricePerNight);
    if (form.discountPrice) fd.append("discountPrice", form.discountPrice);
    if (form.discountLabel) fd.append("discountLabel", form.discountLabel);
    if (form.weekendPrice) fd.append("weekendPrice", form.weekendPrice);
    fd.append("minGuests", form.minGuests);
    fd.append("maxGuests", form.maxGuests);
    if (form.bedType) fd.append("bedType", form.bedType);
    if (form.size) fd.append("size", form.size);
    fd.append("category", form.category);
    fd.append("available", form.available);
    fd.append(
      "features",
      JSON.stringify(
        form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      ),
    );
    if (form.note) fd.append("note", form.note);

    if (editing) {
      fd.append("existingImages", JSON.stringify(existingImages));
    }

    for (const file of files) {
      fd.append("images", file);
    }

    try {
      if (editing) {
        await updateRoom(editing, fd);
        toast.success("Room updated");
      } else {
        await createRoom(fd);
        toast.success("Room created");
      }
      resetForm();
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save room");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await deleteRoom(id);
      toast.success("Room deleted");
      fetchRooms();
    } catch {
      toast.error("Failed to delete room");
    }
  };

  const removeExistingImage = (img) => {
    setExistingImages(existingImages.filter((i) => i !== img));
  };

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > MAX_IMAGES) {
      toast.error(`You can upload up to ${MAX_IMAGES} images at once.`);
      setFiles(selected.slice(0, MAX_IMAGES));
      return;
    }
    setFiles(selected);
  };

  return (
    <div>
      {/* Header + add button */}
      {!showForm && (
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold mb-1">
              Inventory
            </p>
            <h2 className="font-serif text-2xl text-ocean">Room Management</h2>
            <p className="text-ocean/40 text-sm mt-1">
              {rooms.length} room{rooms.length !== 1 ? "s" : ""} in your inventory
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal text-ocean text-[11px] font-semibold uppercase tracking-[0.18em] px-6 py-3 hover:bg-ocean hover:text-ivory transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> Add Room
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-ocean/10 p-6 lg:p-8 mb-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold mb-1">
                {editing ? "Edit" : "New"}
              </p>
              <h2 className="font-serif text-xl text-ocean">
                {editing ? "Edit Room" : "New Room"}
              </h2>
            </div>
            <button
              onClick={resetForm}
              className="text-ocean/30 hover:text-ocean/60 transition-colors mt-1"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className={`${inputClass} bg-white`}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Price / Night (PHP)
                </label>
                <input
                  type="number"
                  value={form.pricePerNight}
                  onChange={(e) =>
                    setForm({ ...form, pricePerNight: e.target.value })
                  }
                  required
                  min="0"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Discount Price
                </label>
                <input
                  type="number"
                  value={form.discountPrice}
                  onChange={(e) =>
                    setForm({ ...form, discountPrice: e.target.value })
                  }
                  min="0"
                  className={inputClass}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Discount Label
                </label>
                <input
                  type="text"
                  value={form.discountLabel}
                  onChange={(e) =>
                    setForm({ ...form, discountLabel: e.target.value })
                  }
                  className={inputClass}
                  placeholder="e.g. 30% OFF"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Weekend Price
                </label>
                <input
                  type="number"
                  value={form.weekendPrice}
                  onChange={(e) =>
                    setForm({ ...form, weekendPrice: e.target.value })
                  }
                  min="0"
                  className={inputClass}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Good For (Min)
                </label>
                <input
                  type="number"
                  value={form.minGuests}
                  onChange={(e) =>
                    setForm({ ...form, minGuests: e.target.value })
                  }
                  required
                  min="1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Max Capacity
                </label>
                <input
                  type="number"
                  value={form.maxGuests}
                  onChange={(e) =>
                    setForm({ ...form, maxGuests: e.target.value })
                  }
                  required
                  min="1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                  Room Size
                </label>
                <input
                  type="text"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. 35 sqm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                Bed Type
              </label>
              <input
                type="text"
                value={form.bedType}
                onChange={(e) => setForm({ ...form, bedType: e.target.value })}
                className={inputClass}
                placeholder="e.g. 1 Double sized and 1 Semi Double sized"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                Features (comma-separated)
              </label>
              <input
                type="text"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="WiFi, AC, TV, Mini Bar"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
                Room Note
                <span className="text-ocean/30 font-normal ml-1">
                  (shown as green callout on card)
                </span>
              </label>
              <input
                type="text"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="e.g. Includes complimentary breakfast"
                className={inputClass}
              />
            </div>

            {/* Existing images */}
            {editing && existingImages.length > 0 && (
              <div>
                <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-3">
                  Current Images
                </label>
                <div className="flex gap-3 flex-wrap">
                  {existingImages.map((img) => (
                    <div key={img} className="relative w-24 h-24 group">
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover border border-ocean/10"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img)}
                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload */}
            <div>
              <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-3">
                {editing ? "Add New Images" : "Images"}
              </label>
              <label className="flex items-center justify-center gap-3 border-2 border-dashed border-ocean/10 py-8 cursor-pointer hover:border-teal/40 transition-colors">
                <Upload size={18} className="text-ocean/30" />
                <span className="text-sm text-ocean/40">
                  {files.length > 0
                    ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                    : `Click to upload images (up to ${MAX_IMAGES})`}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Available toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, available: !form.available })}
                className={`w-10 h-6 flex items-center px-0.5 transition-colors ${
                  form.available ? "bg-teal" : "bg-ocean/15"
                }`}
              >
                <span
                  className={`w-5 h-5 bg-white shadow-sm transition-transform ${
                    form.available ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-ocean/70">
                Available for booking
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.18em] px-8 py-3 hover:bg-ocean transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  "Saving..."
                ) : editing ? (
                  <>
                    <Pencil size={13} /> Update
                  </>
                ) : (
                  <>
                    <Plus size={13} /> Create
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-ocean/10 text-ocean/50 text-[11px] font-medium uppercase tracking-[0.18em] px-8 py-3 hover:bg-ocean/3 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Room list */}
      {rooms.length === 0 ? (
        <div className="text-center py-20">
          <Image size={32} className="text-ocean/15 mx-auto mb-4" />
          <p className="text-sm text-ocean/40">No rooms yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white border border-ocean/10 p-5 flex items-start gap-5 hover:border-teal/30 hover:shadow-[0_8px_24px_-12px_rgba(11,122,138,0.18)] transition-all duration-300"
            >
              {/* Thumbnail */}
              {room.images?.[0] ? (
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-20 h-20 object-cover shrink-0 border border-ocean/5"
                />
              ) : (
                <div className="w-20 h-20 bg-ocean/5 flex items-center justify-center shrink-0">
                  <Image size={18} className="text-ocean/20" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-serif text-base text-ocean mb-0.5">
                      {room.name}
                    </h4>
                    <p className="text-xs text-ocean/40 truncate max-w-md">
                      {room.description}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(room)}
                      className="p-2 text-ocean/30 hover:text-teal transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="p-2 text-ocean/30 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs">
                  <span className="text-teal font-medium">
                    ₱{room.pricePerNight?.toLocaleString()}
                    <span className="text-ocean/30 font-normal">/night</span>
                  </span>
                  {room.weekendPrice && (
                    <span className="text-ocean/50">
                      Weekend ₱{room.weekendPrice.toLocaleString()}
                    </span>
                  )}
                  {room.discountPrice && room.discountLabel && (
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-medium">
                      {room.discountLabel} — ₱
                      {room.discountPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-ocean/40">
                    Good for{" "}
                    {room.minGuests ||
                      Math.max(
                        1,
                        (room.maxGuests || 2) -
                          Math.floor((room.maxGuests || 2) * 0.4),
                      )}{" "}
                    guests
                  </span>
                  <span className="text-ocean/40">
                    Max {room.maxGuests || room.capacity || room.occupancy || 2}{" "}
                    guests
                  </span>
                  <span className="bg-teal/10 text-teal px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-medium">
                    {room.category}
                  </span>
                  {!room.available && (
                    <span className="bg-red-50 text-red-500 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-medium">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
