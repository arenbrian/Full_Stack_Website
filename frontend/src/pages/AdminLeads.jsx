import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { clearToken } from "../auth";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      console.log("Fetching leads...");
      const { data } = await api.get("/leads/");
      console.log("Leads received:", data);
      setLeads(data);
      setError("");
    } catch (err) {
      console.error("Error fetching leads:", err);
      console.error("Error response:", err.response);
      
      if (err.response?.status === 401) {
        clearToken();
        navigate("/login");
      } else {
        setError(err.response?.data?.detail || err.message || "Failed to load leads");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId, newStatus) => {
    try {
      await api.patch(`/leads/${leadId}`, { status: newStatus });
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.detail || err.message));
    }
  };

  const deleteLead = async (leadId) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await api.delete(`/leads/${leadId}`);
      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    } catch (err) {
      alert("Failed to delete lead: " + (err.response?.data?.detail || err.message));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "new":
        return "bg-primary";
      case "contacted":
        return "bg-info";
      case "approved":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leads...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Lead Management</h1>
        <div>
          <button onClick={fetchLeads} className="btn btn-outline-primary me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="me-1"
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            Refresh
          </button>
          <button onClick={handleLogout} className="btn btn-outline-secondary">
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
          <br />
          <small className="mt-2 d-block">Check browser console for more details</small>
        </div>
      )}

      {!error && leads.length === 0 && (
        <div className="alert alert-info">
          <h5>No leads yet</h5>
          <p className="mb-0">Leads will appear here when someone submits the contact form.</p>
        </div>
      )}

      {!error && leads.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Relationship</th>
                <th>Payer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>
                    <strong>{lead.full_name}</strong>
                  </td>
                  <td>
                    {lead.phone && (
                      <div>
                        <small>
                          <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                        </small>
                      </div>
                    )}
                    {lead.email && (
                      <div>
                        <small>
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        </small>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="badge bg-light text-dark">
                      {lead.relationship || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark">
                      {lead.payer_type || "N/A"}
                    </span>
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className={`btn btn-sm dropdown-toggle badge ${getStatusBadgeClass(
                          lead.status
                        )}`}
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {lead.status}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => updateStatus(lead.id, "new")}
                          >
                            New
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => updateStatus(lead.id, "contacted")}
                          >
                            Contacted
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => updateStatus(lead.id, "approved")}
                          >
                            Approved
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => updateStatus(lead.id, "rejected")}
                          >
                            Rejected
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <small className="text-muted">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-1"
                      data-bs-toggle="modal"
                      data-bs-target={`#detailsModal${lead.id}`}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteLead(lead.id)}
                    >
                      Delete
                    </button>

                    {/* Details Modal */}
                    <div
                      className="modal fade"
                      id={`detailsModal${lead.id}`}
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Lead Details</h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <strong>Full Name:</strong>
                                <p>{lead.full_name}</p>
                              </div>
                              <div className="col-md-6">
                                <strong>Status:</strong>
                                <p>
                                  <span
                                    className={`badge ${getStatusBadgeClass(
                                      lead.status
                                    )}`}
                                  >
                                    {lead.status}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <strong>Phone:</strong>
                                <p>{lead.phone || "N/A"}</p>
                              </div>
                              <div className="col-md-6">
                                <strong>Email:</strong>
                                <p>{lead.email || "N/A"}</p>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <strong>Relationship:</strong>
                                <p>{lead.relationship || "N/A"}</p>
                              </div>
                              <div className="col-md-6">
                                <strong>Payer Type:</strong>
                                <p>{lead.payer_type || "N/A"}</p>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-12">
                                <strong>State Program:</strong>
                                <p>{lead.state_program || "N/A"}</p>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-12">
                                <strong>Needs Summary:</strong>
                                <p>{lead.needs_summary || "N/A"}</p>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-12">
                                <strong>Preferred Schedule:</strong>
                                <p>{lead.preferred_schedule || "N/A"}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <strong>Created:</strong>
                                <p>
                                  {new Date(
                                    lead.created_at
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <strong>Source:</strong>
                                <p>{lead.source}</p>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}