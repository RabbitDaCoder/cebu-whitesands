import { useEffect, useState } from "react";
import {
  getDiscounts,
  deleteDiscount,
  toggleDiscount,
  getRooms,
} from "../../services/api";
import DiscountFormModal from "../../components/admin/DiscountFormModal";

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
    fetchRooms();
  }, []);

  async function fetchDiscounts() {
    const res = await getDiscounts();
    setDiscounts(res.data.data);
    setLoading(false);
  }

  async function fetchRooms() {
    const res = await getRooms();
    const rd = res.data.data || res.data;
    setRooms(Array.isArray(rd) ? rd : []);
  }

  async function handleToggle(id) {
    await toggleDiscount(id);
    fetchDiscounts();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this discount? This cannot be undone.")) return;
    await deleteDiscount(id);
    fetchDiscounts();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold mb-1">
            Promotions
          </p>
          <h2 className="font-serif text-2xl text-ocean">
            Discount Management
          </h2>
          <p className="text-ocean/40 text-sm mt-1">
            Create and manage room discounts and promotions
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-teal text-ocean px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-ocean hover:text-ivory transition-colors flex items-center gap-2"
        >
          <span className="text-base leading-none">+</span> New Discount
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="group border border-ocean/10 bg-white p-5 hover:border-teal/30 hover:shadow-[0_12px_30px_-15px_rgba(11,122,138,0.2)] transition-all duration-300">
          <p className="text-[10px] text-ocean/40 uppercase tracking-[0.22em] font-semibold mb-3">
            Total Discounts
          </p>
          <p className="font-serif text-[28px] text-ocean leading-none">
            {discounts.length}
          </p>
        </div>
        <div className="group border border-ocean/10 bg-white p-5 hover:border-teal/30 hover:shadow-[0_12px_30px_-15px_rgba(11,122,138,0.2)] transition-all duration-300">
          <p className="text-[10px] text-ocean/40 uppercase tracking-[0.22em] font-semibold mb-3">
            Active Now
          </p>
          <p className="font-serif text-[28px] text-teal leading-none">
            {
              discounts.filter(
                (d) => d.active && new Date(d.endDate) >= new Date(),
              ).length
            }
          </p>
        </div>
        <div className="group border border-ocean/10 bg-white p-5 hover:border-red-200/60 hover:shadow-[0_12px_30px_-15px_rgba(239,68,68,0.15)] transition-all duration-300">
          <p className="text-[10px] text-ocean/40 uppercase tracking-[0.22em] font-semibold mb-3">
            Expired
          </p>
          <p className="font-serif text-[28px] text-red-500 leading-none">
            {discounts.filter((d) => new Date(d.endDate) < new Date()).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-ocean/10">
        <table className="w-full text-sm">
          <thead className="bg-ivory/60 border-b border-ocean/10">
            <tr>
              {[
                "Name",
                "Type",
                "Value",
                "Applies To",
                "Period",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3.5 text-[9px] font-semibold text-ocean/45 uppercase tracking-[0.22em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => {
              const now = new Date();
              const expired = new Date(d.endDate) < now;
              const upcoming = new Date(d.startDate) > now;

              return (
                <tr
                  key={d._id}
                  className="border-b border-ocean/5 hover:bg-ivory/40 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-ocean">{d.name}</p>
                    {d.label && (
                      <span className="text-xs text-teal">{d.label}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 capitalize text-ocean/60">
                    {d.type}
                  </td>
                  <td className="px-5 py-4 font-semibold text-teal">
                    {d.type === "percentage" ? `${d.value}%` : `₱${d.value}`}
                  </td>
                  <td className="px-5 py-4 text-ocean/50 text-xs">
                    {d.appliesTo === "all"
                      ? "All Rooms"
                      : d.appliesTo === "specific_rooms"
                        ? `${d.rooms?.length} room(s)`
                        : d.categories?.join(", ")}
                  </td>
                  <td className="px-5 py-4 text-xs text-ocean/50">
                    <p>{new Date(d.startDate).toLocaleDateString()}</p>
                    <p>to {new Date(d.endDate).toLocaleDateString()}</p>
                  </td>
                  <td className="px-5 py-4">
                    {expired ? (
                      <span className="inline-block bg-ocean/5 text-ocean/40 border border-ocean/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-semibold">
                        Expired
                      </span>
                    ) : upcoming ? (
                      <span className="inline-block bg-blue-50 text-blue-600 border border-blue-200/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-semibold">
                        Upcoming
                      </span>
                    ) : d.active ? (
                      <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block bg-red-50 text-red-500 border border-red-200/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] font-semibold">
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditing(d);
                          setShowForm(true);
                        }}
                        className="border border-teal/30 text-teal text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 hover:bg-teal/10 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggle(d._id)}
                        className="border border-ocean/15 text-ocean/50 text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 hover:bg-ocean/5 hover:text-ocean transition-colors"
                      >
                        {d.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="border border-red-200/60 text-red-400 text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!loading && discounts.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-ocean/30">
                  No discounts yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <DiscountFormModal
          discount={editing}
          rooms={rooms}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={() => {
            fetchDiscounts();
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
