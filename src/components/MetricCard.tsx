import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="metric-card card card-hover">
      <div className="metric-header">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-icon">{icon}</div>
      </div>
      <div className="metric-value">{value}</div>
      {trend && (
        <div className={`metric-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
    </div>
  );
};
