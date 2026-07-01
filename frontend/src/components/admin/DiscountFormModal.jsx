import { useState } from "react";
import { createDiscount, updateDiscount } from "../../services/api";

export default function DiscountFormModal({
  discount,
  rooms,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(
    discount
      ? {
          ...discount,
          rooms: discount.rooms?.map((r) => r._id || r) || [],
          startDate: discount.startDate?.split("T")[0] || "",
          endDate: discount.endDate?.split("T")[0] || "",
        }
      : {
          name: "",
          type: "percentage",
          value: 30,
          appliesTo: "all",
          rooms: [],
          categories: [],
          startDate: "",
          endDate: "",
          active: true,
          label: "",
          minimumNights: 1,
        },
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (discount) {
        await updateDiscount(discount._id, form);
      } else {
        await createDiscount(form);
      }
      onSave();
    } catch {
      alert("Failed to save discount");
    } finally {
      setSaving(false);
    }
  }

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ocean/15">
          <h2 className="font-serif text-xl text-ocean">
            {discount ? "Edit Discount" : "New Discount"}
          </h2>
          <button
            onClick={onClose}
            className="text-ocean/40 hover:text-ocean text-2xl leading-none"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">
              Discount Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Summer Sale 2026"
              required
              className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">
              Display Label
              <span className="text-ocean/40 font-normal ml-1">
                (shown on room cards)
              </span>
            </label>
            <input
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="e.g. 30% OFF"
              className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
            />
          </div>

          {/* Type + Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ocean mb-1">
                Discount Type *
              </label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (PHP)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ocean mb-1">
                Value *
              </label>
              <input
                type="number"
                min="1"
                max={form.type === "percentage" ? 100 : undefined}
                value={form.value}
                onChange={(e) => set("value", Number(e.target.value))}
                placeholder={form.type === "percentage" ? "30" : "500"}
                required
                className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
              />
              <p className="text-xs text-ocean/40 mt-1">
                {form.type === "percentage"
                  ? "Enter 30 for 30% off"
                  : "Enter 500 for PHP500 off/night"}
              </p>
            </div>
          </div>

          {/* Applies To */}
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">
              Applies To
            </label>
            <select
              value={form.appliesTo}
              onChange={(e) => set("appliesTo", e.target.value)}
              className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
            >
              <option value="all">All Rooms</option>
              <option value="specific_rooms">Specific Rooms</option>
              <option value="categories">Room Categories</option>
            </select>
          </div>

          {/* Room selector */}
          {form.appliesTo === "specific_rooms" && (
            <div>
              <label className="block text-sm font-medium text-ocean mb-2">
                Select Rooms
              </label>
              <div className="border border-ocean/15 max-h-40 overflow-y-auto p-2 space-y-1">
                {rooms.map((room) => (
                  <label
                    key={room._id}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:bg-ivory/50 p-1"
                  >
                    <input
                      type="checkbox"
                      checked={form.rooms.includes(room._id)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...form.rooms, room._id]
                          : form.rooms.filter((id) => id !== room._id);
                        set("rooms", updated);
                      }}
                      className="accent-teal"
                    />
                    {room.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Category selector */}
          {form.appliesTo === "categories" && (
            <div>
              <label className="block text-sm font-medium text-ocean mb-2">
                Select Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Standard",
                  "Premium",
                  "Luxury",
                  "Deluxe",
                  "Premier",
                  "Loft",
                  "Annex",
                  "Villa",
                  "Cabin",
                  "Dormitory",
                ].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.categories.includes(cat)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...form.categories, cat]
                          : form.categories.filter((c) => c !== cat);
                        set("categories", updated);
                      }}
                      className="accent-teal"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Date range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ocean mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={form.startDate?.split("T")[0] || ""}
                onChange={(e) => set("startDate", e.target.value)}
                required
                className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ocean mb-1">
                End Date *
              </label>
              <input
                type="date"
                value={form.endDate?.split("T")[0] || ""}
                onChange={(e) => set("endDate", e.target.value)}
                required
                className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          {/* Min nights */}
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">
              Minimum Nights
            </label>
            <input
              type="number"
              min="1"
              value={form.minimumNights}
              onChange={(e) => set("minimumNights", Number(e.target.value))}
              className="w-full border border-ocean/20 px-3 py-2 text-sm focus:outline-none focus:border-teal"
            />
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => set("active", e.target.checked)}
              className="accent-teal w-4 h-4"
            />
            <label
              htmlFor="active"
              className="text-sm text-ocean cursor-pointer"
            >
              Discount is active
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-teal text-ocean py-3 text-sm uppercase tracking-wider hover:bg-ocean disabled:opacity-50 transition-colors"
            >
              {saving
                ? "Saving..."
                : discount
                  ? "Update Discount"
                  : "Create Discount"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 border border-ocean/20 text-ocean/70 text-sm hover:bg-ivory/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
