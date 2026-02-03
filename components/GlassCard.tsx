
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`glass rounded-2xl p-6 relative overflow-hidden ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold font-orbitron text-cyan-400">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCard;
