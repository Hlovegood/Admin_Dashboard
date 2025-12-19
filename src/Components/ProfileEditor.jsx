import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../supabase';
import './ProfileEditor.css';

export default function ProfileForm() {
  const [introduction, setIntroduction] = useState('');
  const [socials, setSocials] = useState({
    behance: '',
    linkedin: '',
    github: '',
    instagram: ''
  });
  const [altText, setAltText] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills and tools from Supabase on component mount
  useEffect(() => {
    fetchSkillsAndTools();
  }, []);

  const fetchSkillsAndTools = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('Skills')
        .select('Skills, Apps')
        .not('Apps', 'is', null); // Only get rows where Apps is not NULL

      if (fetchError) throw fetchError;

      if (data) {
        // Extract unique skills (filter out NULL and duplicates)
        const skillsData = [...new Set(
          data
            .map(item => item.Skills)
            .filter(skill => skill !== null && skill !== '')
        )];
        
        // Extract unique apps (filter out NULL and duplicates)
        const toolsData = [...new Set(
          data
            .map(item => item.Apps)
            .filter(app => app !== null && app !== '')
        )];
        
        setSkills(skillsData);
        setTools(toolsData);
      }
    } catch (err) {
      console.error('Error fetching skills and tools:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSkill = async (index) => {
    const skillToRemove = skills[index];
    setSkills(skills.filter((_, i) => i !== index));
    
    // Optional: Delete from Supabase
    try {
      await supabase
        .from('Skills')
        .delete()
        .eq('Skills', skillToRemove);
    } catch (err) {
      console.error('Error removing skill:', err);
    }
  };

  const addSkill = async () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      
      // Optional: Add to Supabase
      try {
        await supabase
          .from('Skills')
          .insert([{ Skills: newSkill.trim() }]);
      } catch (err) {
        console.error('Error adding skill:', err);
      }
    }
  };

  const removeTool = async (index) => {
    const toolToRemove = tools[index];
    setTools(tools.filter((_, i) => i !== index));
    
    // Optional: Delete from Supabase
    try {
      await supabase
        .from('Skills')
        .delete()
        .eq('Apps', toolToRemove);
    } catch (err) {
      console.error('Error removing tool:', err);
    }
  };

  const addTool = async () => {
    if (newTool.trim()) {
      setTools([...tools, newTool.trim()]);
      setNewTool('');
      
      // Optional: Add to Supabase
      try {
        await supabase
          .from('Skills')
          .insert([{ Apps: newTool.trim() }]);
      } catch (err) {
        console.error('Error adding tool:', err);
      }
    }
  };

  const handleSave = () => {
    console.log('Saving profile...');
  };

  const handleCancel = () => {
    console.log('Cancelling...');
  };

  if (loading) {
    return (
      <div className="profile-form-container">
        <div className="profile-form-wrapper">
          <p>Loading skills and tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-form-container">
        <div className="profile-form-wrapper">
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={fetchSkillsAndTools}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-form-container">
        <div className="profile-form-wrapper">
          <h1 className="profile-form-title">
            Change information about you
          </h1>
          
          <div className="profile-form-grid">
            {/* Left Column */}
            <div className="profile-form-column">
              {/* Introduction */}
              <div className="form-field">
                <label className="form-label">
                  Introduction <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Introduction"
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Socials */}
              <div className="socials-section">
                <h2 className="section-title">Socials</h2>
                
                <div className="socials-list">
                  <div className="form-field">
                    <label className="form-label">Behance</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={socials.behance}
                      onChange={(e) => setSocials({...socials, behance: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Linkedin</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={socials.linkedin}
                      onChange={(e) => setSocials({...socials, linkedin: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Github</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={socials.github}
                      onChange={(e) => setSocials({...socials, github: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={socials.instagram}
                      onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="form-field">
                <label className="form-label">
                  Skills<span className="required">*</span>
                </label>
                <div className="tag-container">
                  <div className="tag-list">
                    {skills.map((skill, index) => (
                      <span key={index} className="tag">
                        {skill}
                        <button
                          onClick={() => removeSkill(index)}
                          className="tag-remove"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tag-input-wrapper">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Add new skill..."
                      className="tag-input"
                    />
                    <button onClick={addSkill} className="tag-add-btn">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Tools/Apps */}
              <div className="form-field">
                <label className="form-label">
                  Tools/Apps<span className="required">*</span>
                </label>
                <div className="tag-container">
                  <div className="tag-list">
                    {tools.map((tool, index) => (
                      <span key={index} className="tag">
                        {tool}
                        <button
                          onClick={() => removeTool(index)}
                          className="tag-remove"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tag-input-wrapper">
                    <input
                      type="text"
                      value={newTool}
                      onChange={(e) => setNewTool(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTool()}
                      placeholder="Add new tool..."
                      className="tag-input"
                    />
                    <button onClick={addTool} className="tag-add-btn">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="profile-form-column">
              {/* Profile Image */}
              <div className="form-field">
                <label className="form-label">Profile Image</label>
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden-input"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload" className="image-upload-label">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="uploaded-image"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-icon">↑</div>
                        <div className="upload-text">Upload Image</div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Alt Text */}
              <div className="form-field">
                <label className="form-label">Alt text</label>
                <input
                  type="text"
                  placeholder="Enter Alt text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-save">
                  Save Edits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}