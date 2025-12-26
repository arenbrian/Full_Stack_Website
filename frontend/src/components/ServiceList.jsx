import { useEffect, useState } from "react";
import axios from "axios";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/services/");
        if (alive) setServices(data);
      } catch (e) {
        console.error("Failed to load services:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <p>Loading services…</p>;
  if (!services.length) return <p>No services available.</p>;

  return (
    <div className="row g-4">
      {services.map((s) => (
        <div className="col-12 col-md-6 col-lg-4" key={s.id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{s.title}</h5>
              <p className="card-text">{s.description}</p>
              {s.covered_by && (
                <p className="small text-muted mb-0">
                  <strong>Covered by:</strong> {s.covered_by}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
