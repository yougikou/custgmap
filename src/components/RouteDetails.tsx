import React from 'react';
import { RouteInfo } from '../data/mockRoutes';
import './RouteDetails.scss';

interface RouteDetailsProps {
  route: RouteInfo;
  onBack: () => void;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ route, onBack }) => {
  return (
    <div className="route-details">
      <button className="back-button" onClick={onBack}>
        ← 返回
      </button>
      <div className="route-summary">
        <div className="summary-item">
          <span className="label">总距离:</span>
          <span className="value">{route.totalDistance}</span>
        </div>
        <div className="summary-item">
          <span className="label">预计时间:</span>
          <span className="value">{route.totalDuration}</span>
        </div>
      </div>
      <div className="route-steps">
        {route.steps.map((step, index) => (
          <div key={index} className="step-item">
            <div className="step-icon">{step.icon}</div>
            <div className="step-content">
              <div className="step-instruction">{step.instruction}</div>
              <div className="step-details">
                <span className="step-distance">{step.distance}</span>
                <span className="step-duration">{step.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDetails;
