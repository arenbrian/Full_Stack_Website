import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="display-1 fw-bold" style={{ color: "var(--brand-primary)" }}>
            404
          </h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead text-muted mb-4">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}