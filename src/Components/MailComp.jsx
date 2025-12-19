import React, { useState, useEffect } from "react";
import "./MailComp.css";
import MailOpen from "../assets/Icons/New Mail Icon.svg";
import Trash from "../assets/Icons/Trash Icon.svg";
import Eye from "../assets/Icons/Eye Icon.svg";
import MailPreviewModal from "./MailPreviewModal";
import { supabase } from "../supabase";

const ContactMessages = () => {
  const [activeTab, setActiveTab] = useState("total");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages from Supabase on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('Contact')
        .select('id, Name, Email, Subject, Message, created_at')
        .not('Name', 'is', null)
        .not('Email', 'is', null)
        .not('Subject', 'is', null)
        .not('Message', 'is', null)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data) {
        // Transform data and filter out any rows with empty strings
        const formattedMessages = data
          .filter(msg => 
            msg.Name && msg.Name.trim() !== '' &&
            msg.Email && msg.Email.trim() !== '' &&
            msg.Subject && msg.Subject.trim() !== '' &&
            msg.Message && msg.Message.trim() !== ''
          )
          .map((msg) => ({
            id: msg.id,
            name: msg.Name,
            email: msg.Email,
            subject: msg.Subject,
            message: msg.Message,
            status: "read",
            date: formatDate(msg.created_at),
          }));

        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date to relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Delete message
  const handleDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const { error: deleteError } = await supabase
          .from('Contact')
          .delete()
          .eq('id', messageId);

        if (deleteError) throw deleteError;

        // Update local state
        setMessages(messages.filter(msg => msg.id !== messageId));
      } catch (err) {
        console.error('Error deleting message:', err);
        alert('Failed to delete message');
      }
    }
  };

  // Filter messages based on active tab
  const filteredMessages = activeTab === "new" 
    ? messages.filter(msg => msg.status === "new")
    : messages;

  if (loading) {
    return (
      <div className="contact-messages-container">
        <div className="header">
          <div className="header-icon">
            <img src={MailOpen} alt="" />
          </div>
          <h1 className="header-title">Contact Form Messages</h1>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading messages...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-messages-container">
        <div className="header">
          <div className="header-icon">
            <img src={MailOpen} alt="" />
          </div>
          <h1 className="header-title">Contact Form Messages</h1>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          Error: {error}
          <button onClick={fetchMessages} style={{ marginLeft: '10px' }}>Retry</button>
        </div>
      </div>
    );
  }

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
          Total Messages ({messages.length})
        </button>
        <button
          className={`tab ${activeTab === "new" ? "active" : ""}`}
          onClick={() => setActiveTab("new")}
        >
          New Messages ({messages.filter(msg => msg.status === "new").length})
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
          {filteredMessages.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              No messages found
            </div>
          ) : (
            filteredMessages.map((message) => (
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
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(message.id)}
                  >
                    <img src={Trash} alt="" />
                  </button>
                </div>
              </div>
            ))
          )}
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