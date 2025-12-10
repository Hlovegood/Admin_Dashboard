import React, { useState } from 'react';
import './MailComp.css';

const ContactMessages = () => {
  const [activeTab, setActiveTab] = useState('total');

  const messages = [
    { id: 1, status: 'read', email: 'sarah.johnson@example.com', date: '2h ago' },
    { id: 2, status: 'read', email: 'm.chen@techstartup.io', date: '21h ago' },
    { id: 3, status: 'read', email: 'emma.r@creative.agency', date: 'Yesterday' },
    { id: 4, status: 'new', email: 'david.kim@example.com', date: 'Yesterday' },
    { id: 5, status: 'read', email: 'm.chen@techstartup.io', date: '21h ago' },
    { id: 6, status: 'read', email: 'lisa@nonprofitorg.org', date: '3d ago' },
    { id: 7, status: 'new', email: 'david.kim@example.com', date: 'Yesterday' },
    { id: 8, status: 'read', email: 'm.chen@techstartup.io', date: '21h ago' },
    { id: 9, status: 'new', email: 'david.kim@example.com', date: 'Yesterday' },
    { id: 10, status: 'read', email: 'emma.r@creative.agency', date: 'Yesterday' },
    { id: 11, status: 'read', email: 'm.chen@techstartup.io', date: '21h ago' },
    { id: 12, status: 'new', email: 'david.kim@example.com', date: 'Yesterday' },
    { id: 13, status: 'read', email: 'emma.r@creative.agency', date: 'Yesterday' },
    { id: 14, status: 'read', email: 'emma.r@creative.agency', date: 'Yesterday' },
    { id: 15, status: 'read', email: 'sarah.johnson@example.com', date: '2h ago' },
    { id: 16, status: 'new', email: 'david.kim@example.com', date: 'Yesterday' },
    { id: 17, status: 'read', email: 'emma.r@creative.agency', date: 'Yesterday' },
    { id: 18, status: 'new', email: 'david.kim@example.com', date: 'Yesterday' }
  ];

  return (
    <div className="contact-messages-container">
      <div className="header">
        <div className="header-icon">
          {/* Mail icon placeholder */}
        </div>
        <h1 className="header-title">Contact Form Messages</h1>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'total' ? 'active' : ''}`}
          onClick={() => setActiveTab('total')}
        >
          Total Messages
        </button>
        <button 
          className={`tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          New Messages
        </button>
      </div>

      <div className="messages-table-container">
        <div className="table-header">
          <div className="column-status">Status</div>
          <div className="column-name">Name</div>
          <div className="column-email">Email</div>
          <div className="column-subject">Subject</div>
          <div className="column-date">Date</div>
          <div className="column-actions">Actions</div>
        </div>

        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className="message-row">
              <div className="column-status">
                <div className="status-icon">
                  {/* Mail icon placeholder */}
                </div>
                {message.status === 'new' && (
                  <span className="new-badge">New</span>
                )}
              </div>
              <div className="column-name"></div>
              <div className="column-email">{message.email}</div>
              <div className="column-subject"></div>
              <div className="column-date">{message.date}</div>
              <div className="column-actions">
                <button className="action-btn view-btn">
                  {/* Eye icon placeholder */}
                </button>
                <button className="action-btn delete-btn">
                  {/* Trash icon placeholder */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;