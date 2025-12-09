import React, { useState } from 'react';
import { X } from 'lucide-react';
import'./ProfileEditor.css'

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
  
  const [skills, setSkills] = useState([
    'Next.js', 'Javascript', 'UI Design', 'Typescript', 
    'Social Media', 'Java Editor'
  ]);
  const [newSkill, setNewSkill] = useState('');
  
  const [tools, setTools] = useState([
    'Figma', 'Indesign', 'Photoshop', 'Illustrator',
    'Sketch', 'Blender', 'After Effect', 'Framer',
    'Corel Draw', 'Canva', 'React'
  ]);
  const [newTool, setNewTool] = useState('');

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

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeTool = (index) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const addTool = () => {
    if (newTool.trim()) {
      setTools([...tools, newTool.trim()]);
      setNewTool('');
    }
  };

  const handleSave = () => {
    console.log('Saving profile...');
  };

  const handleCancel = () => {
    console.log('Cancelling...');
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-orange-400 text-sm sm:text-base mb-6 sm:mb-8">
          Change information about you
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Introduction */}
            <div>
              <label className="block text-orange-400 text-lg sm:text-xl mb-2">
                Introduction <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Introduction"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Socials */}
            <div>
              <h2 className="text-orange-400 text-lg sm:text-xl mb-4">Socials</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-orange-400 mb-2">Behance</label>
                  <input
                    type="text"
                    placeholder="Paste Link"
                    value={socials.behance}
                    onChange={(e) => setSocials({...socials, behance: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-orange-400 mb-2">Linkedin</label>
                  <input
                    type="text"
                    placeholder="Paste Link"
                    value={socials.linkedin}
                    onChange={(e) => setSocials({...socials, linkedin: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-orange-400 mb-2">Github</label>
                  <input
                    type="text"
                    placeholder="Paste Link"
                    value={socials.github}
                    onChange={(e) => setSocials({...socials, github: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-orange-400 mb-2">Instagram</label>
                  <input
                    type="text"
                    placeholder="Paste Link"
                    value={socials.instagram}
                    onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-orange-400 text-lg mb-2">
                Skills<span className="text-red-400">*</span>
              </label>
              <div className="p-4 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300">
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-300 text-orange-400 text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="hover:text-orange-600"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add new skill..."
                    className="flex-1 px-3 py-2 rounded-full border-2 border-orange-300 bg-transparent text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400 text-sm"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 rounded-full border-2 border-orange-300 text-orange-400 hover:bg-orange-300 hover:bg-opacity-30 text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Tools/Apps */}
            <div>
              <label className="block text-orange-400 text-lg mb-2">
                Tools/Apps<span className="text-red-400">*</span>
              </label>
              <div className="p-4 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tools.map((tool, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-300 text-orange-400 text-sm"
                    >
                      {tool}
                      <button
                        onClick={() => removeTool(index)}
                        className="hover:text-orange-600"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTool()}
                    placeholder="Add new tool..."
                    className="flex-1 px-3 py-2 rounded-full border-2 border-orange-300 bg-transparent text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400 text-sm"
                  />
                  <button
                    onClick={addTool}
                    className="px-4 py-2 rounded-full border-2 border-orange-300 text-orange-400 hover:bg-orange-300 hover:bg-opacity-30 text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-orange-400 mb-2">Profile Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="flex items-center justify-center w-full h-48 sm:h-56 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 border-dashed cursor-pointer hover:bg-opacity-60 transition-all"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-orange-300 text-4xl mb-2">↑</div>
                      <div className="text-orange-300">Upload Image</div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-orange-400 mb-2">Alt text</label>
              <input
                type="text"
                placeholder="Enter Alt text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-orange-200 bg-opacity-40 border-2 border-orange-300 text-orange-400 placeholder-orange-300 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-lg border-2 border-orange-300 text-orange-400 hover:bg-orange-300 hover:bg-opacity-30 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-lg bg-orange-300 bg-opacity-60 border-2 border-orange-300 text-orange-500 hover:bg-opacity-80 transition-all"
              >
                Save Edits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}