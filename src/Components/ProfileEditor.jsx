import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../supabase';
import './ProfileEditor.css';

export default function ProfileForm() {
  const [introduction, setIntroduction] = useState('');
  const [altText, setAltText] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState('');

  // Individual link states
  const [behanceLink, setBehanceLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');

  // Contact Links states
  const [contactLinks, setContactLinks] = useState([]);
  const [editableContactLinks, setEditableContactLinks] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Confirmation Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');


  useEffect(() => {
    fetchSkillsAndTools();
    fetchContactLinks();
  }, []);

  useEffect(() => {
    // Populate individual link states from editableContactLinks
    const behance = editableContactLinks.find(link => link.Link_Title === 'Behance');
    const linkedin = editableContactLinks.find(link => link.Link_Title === 'LinkedIn');
    const github = editableContactLinks.find(link => link.Link_Title === 'GitHub');
    const instagram = editableContactLinks.find(link => link.Link_Title === 'Instagram');

    setBehanceLink(behance?.Links || '');
    setLinkedinLink(linkedin?.Links || '');
    setGithubLink(github?.Links || '');
    setInstagramLink(instagram?.Links || '');
  }, [editableContactLinks]);

  const fetchSkillsAndTools = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('Skills')
        .select('Skills, Apps')
        .not('Apps', 'is', null); 

      if (fetchError) throw fetchError;

      if (data) {
        
        const skillsData = [...new Set(
          data
            .map(item => item.Skills)
            .filter(skill => skill !== null && skill !== '')
        )];
        
       
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

  const fetchContactLinks = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('Contact')
        .select('id, Link_Title, Links')
        .not('Links', 'is', null);

      if (fetchError) throw fetchError;

      if (data) {
        // Filter only rows with non-empty links
        const filledLinks = data.filter(link => link.Links && link.Links.trim() !== '');
        setContactLinks(filledLinks);
        // Initialize editable contact links with the same data
        setEditableContactLinks(filledLinks.map(link => ({ ...link })));
      }
    } catch (err) {
      console.error('Error fetching contact links:', err);
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

  const openConfirmModal = (title, message, action) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleConfirm = async () => {
    if (confirmAction) {
      await confirmAction();
    }
    closeConfirmModal();
  };

  const removeSkill = async (index) => {
    const skillToRemove = skills[index];
    const performRemove = async () => {
      setSkills(skills.filter((_, i) => i !== index));
      
      try {
        const { error } = await supabase
          .from('Skills')
          .delete()
          .eq('Skills', skillToRemove);
        
        if (error) {
          console.error('Error removing skill:', error);
          alert(`Error removing skill: ${error.message}`);
          fetchSkillsAndTools();
        }
      } catch (err) {
        console.error('Error removing skill:', err);
        alert(`Error removing skill: ${err.message}`);
        fetchSkillsAndTools();
      }
    };

    openConfirmModal('Remove Skill', `Are you sure you want to remove "${skillToRemove}"?`, performRemove);
  };

  const addSkill = async () => {
    if (newSkill.trim()) {
      const performAdd = async () => {
        try {
          const { error } = await supabase
            .from('Skills')
            .insert([{ Skills: newSkill.trim() }]);
          
          if (error) {
            console.error('Error adding skill:', error);
            alert(`Error adding skill: ${error.message}`);
            return;
          }
          
          setSkills([...skills, newSkill.trim()]);
          setNewSkill('');
        } catch (err) {
          console.error('Error adding skill:', err);
          alert(`Error adding skill: ${err.message}`);
        }
      };

      openConfirmModal('Add Skill', `Add "${newSkill.trim()}" to your skills?`, performAdd);
    }
  };

  const removeTool = async (index) => {
    const toolToRemove = tools[index];
    const performRemove = async () => {
      setTools(tools.filter((_, i) => i !== index));
      
      try {
        const { error } = await supabase
          .from('Skills')
          .delete()
          .eq('Apps', toolToRemove);
        
        if (error) {
          console.error('Error removing tool:', error);
          alert(`Error removing tool: ${error.message}`);
          fetchSkillsAndTools();
        }
      } catch (err) {
        console.error('Error removing tool:', err);
        alert(`Error removing tool: ${err.message}`);
        fetchSkillsAndTools();
      }
    };

    openConfirmModal('Remove Tool', `Are you sure you want to remove "${toolToRemove}"?`, performRemove);
  };

  const addTool = async () => {
    if (newTool.trim()) {
      const performAdd = async () => {
        try {
          const { error } = await supabase
            .from('Skills')
            .insert([{ Apps: newTool.trim() }]);
          
          if (error) {
            console.error('Error adding tool:', error);
            alert(`Error adding tool: ${error.message}`);
            return;
          }
          
          setTools([...tools, newTool.trim()]);
          setNewTool('');
        } catch (err) {
          console.error('Error adding tool:', err);
          alert(`Error adding tool: ${err.message}`);
        }
      };

      openConfirmModal('Add Tool', `Add "${newTool.trim()}" to your tools?`, performAdd);
    }
  };

  const handleContactLinkChange = (id, newUrl) => {
    setEditableContactLinks(
      editableContactLinks.map(link =>
        link.id === id ? { ...link, Links: newUrl } : link
      )
    );
  };

  const handleSave = async () => {
    const performSave = async () => {
      try {
        // Save all contact links using individual states
        const linksToSave = [
          { title: 'Behance', url: behanceLink },
          { title: 'LinkedIn', url: linkedinLink },
          { title: 'GitHub', url: githubLink },
          { title: 'Instagram', url: instagramLink }
        ];

        for (const linkData of linksToSave) {
          const link = editableContactLinks.find(l => l.Link_Title === linkData.title);
          if (link) {
            const { error } = await supabase
              .from('Contact')
              .update({ Links: linkData.url })
              .eq('id', link.id);

            if (error) throw error;
          }
        }

        // Update the editable contact links with new values
        const updatedLinks = editableContactLinks.map(link => {
          if (link.Link_Title === 'Behance') return { ...link, Links: behanceLink };
          if (link.Link_Title === 'LinkedIn') return { ...link, Links: linkedinLink };
          if (link.Link_Title === 'GitHub') return { ...link, Links: githubLink };
          if (link.Link_Title === 'Instagram') return { ...link, Links: instagramLink };
          return link;
        });

        setEditableContactLinks(updatedLinks);
        setContactLinks(updatedLinks.map(link => ({ ...link })));
        
        console.log('Profile saved successfully!');
        alert('Profile updated successfully!');
      } catch (err) {
        console.error('Error saving profile:', err);
        alert(`Error saving profile: ${err.message}`);
      }
    };

    openConfirmModal('Save Changes', 'Save all your profile changes?', performSave);
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


              {/* Socials */}
              <div className="socials-section">
                <h2 className="section-title">Socials</h2>
                
                <div className="socials-list">
                  <div className="form-field">
                    <label className="form-label">Behance</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={behanceLink}
                      onChange={(e) => {
                        setBehanceLink(e.target.value);
                        const link = editableContactLinks.find(l => l.Link_Title === 'Behance');
                        if (link) handleContactLinkChange(link.id, e.target.value);
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Linkedin</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={linkedinLink}
                      onChange={(e) => {
                        setLinkedinLink(e.target.value);
                        const link = editableContactLinks.find(l => l.Link_Title === 'Linkedin');
                        if (link) handleContactLinkChange(link.id, e.target.value);
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Github</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={githubLink}
                      onChange={(e) => {
                        setGithubLink(e.target.value);
                        const link = editableContactLinks.find(l => l.Link_Title === 'Github');
                        if (link) handleContactLinkChange(link.id, e.target.value);
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      placeholder="Paste Link"
                      value={instagramLink}
                      onChange={(e) => {
                        setInstagramLink(e.target.value);
                        const link = editableContactLinks.find(l => l.Link_Title === 'Instagram');
                        if (link) handleContactLinkChange(link.id, e.target.value);
                      }}
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h2 className="confirm-modal-title">{confirmTitle}</h2>
            <p className="confirm-modal-message">{confirmMessage}</p>
            <div className="confirm-modal-buttons">
              <button onClick={closeConfirmModal} className="confirm-modal-cancel">
                Cancel
              </button>
              <button onClick={handleConfirm} className="confirm-modal-confirm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}