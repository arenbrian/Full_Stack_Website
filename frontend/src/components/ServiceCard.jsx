export default function ServiceCard({ s }) {
  const payers = (s.payers_supported || []);
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-2">{s.title}</h5>
        <p className="card-text">{s.description || "No description available."}</p>

        <div className="mb-2">
          <small className="text-muted">Covered by:</small>
          <div className="mt-1 d-flex flex-wrap gap-2">
            {payers.length
              ? payers.map(p => (
                  <span key={p} className="badge text-bg-light border">{p}</span>
                ))
              : <span className="badge text-bg-secondary">N/A</span>}
          </div>
        </div>

        {s.service_area && (
          <div className="text-muted"><small><b>Service area:</b> {s.service_area}</small></div>
        )}
        {s.eligibility_note && (
          <div className="mt-2"><small className="text-muted">{s.eligibility_note}</small></div>
        )}
      </div>
    </div>
  );
}
