import React, { useState } from 'react';
import './ImageUpload.css';

// Language configuration
const translations = {
  en: {
    projectImage: 'Project Image',
    uploadImage: 'Upload Image',
    projectURL: 'Project URL',
    altText: 'Alt Text',
    projectName: 'Project Name',
    clientName: 'Client Name',
    role: 'Your Role',
    duration: 'Duration',
    year: 'Year',
    apps: 'Apps/Platforms',
    programmingLanguages: 'Programming Languages',
    tags: 'Project Tags',
    teamMembers: 'Team Members',
    visibility: 'Visibility Settings',
    public: 'Public',
    private: 'Private',
    customerSatisfaction: 'Customer Satisfaction (%)',
    userEngagement: 'User Engagement (%)',
    loadTime: 'Page Load Time (ms)',
    description: 'Project Description',
    problem: 'The Problem',
    solution: 'The Solution',
    save: 'Publish Project',
    saveDraft: 'Save Draft',
    cancel: 'Cancel',
    enterTag: '+ Add tag',
    selectLanguage: 'Language / اللغة',
  },
  ar: {
    projectImage: 'صورة المشروع',
    uploadImage: 'تحميل صورة',
    projectURL: 'رابط المشروع',
    altText: 'النص البديل',
    projectName: 'اسم المشروع',
    clientName: 'اسم العميل',
    role: 'دورك',
    duration: 'المدة الزمنية',
    year: 'السنة',
    apps: 'التطبيقات / المنصات',
    programmingLanguages: 'لغات البرمجة',
    tags: 'علامات المشروع',
    teamMembers: 'أعضاء الفريق',
    visibility: 'إعدادات الرؤية',
    public: 'عام',
    private: 'خاص',
    customerSatisfaction: 'رضا العميل (%)',
    userEngagement: 'تفاعل المستخدم (%)',
    loadTime: 'وقت تحميل الصفحة (ms)',
    description: 'وصف المشروع',
    problem: 'المشاكل التي واجهتها',
    solution: 'الحل المقدم',
    save: 'نشر المشروع',
    saveDraft: 'حفظ المسودة',
    cancel: 'إلغاء',
    enterTag: '+ إضافة علامة',
    selectLanguage: 'Language / اللغة',
  }
};

// Image Upload Component
const ImageUploadField = ({ value, onChange, label, language }) => {
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
      <label className="field-label">{label}</label>
      <div 
        className="image-upload-box"
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <>
            <span className="upload-icon">📤</span>
            <span className="upload-text">{translations[language].uploadImage}</span>
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
const TextInput = ({ label, value, onChange, placeholder, required, language }) => (
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
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    />
  </div>
);

// URL Input Component
const URLInput = ({ label, value, onChange, placeholder, language }) => (
  <div className="form-field">
    <label className="field-label">{label}</label>
    <input
      type="url"
      className="text-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "https://example.com"}
      dir="ltr"
    />
  </div>
);

// Multi-select Input (for Programming Languages)
const MultiSelectInput = ({ label, value, onChange, placeholder, language }) => {
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
      <div className="multi-select-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
    </div>
  );
};

// Tags Component (predefined tags with add new)
const TagsInput = ({ label, value, onChange, language }) => {
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
            placeholder={translations[language].enterTag}
            className="tag-input-field"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
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
const VisibilitySettings = ({ label, value, onChange, language }) => (
  <div className="form-field">
    <label className="field-label">{label}</label>
    <div className="visibility-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={value?.public || false}
          onChange={(e) => onChange({ ...value, public: e.target.checked })}
        />
        <span className="checkbox-text">{translations[language].public}</span>
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={value?.private || false}
          onChange={(e) => onChange({ ...value, private: e.target.checked })}
        />
        <span className="checkbox-text">{translations[language].private}</span>
      </label>
    </div>
  </div>
);

// Number/Percentage Input
const NumberInput = ({ label, value, onChange, placeholder, suffix, language }) => (
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
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  </div>
);

// Textarea Component
const TextareaInput = ({ label, value, onChange, placeholder, required, language }) => (
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
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    />
  </div>
);

// Language Switcher Component
const LanguageSwitcher = ({ language, onLanguageChange }) => (
  <div className="language-switcher">
    <button 
      className={`lang-btn ${language === 'en' ? 'active' : ''}`}
      onClick={() => onLanguageChange('en')}
    >
      English
    </button>
    <button 
      className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
      onClick={() => onLanguageChange('ar')}
    >
      العربية
    </button>
  </div>
);

// Main Project Form Component
const ProjectForm = () => {
  const [language, setLanguage] = useState('en');
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

  const t = translations[language];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Project published! Check console for data.');
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
      <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
      
      <div className="form-grid">
        <div className="form-column-left">
          <ImageUploadField 
            value={formData.projectImage}
            onChange={(val) => updateField('projectImage', val)}
            label={t.projectImage}
            language={language}
          />
          
          <TextInput
            label={t.altText}
            value={formData.altText}
            onChange={(val) => updateField('altText', val)}
            placeholder="Describe the image"
            required
            language={language}
          />
          
          <TextInput
            label={t.projectName}
            value={formData.projectName}
            onChange={(val) => updateField('projectName', val)}
            placeholder="Enter project name"
            required
            language={language}
          />
          
          <TextInput
            label={t.clientName}
            value={formData.clientName}
            onChange={(val) => updateField('clientName', val)}
            placeholder="Enter client name"
            required
            language={language}
          />
          
          <div className="form-row">
            <TextInput
              label={t.role}
              value={formData.role}
              onChange={(val) => updateField('role', val)}
              placeholder="Your role"
              required
              language={language}
            />
            
            <TextInput
              label={t.duration}
              value={formData.duration}
              onChange={(val) => updateField('duration', val)}
              placeholder="e.g., 6 months"
              required
              language={language}
            />
          </div>
          
          <div className="form-row">
            <TextInput
              label={t.year}
              value={formData.year}
              onChange={(val) => updateField('year', val)}
              placeholder="2024"
              required
              language={language}
            />
            
            <TextInput
              label={t.apps}
              value={formData.apps}
              onChange={(val) => updateField('apps', val)}
              placeholder="Tools used"
              required
              language={language}
            />
          </div>
          
          <NumberInput
            label={t.customerSatisfaction}
            value={formData.customerSatisfaction}
            onChange={(val) => updateField('customerSatisfaction', val)}
            placeholder="85"
            suffix="%"
            language={language}
          />
          
          <NumberInput
            label={t.userEngagement}
            value={formData.userEngagement}
            onChange={(val) => updateField('userEngagement', val)}
            placeholder="75"
            suffix="%"
            language={language}
          />
          
          <NumberInput
            label={t.loadTime}
            value={formData.loadTime}
            onChange={(val) => updateField('loadTime', val)}
            placeholder="1200"
            suffix="ms"
            language={language}
          />
          
          <TextareaInput
            label={t.description}
            value={formData.description}
            onChange={(val) => updateField('description', val)}
            placeholder="Describe the project"
            required
            language={language}
          />
          
          <TextareaInput
            label={t.problem}
            value={formData.problem}
            onChange={(val) => updateField('problem', val)}
            placeholder="What problem did this project solve?"
            required
            language={language}
          />
          
          <TextareaInput
            label={t.solution}
            value={formData.solution}
            onChange={(val) => updateField('solution', val)}
            placeholder="How did you solve it?"
            required
            language={language}
          />
        </div>
        
        <div className="form-column-right">
          <URLInput
            label={t.projectURL}
            value={formData.projectURL}
            onChange={(val) => updateField('projectURL', val)}
            language={language}
          />
          
          <MultiSelectInput
            label={t.programmingLanguages}
            value={formData.programmingLanguages}
            onChange={(val) => updateField('programmingLanguages', val)}
            placeholder="Type and press Enter"
            language={language}
          />
          
          <TagsInput
            label={t.tags}
            value={formData.tags}
            onChange={(val) => updateField('tags', val)}
            language={language}
          />
          
          <TeamMembersInput
            label={t.teamMembers}
            value={formData.teamMembers}
            onChange={(val) => updateField('teamMembers', val)}
          />
          
          <VisibilitySettings
            label={t.visibility}
            value={formData.visibility}
            onChange={(val) => updateField('visibility', val)}
            language={language}
          />
          
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              {t.cancel}
            </button>
            <button className="btn-save-draft">
              {t.saveDraft}
            </button>
            <button className="btn-publish" onClick={handleSubmit}>
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
