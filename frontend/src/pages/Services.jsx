import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_API } from "../publicapi";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      console.log("Fetching services from:", PUBLIC_API.defaults.baseURL + "/services/");
      const { data } = await PUBLIC_API.get("/services/");
      console.log("Services data received:", data);
      setServices(data);
      setError("");
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(err.response?.data?.detail || err.message || "Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="display-4 mb-3">Our Services</h1>
          <p className="lead">
            Comprehensive homecare solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="section">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading services...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
              <br />
              <small>Make sure your backend is running on http://localhost:8000</small>
            </div>
          )}

          {!loading && !error && services.length === 0 && (
            <div className="alert alert-info" role="alert">
              <h5>No services available yet</h5>
              <p className="mb-0">Services will appear here once they are added by an administrator.</p>
            </div>
          )}

          {!loading && !error && services.length > 0 && (
            <>
              <div className="text-center mb-5">
                <p className="text-muted">We offer {services.length} comprehensive care services</p>
              </div>
              <div className="row g-4">
                {services.map((service) => (
                  <div key={service.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start mb-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "50px",
                              height: "50px",
                              background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))"
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="white"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="card-title mb-2">{service.title}</h4>
                          </div>
                        </div>
                        <p className="card-text text-muted">{service.description}</p>
                        {service.covered_by && (
                          <div className="mt-3 pt-3 border-top">
                            <small className="text-muted d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="var(--brand-accent)"
                                className="me-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                              </svg>
                              <strong>Coverage:</strong>&nbsp;{service.covered_by}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Coverage Information Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Insurance & Payment Options</h2>
            <p className="text-muted lead">We work with various payment methods</p>
          </div>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="var(--brand-primary)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v2h-1v-2a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5H6v1H2.5A1.5 1.5 0 0 1 1 13.5v-11z"/>
                      <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Medicaid</h5>
                  <p className="card-text text-muted">
                    We accept most Medicaid plans
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="var(--brand-accent)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Medicare</h5>
                  <p className="card-text text-muted">
                    Medicare-covered services available
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="var(--brand-primary)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                      <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Private Pay</h5>
                  <p className="card-text text-muted">
                    Flexible payment plans
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="var(--brand-accent)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Insurance</h5>
                  <p className="card-text text-muted">
                    Work with private insurance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Questions About Our Services?</h2>
          <p className="lead text-muted mb-4">
            Get in touch with our care coordinators for personalized guidance
          </p>
          <Link to="/contact" className="btn btn-accent btn-lg px-5">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}