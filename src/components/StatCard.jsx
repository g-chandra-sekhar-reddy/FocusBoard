export function StatCard({ label, value, detail, icon: Icon, meter }) {
  return (
    <article className="stat-card">
      <div className="stat-icon" aria-hidden="true">
        <Icon size={20} />
      </div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {typeof meter === "number" ? (
        <div
          className="meter"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={meter}
          aria-label="Completion percentage"
        >
          <span style={{ width: `${meter}%` }} />
        </div>
      ) : (
        <p className="stat-detail">{detail}</p>
      )}
    </article>
  );
}
