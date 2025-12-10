import React, { useState } from "react";
import "./MailComp.css";
import MailOpen from "../assets/Icons/New Mail Icon.svg";
import Trash from "../assets/Icons/Trash Icon.svg";
import Eye from "../assets/Icons/Eye Icon.svg";
import MailPreviewModal from "./MailPreviewModal";

const ContactMessages = () => {
  const [activeTab, setActiveTab] = useState("total");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const messages = [
    {
      id: 1,
      name: "Sarah Johnson",
      status: "read",
      subject:"Website Redesign Project",
      email: "sarah.johnson@example.com",
      date: "2h ago",
    },
    { id: 2, name: "Mark Chen", status: "read", subject:"Website Redesign Project", email: "m.chen@techstartup.io", date: "21h ago" },
    {
      id: 3,
      status: "read",
      name: "Emma Robinson",
      subject:"Website Redesign Project",
      email: "emma.r@creative.agency",
      date: "Yesterday",
    },
    { id: 4, name: "Davud Kim", status: "new", subject:"Website Redesign Project", email: "david.kim@example.com", date: "Yesterday" },
    { id: 5, name: "Mark Chen", status: "read", subject:"Website Redesign Project", email: "m.chen@techstartup.io", date: "21h ago" },
    { id: 6, name: "Lisa Armstrong", status: "read", subject:"Website Redesign Project", email: "lisa@nonprofitorg.org", date: "3d ago" },
    { id: 7, name: "David Kim", status: "new", subject:"Website Redesign Project", email: "david.kim@example.com", date: "Yesterday" },
    { id: 8, name: "Mark Chen", status: "read", subject:"Website Redesign Project", email: "m.chen@techstartup.io", date: "21h ago" },
    { id: 9, name: "David Kim", status: "new", subject:"Website Redesign Project", email: "david.kim@example.com", date: "Yesterday" },
    {
      id: 10,
      name: "Emma Robinson",
      status: "read",
      subject:"Website Redesign Project",
      email: "emma.r@creative.agency",
      date: "Yesterday",
    },
    { id: 11, name: "Mark Chen", status: "read", subject:"Website Redesign Project", email: "m.chen@techstartup.io", date: "21h ago" },
    {
      id: 12,
      name: "David Kim",
      status: "new",
      subject:"Website Redesign Project",
      email: "david.kim@example.com",
      date: "Yesterday",
    },
    {
      id: 13,
      name: "Emma Robinson",
      status: "read",
      subject:"Website Redesign Project",
      email: "emma.r@creative.agency",
      date: "Yesterday",
    },
    {
      id: 14,
      name: "Emma Robinson",
      status: "read",
      subject:"Website Redesign Project",
      email: "emma.r@creative.agency",
      date: "Yesterday",
    },
    {
      id: 15,
      status: "read",
      name: "Sarah Johnson",
      subject:"Website Redesign Project",
      email: "sarah.johnson@example.com",
      date: "2h ago",
    },
    {
      id: 16,
      name: "David Kim",
      status: "new",
      subject:"Website Redesign Project",
      email: "david.kim@example.com",
      date: "Yesterday",
    },
    {
      id: 17,
      name: "Emma Robinson",
      status: "read",
      subject:"Website Redesign Project",
      email: "emma.r@creative.agency",
      date: "Yesterday",
    },
    {
      id: 18,
      name: "David Kim",
      status: "new",
      subject:"Website Redesign Project",
      email: "david.kim@example.com",
      date: "Yesterday",
    },
  ];

  return (
    <div className="contact-messages-container">
      <div className="header">
        <div className="header-icon">
          <img src={MailOpen} alt="" />
        </div>
        <h1 className="header-title">Contact Form Messages</h1>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "total" ? "active" : ""}`}
          onClick={() => setActiveTab("total")}
        >
          Total Messages
        </button>
        <button
          className={`tab ${activeTab === "new" ? "active" : ""}`}
          onClick={() => setActiveTab("new")}
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
                  <img src={MailOpen} alt="" />
                </div>
                {message.status === "new" && (
                  <span className="new-badge">New</span>
                )}
              </div>
              <div className="column-name">{message.name}</div>
              <div className="column-email">{message.email}</div>
              <div className="column-subject">{message.subject}</div>
              <div className="column-date">{message.date}</div>
              <div className="column-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => {
                    setSelectedMessage(message);
                    setIsModalOpen(true);
                  }}
                >
                  <img src={Eye} alt="" />
                </button>
                <button className="action-btn delete-btn">
                  <img src={Trash} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MailPreviewModal 
        message={selectedMessage} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }} 
      />
    </div>
  );
};

export default ContactMessages;