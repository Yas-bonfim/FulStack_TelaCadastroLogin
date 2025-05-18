import React from "react";
import "./PopupModal.css";

interface PopupModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

const PopupModal: React.FC<PopupModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
