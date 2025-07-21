export default function UniversalCardLoading() {
  return (
    <div className="card" aria-hidden="true">
      <div className="card-header card-mill-header">
        <span className="placeholder col-12"></span>
      </div>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
          <span className="placeholder col-5"></span>
        </p>
      </div>
      <div className="card-footer card-mill-footer">
        <span className="placeholder col-12"></span>
      </div>
    </div>
  )
}