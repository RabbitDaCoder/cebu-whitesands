import { useEffect, useState } from "react";
import { getPaymentDetails, updatePaymentDetails } from "../../services/api";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

const inputClass =
  "w-full border border-ocean/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors";

export default function PaymentSettingsPage() {
  const [form, setForm] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    instructions: "",
    gcashName: "",
    gcashNumber: "",
    gcashInstructions: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPaymentDetails().then((res) => {
      const d = res.data.data || res.data;
      setForm({
        accountName: d.accountName || "",
        accountNumber: d.accountNumber || "",
        bankName: d.bankName || "",
        instructions: d.instructions || "",
        gcashName: d.gcashName || "",
        gcashNumber: d.gcashNumber || "",
        gcashInstructions: d.gcashInstructions || "",
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updatePaymentDetails(form);
      toast.success("Payment settings updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-teal-dark font-semibold mb-1">
          Configuration
        </p>
        <h2 className="font-serif text-2xl text-ocean">Payment Settings</h2>
        <p className="text-ocean/40 text-sm mt-1">
          Bank and GCash details shown to guests at checkout
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* Online Transfer Section */}
        <div className="bg-white border border-ocean/10 p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg text-ocean mb-1">
              Online Transfer
            </h3>
            <p className="text-sm text-ocean/40">
              Bank details shown to guests who choose online transfer.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              Bank Name
            </label>
            <input
              type="text"
              value={form.bankName}
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              Account Name
            </label>
            <input
              type="text"
              value={form.accountName}
              onChange={(e) =>
                setForm({ ...form, accountName: e.target.value })
              }
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={form.accountNumber}
              onChange={(e) =>
                setForm({ ...form, accountNumber: e.target.value })
              }
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              Payment Instructions
            </label>
            <textarea
              rows={3}
              value={form.instructions}
              onChange={(e) =>
                setForm({ ...form, instructions: e.target.value })
              }
              placeholder="e.g., Please include your booking reference in the transfer note."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* GCash Section */}
        <div className="bg-white border border-ocean/10 p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg text-ocean mb-1">GCash</h3>
            <p className="text-sm text-ocean/40">
              GCash details shown to guests who choose GCash. Leave blank to
              hide this option from guests.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              GCash Name
            </label>
            <input
              type="text"
              value={form.gcashName}
              onChange={(e) => setForm({ ...form, gcashName: e.target.value })}
              placeholder="e.g., Discovery Samal Resort"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              GCash Number
            </label>
            <input
              type="text"
              value={form.gcashNumber}
              onChange={(e) =>
                setForm({ ...form, gcashNumber: e.target.value })
              }
              placeholder="e.g., 09171234567"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2">
              GCash Instructions
            </label>
            <textarea
              rows={3}
              value={form.gcashInstructions}
              onChange={(e) =>
                setForm({ ...form, gcashInstructions: e.target.value })
              }
              placeholder="e.g., Send to the number above and include your booking reference."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-ocean text-ivory text-[11px] font-semibold uppercase tracking-[0.18em] px-8 py-3 hover:bg-teal transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={13} />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
