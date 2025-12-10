import React, { useState } from 'react';
import './MailPreviewModal.css';

const MailPreviewModal = ({ message, isOpen, onClose }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  if (!isOpen || !message) return null;

  const handleSendReply = () => {
    console.log('Reply sent:', replyMessage);
    setReplyMessage('');
    setShowReply(false);
  };

  const handleCancel = () => {
    setReplyMessage('');
    setShowReply(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Message Preview Section */}
        <div className="mail-preview-section">
          <div className="preview-header">
            <div className="preview-header-top">
              <div className="sender-info">
                <div className="sender-avatar">{message.name.charAt(0)}</div>
                <div className="sender-details">
                  <h3 className="sender-name">{message.name}</h3>
                  <p className="sender-email">{message.email}</p>
                </div>
              </div>
              <span className="message-date">{message.date}</span>
            </div>
            <h2 className="message-subject">Subject: {message.subject}</h2>
          </div>

          <div className="message-body">
            <p>{message.message || 'Hi! I\'m looking for a talented designer to help redesign our company website. We need a modern, responsive design that works well on all devices. Our budget is flexible for the right candidate.'}</p>
          </div>

          <div className="preview-actions">
            <button 
              className="btn-reply"
              onClick={() => setShowReply(!showReply)}
            >
              ↩ Reply to Message
            </button>
          </div>
        </div>

        {/* Reply Section */}
        {showReply && (
          <div className="reply-section">
            <div className="reply-header">
              <p className="reply-label">To: <span>{message.email}</span></p>
              <p className="reply-subject">Subject: Re: {message.subject}</p>
            </div>

            <div className="reply-form">
              <label className="form-label">Your Message</label>
              <textarea
                className="reply-textarea"
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows="6"
              />

              <div className="reply-actions">
                <button 
                  className="btn-send"
                  onClick={handleSendReply}
                >
                  ✈ Send Reply
                </button>
                <button 
                  className="btn-cancel-reply"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailPreviewModal;
