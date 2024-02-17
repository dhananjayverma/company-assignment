

import React, { useEffect } from "react";
import "../styles/modelcomponent.css";
import Confetti from "react-confetti";

const ModalComponent = ({ onClose, badge, isVisible }) => { 
    useEffect(() => {
        const modalElement = document.querySelector(".modal");
        modalElement.classList.add("celebration");
        return () => {
            modalElement.classList.remove("celebration"); 
        };
    }, []);
    
    return (
        <div className={`modal ${isVisible ? 'is-active' : ''}`}>
            {isVisible && <Confetti recycle={false} />}
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div>
                    <img src={badge?.imageUrl} alt={badge?.name} />
                    <h2>Badge Unlocked! 🌟</h2>
                    <p>🎉 congrates! Earned a shiny new badge! 🥇✨</p>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;

