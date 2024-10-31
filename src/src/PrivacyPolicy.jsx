import React, { useState } from 'react';
import './index.css';

const PrivacyPolicy = ({ onClose }) => {
    const policyContent = [
        {
            question: "Why do we collect your location?",
            answer: "We collect your location to provide personalized weather forecasts that are accurate and relevant to your area."
        },
        {
            question: "How do we use your data?",
            answer: "Your location data is only used to enhance your experience in the app. It is not shared with third parties."
        },
        {
            question: "Can I use the app without sharing my location?",
            answer: "Yes, you can still access the app by entering a location manually. However, sharing your location provides more accurate forecasts."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const togglePolicy = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1>Privacy Policy</h1>
            <div className="faq-list">
                {policyContent.map((policy, index) => (
                    <div key={index} className="faq-item">
                        <button className="faq-toggle" onClick={() => togglePolicy(index)}>
                            {openIndex === index ? '− ' : '+'} {policy.question}
                        </button>
                        {openIndex === index && (
                            <div className="faq-content">
                                <h1 className="faq-question">{policy.question}</h1>
                                <p className="faq-answer">{policy.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={onClose} className="faq-toggl">I Understand</button>
        </div>
    );
};

export default PrivacyPolicy;
