
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`glass rounded-2xl p-6 glow-cyan-border ${className}`}>
      {children}
    </div>
  );
};
