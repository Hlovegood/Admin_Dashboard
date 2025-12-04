import React, { useState } from 'react';
import './ImageUpload.css';

// Image Upload Componentmake
const ImageUploadField = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-field">
      <label className="field-label">Project Image</label>
      <div 
        className="image-upload-box"
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <>
            <span className="upload-icon">📤</span>
            <span className="upload-text">Upload Image</span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

// Text Input Component
const TextInput = ({ label, value, onChange, placeholder, required }) => (
  <div className="form-field">
    <label className="field-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type="text"
      className="text-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

// URL Input Component
const URLInput = ({ label, value, onChange, placeholder }) => (
  <div className="form-field">
    <label className="field-label">{label}</label>
    <input
      type="url"
      className="text-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "https://example.com"}
    />
  </div>
);

// Multi-select Input (for Programming Languages)
const MultiSelectInput = ({ label, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const items = value || [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!items.includes(inputValue.trim())) {
        onChange([...items, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeItem = (item) => {
    onChange(items.filter(i => i !== item));
  };

  return (
    <div className="form-field">
      <label className="field-label">{label}</label>
      <div className="multi-select-container">
        {items.map((item, index) => (
          <span key={index} className="tag-item">
            {item}
            <button onClick={() => removeItem(item)} className="tag-remove">×</button>
          </span>
        ))}
        <input
          type="text"
          className="multi-select-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

// Tags Component (predefined tags with add new)
const TagsInput = ({ label, value, onChange }) => {
  const [customTag, setCustomTag] = useState('');
  const selectedTags = value || [];
  const predefinedTags = ['Web Design', 'UI/UX', 'API'];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      onChange([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  return (
    <div className="form-field">
      <label className="field-label">{label}</label>
      <div className="tags-container">
        {predefinedTags.map(tag => (
          <button
            key={tag}
            className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
        <div className="custom-tag-input">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
            placeholder="+ Add tag"
            className="tag-input-field"
          />
        </div>
      </div>
    </div>
  );
};

// Team Members Component (avatar selection)
const TeamMembersInput = ({ label, value, onChange }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const members = value || [];
  
  const addMember = (member) => {
    onChange([...members, member]);
    setShowAddMember(false);
  };

  return (
    <div className="form-field">
      <label className="field-label">{label}</label>
      <div className="team-members-container">
        {members.map((member, index) => (
          <div key={index} className="team-member-avatar">
            {member.substring(0, 2).toUpperCase()}
          </div>
        ))}
        <button 
          className="add-member-button"
          onClick={() => setShowAddMember(!showAddMember)}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Visibility Settings Component
const VisibilitySettings = ({ label, value, onChange }) => (
  <div className="form-field">
    <label className="field-label">{label}</label>
    <div className="visibility-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={value?.public || false}
          onChange={(e) => onChange({ ...value, public: e.target.checked })}
        />
        <span className="checkbox-text">Public</span>
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={value?.private || false}
          onChange={(e) => onChange({ ...value, private: e.target.checked })}
        />
        <span className="checkbox-text">Private</span>
      </label>
    </div>
  </div>
);

// Number/Percentage Input
const NumberInput = ({ label, value, onChange, placeholder, suffix }) => (
  <div className="form-field">
    <label className="field-label">
      {label} <span className="required">*</span>
    </label>
    <div className="number-input-wrapper">
      <input
        type="number"
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min="0"
        max="100"
      />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  </div>
);

// Textarea Component
const TextareaInput = ({ label, value, onChange, placeholder, required }) => (
  <div className="form-field">
    <label className="field-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <textarea
      className="textarea-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows="4"
    />
  </div>
);

// Main Project Form Component
const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectImage: null,
    projectURL: '',
    altText: '',
    projectName: '',
    clientName: '',
    role: '',
    duration: '',
    year: '',
    apps: '',
    programmingLanguages: [],
    tags: [],
    teamMembers: [],
    visibility: { public: false, private: false },
    customerSatisfaction: '',
    userEngagement: '',
    loadTime: '',
    description: '',
    problem: '',
    solution: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Project saved! Check console for data.');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      setFormData({
        projectImage: null,
        projectURL: '',
        altText: '',
        projectName: '',
        clientName: '',
        role: '',
        duration: '',
        year: '',
        apps: '',
        programmingLanguages: [],
        tags: [],
        teamMembers: [],
        visibility: { public: false, private: false },
        customerSatisfaction: '',
        userEngagement: '',
        loadTime: '',
        description: '',
        problem: '',
        solution: ''
      });
    }
  };

  return (
    <div className="project-form-container">
      <div className="form-grid">
        <div className="form-column-left">
          <ImageUploadField 
            value={formData.projectImage}
            onChange={(val) => updateField('projectImage', val)}
          />
          
          <TextInput
            label="Alt text"
            value={formData.altText}
            onChange={(val) => updateField('altText', val)}
            placeholder="Describe the image"
            required
          />
          
          <TextInput
            label="Project Name"
            value={formData.projectName}
            onChange={(val) => updateField('projectName', val)}
            placeholder="Enter project name"
            required
          />
          
          <TextInput
            label="Client Name"
            value={formData.clientName}
            onChange={(val) => updateField('clientName', val)}
            placeholder="Enter client name"
            required
          />
          
          <div className="form-row">
            <TextInput
              label="Role"
              value={formData.role}
              onChange={(val) => updateField('role', val)}
              placeholder="Your role"
              required
            />
            
            <TextInput
              label="Duration"
              value={formData.duration}
              onChange={(val) => updateField('duration', val)}
              placeholder="e.g., 6 months"
              required
            />
          </div>
          
          <div className="form-row">
            <TextInput
              label="Year"
              value={formData.year}
              onChange={(val) => updateField('year', val)}
              placeholder="2024"
              required
            />
            
            <TextInput
              label="Apps"
              value={formData.apps}
              onChange={(val) => updateField('apps', val)}
              placeholder="Tools used"
              required
            />
          </div>
          
          <NumberInput
            label="Customer Satisfaction (%)"
            value={formData.customerSatisfaction}
            onChange={(val) => updateField('customerSatisfaction', val)}
            placeholder="85"
            suffix="%"
          />
          
          <NumberInput
            label="User Engagement (%)"
            value={formData.userEngagement}
            onChange={(val) => updateField('userEngagement', val)}
            placeholder="75"
            suffix="%"
          />
          
          <NumberInput
            label="Load Time (Ms)"
            value={formData.loadTime}
            onChange={(val) => updateField('loadTime', val)}
            placeholder="1200"
            suffix="ms"
          />
          
          <TextareaInput
            label="Description"
            value={formData.description}
            onChange={(val) => updateField('description', val)}
            placeholder="Describe the project"
            required
          />
          
          <TextareaInput
            label="The Problem"
            value={formData.problem}
            onChange={(val) => updateField('problem', val)}
            placeholder="What problem did this project solve?"
            required
          />
          
          <TextareaInput
            label="The Solution"
            value={formData.solution}
            onChange={(val) => updateField('solution', val)}
            placeholder="How did you solve it?"
            required
          />
        </div>
        
        <div className="form-column-right">
          <URLInput
            label="Project URL"
            value={formData.projectURL}
            onChange={(val) => updateField('projectURL', val)}
          />
          
          <MultiSelectInput
            label="Programming Languages"
            value={formData.programmingLanguages}
            onChange={(val) => updateField('programmingLanguages', val)}
            placeholder="Type and press Enter"
          />
          
          <TagsInput
            label="Tags"
            value={formData.tags}
            onChange={(val) => updateField('tags', val)}
          />
          
          <TeamMembersInput
            label="Team Members"
            value={formData.teamMembers}
            onChange={(val) => updateField('teamMembers', val)}
          />
          
          <VisibilitySettings
            label="Visibility Settings"
            value={formData.visibility}
            onChange={(val) => updateField('visibility', val)}
          />
          
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-save-draft">
              Save Draft
            </button>
            <button className="btn-publish" onClick={handleSubmit}>
              Publish Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;