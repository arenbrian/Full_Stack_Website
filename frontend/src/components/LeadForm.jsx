import { useState } from "react";
import { PUBLIC_API } from "../publicapi";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    relationship: "",
    payer_type: "",
    state_program: "",
    needs_summary: "",
    preferred_schedule: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await PUBLIC_API.post("/leads/", formData);
      setSuccess(true);
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        relationship: "",
        payer_type: "",
        state_program: "",
        needs_summary: "",
        preferred_schedule: "",
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h3 className="card-title mb-4">Request Care Information</h3>
        
        {success && (
          <div className="alert alert-success" role="alert">
            Thank you! We'll contact you soon to discuss your care needs.
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          {/* Relationship */}
          <div className="mb-3">
            <label htmlFor="relationship" className="form-label">
              Relationship to Care Recipient
            </label>
            <select
              className="form-select"
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="self">Self</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="other">Other Family Member</option>
            </select>
          </div>

          {/* Payer Type */}
          <div className="mb-3">
            <label htmlFor="payer_type" className="form-label">
              How will you pay for care?
            </label>
            <select
              className="form-select"
              id="payer_type"
              name="payer_type"
              value={formData.payer_type}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="medicaid">Medicaid</option>
              <option value="medicare">Medicare</option>
              <option value="private">Private Pay</option>
              <option value="insurance">Private Insurance</option>
              <option value="unsure">Not Sure</option>
            </select>
          </div>

          {/* State Program */}
          <div className="mb-3">
            <label htmlFor="state_program" className="form-label">
              State Program (if applicable)
            </label>
            <input
              type="text"
              className="form-control"
              id="state_program"
              name="state_program"
              value={formData.state_program}
              onChange={handleChange}
              placeholder="e.g., CDPAP, MLTC"
            />
          </div>

          {/* Needs Summary */}
          <div className="mb-3">
            <label htmlFor="needs_summary" className="form-label">
              Briefly describe care needs
            </label>
            <textarea
              className="form-control"
              id="needs_summary"
              name="needs_summary"
              rows="4"
              value={formData.needs_summary}
              onChange={handleChange}
              placeholder="Tell us about the type of care needed..."
            ></textarea>
          </div>

          {/* Preferred Schedule */}
          <div className="mb-3">
            <label htmlFor="preferred_schedule" className="form-label">
              Preferred Schedule
            </label>
            <input
              type="text"
              className="form-control"
              id="preferred_schedule"
              name="preferred_schedule"
              value={formData.preferred_schedule}
              onChange={handleChange}
              placeholder="e.g., Weekdays 9am-5pm"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}