import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save, Phone, Mail, MessageCircle, Link2, Users } from "lucide-react";
import { getSocialLinks, updateSocialLinks } from "../../services/api";

const inputClass =
  "w-full border border-ocean/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors";

const labelClass =
  "block text-[11px] font-medium text-ocean/50 uppercase tracking-[0.12em] mb-2";

export default function SocialManager() {
  const [form, setForm] = useState({
    facebookUrl: "",
    phone: "",
    whatsapp: "",
    email: "",
    maxGuestsPerBooking: 50,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSocialLinks()
      .then((res) => {
        const d = res.data.data || {};
        setForm({
          facebookUrl: d.facebookUrl || "",
          phone: d.phone || "",
          whatsapp: d.whatsapp || "",
          email: d.email || "",
          maxGuestsPerBooking: d.maxGuestsPerBooking ?? 50,
        });
      })
      .catch(() => {});
  }, []);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSocialLinks({
        ...form,
        maxGuestsPerBooking: Number(form.maxGuestsPerBooking) || 50,
      });
      toast.success("Contact details saved");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
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
        <h2 className="font-serif text-2xl text-ocean">Social & Contact</h2>
        <p className="text-ocean/40 text-sm mt-1">
          Contact details and social links shown on public pages
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* Contact Info */}
        <div className="bg-white border border-ocean/10 p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg text-ocean mb-1">
              Contact Information
            </h3>
            <p className="text-sm text-ocean/40">
              Updates take effect immediately on all public pages.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              <Phone size={10} className="inline mr-1.5" />
              Phone Number
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="+63 912 345 6789"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <MessageCircle size={10} className="inline mr-1.5" />
              WhatsApp Number
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={handleChange("whatsapp")}
              placeholder="+63 912 345 6789"
              className={inputClass}
            />
            <p className="mt-1.5 text-[11px] text-ocean/35">
              Used for the WhatsApp chat button. Include country code.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              <Mail size={10} className="inline mr-1.5" />
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="reservations@your-resort.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border border-ocean/10 p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg text-ocean mb-1">
              Social Links
            </h3>
            <p className="text-sm text-ocean/40">
              Shown in the footer and contact page.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              <Link2 size={10} className="inline mr-1.5" />
              Facebook Page URL
            </label>
            <input
              type="url"
              value={form.facebookUrl}
              onChange={handleChange("facebookUrl")}
              placeholder="https://facebook.com/yourpage"
              className={inputClass}
            />
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white border border-ocean/10 p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg text-ocean mb-1">
              Booking Limits
            </h3>
            <p className="text-sm text-ocean/40">
              Enforced during the booking flow.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              <Users size={10} className="inline mr-1.5" />
              Max Guests Per Booking
            </label>
            <input
              type="number"
              min={1}
              max={500}
              value={form.maxGuestsPerBooking}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  maxGuestsPerBooking: parseInt(e.target.value) || 50,
                }))
              }
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-ocean px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          <Save size={13} />
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
