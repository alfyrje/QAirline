import React from 'react';
import './ProgressBar.css';

const steps = [
    { label: 'Chuyến bay', id: 'flights' },
    { label: 'Thông tin', id: 'info' },
    { label: 'Ghế ngồi', id: 'seats' },
    { label: 'Hành khách', id: 'passengers' },
];

const ProgressBar = ({ currentStep }) => {
    return (
        <div className="arrow-progress-bar">
            {steps.map((step, index) => (
                <div
                    key={step.id}
                    className={`arrow-step ${currentStep === step.id ? 'active' : ''}`}
                >
                    <span>{step.label}</span>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;