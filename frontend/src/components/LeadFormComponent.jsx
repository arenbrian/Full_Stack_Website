import { useState } from "react";
import axios from "axios";

const initial = {
  full_name: "",
  phone: "",
  email: "",
  relationship: "",
  payer_type: "",
  state_program: "",
  needs_summary: "",
  preferred_schedule: "",
};

export default function LeadFormComponent() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);
    try {
      await axios.post("http://localhost:8000/leads/", form); // public endpoint
      setOk(true);
      setForm(initial);
    } catch (err) {
      console.error(err);
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: 720 }}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full name</label>
          <input name="full_name" className="form-control" value={form.full_name} onChange={onChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input name="phone" className="form-control" value={form.phone} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Relationship</label>
          <input name="relationship" className="form-control" value={form.relationship} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Payer Type</label>
          <input name="payer_type" className="form-control" value={form.payer_type} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">State Program</label>
          <input name="state_program" className="form-control" value={form.state_program} onChange={onChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Needs Summary</label>
          <textarea name="needs_summary" className="form-control" rows="3" value={form.needs_summary} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Preferred Schedule</label>
          <input name="preferred_schedule" className="form-control" value={form.preferred_schedule} onChange={onChange} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary px-4" disabled={submitting}>
            {submitting ? "Sending…" : "Submit Request"}
          </button>
          {ok === true && <span className="text-success ms-3">Thanks! We’ll reach out shortly.</span>}
          {ok === false && <span className="text-danger ms-3">Something went wrong. Please try again.</span>}
        </div>
      </div>
    </form>
  );
}
