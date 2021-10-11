import React from "react";

// Used while awaiting response from API. Conditional rendering needs to be handled in the parent component.
function LoadingWheel() {
  return (
    <div className="spinner-border text-info mx-auto" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingWheel;
