import React from 'react';

const SkeletonLoader: React.FC<{ columns: number }> = ({ columns }) => {
  return (
    <div className="skeleton-loader">
      {Array.from({ length: columns }).map((_, idx) => (
        <div key={idx} className="skeleton-column">
          <div className="skeleton-header"></div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
