import React, { useEffect, useState } from "react";
import "./ImageUpload.css";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const translations = {
  en: {
    projectImage: "Project Image",
    uploadImage: "Upload Image",
    projectURL: "Project URL",
    altText: "Alt Text",
    projectName: "Project Name",
    clientName: "Client Name",
    role: "Your Role",
    duration: "Duration",
    year: "Year",
    apps: "Apps/Platforms",
    programmingLanguages: "Programming Languages",
    tags: "Project Tags",
    slug: "Project Slug Name",
    teamMembers: "Team Members",
    customerSatisfaction: "Customer Satisfaction (%)",
    userEngagement: "User Engagement (%)",
    loadTime: "Page Load Time (ms)",
    caseStudyImages: "Case Study Images (Max 3)",
    description: "Project Description",
    problem: "The Problem",
    solution: "The Solution",
    save: "Publish Project",
    saveDraft: "Save Draft",
    cancel: "Cancel",
    enterTag: "+ Add tag",
    enterSlug: "+ Add Slug Name",
    selectLanguage: "Language / اللغة",
  },
  ar: {
    projectImage: "صورة المشروع",
    uploadImage: "تحميل صورة",
    projectURL: "رابط المشروع",
    altText: "النص البديل",
    projectName: "اسم المشروع",
    clientName: "اسم العميل",
    role: "دورك",
    duration: "المدة الزمنية",
    year: "السنة",
    apps: "التطبيقات / المنصات",
    programmingLanguages: "لغات البرمجة",
    tags: "علامات المشروع",
    teamMembers: "أعضاء الفريق",
    customerSatisfaction: "رضا العميل (%)",
    userEngagement: "تفاعل المستخدم (%)",
    loadTime: "وقت تحميل الصفحة (ms)",
    caseStudyImages: "صور دراسة الحالة (حد أقصى 3)",
    description: "وصف المشروع",
    problem: "المشاكل التي واجهتها",
    solution: "الحل المقدم",
    save: "نشر المشروع",
    saveDraft: "حفظ المسودة",
    cancel: "إلغاء",
    enterTag: "+ إضافة علامة",
    selectLanguage: "Language / اللغة",
  },
};

const LanguageSwitcher = ({ language, onLanguageChange }) => (
  <div className="language-switcher">
    <button
      className={`lang-btn ${language === "en" ? "active" : ""}`}
      onClick={() => onLanguageChange("en")}
    >
      English
    </button>
    <button
      className={`lang-btn ${language === "ar" ? "active" : ""}`}
      onClick={() => onLanguageChange("ar")}
    >
      العربية
    </button>
  </div>
);

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
Apps:"",
CoverImg: "",
Dev: "",
Case_Img_1: "",
Case_Img_2: "",
Case_Img_3: "",
Impact_1: "",
Impact_2: "",
Impact_3: "",
Learnings: "",
Ovr: "",
Prob: "",
Proto: "",
Research: "",
Role: "",
Sol: "",
Time: "",
Title: "",
Year: "",
slug:"",
ProjectCategory:"",
Sub: "",
Vis: "",
Flow: "",
Brand: "",
  });
  const [preview, setPreview] = useState(null);
  const [caseImagePreviews, setCaseImagePreviews] = useState(["", "", ""]);

  // Confirmation Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');

  const t = translations[language];

  useEffect(() => {
    async function callGetAPI() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error } = await supabase
          .from("Project Details")
          .select("*")
          .eq("id", id);

        if (error) {
          console.error("Error fetching project:", error);
          setLoading(false);
          return;
        }

        if (result && result.length > 0) {
          console.log("Fetched data:", result[0]);
          setData(result[0]);
          if (result[0].CoverImg) {
            setPreview(result[0].CoverImg);
          }
          if (result[0].Case_Img_1 || result[0].Case_Img_2 || result[0].Case_Img_3) {
            setCaseImagePreviews([
              result[0].Case_Img_1 || "",
              result[0].Img_1 || "",
              result[0].Case_Img_2 || "",
              result[0].Img_2 || "",
              result[0].Case_Img_3 || "",
              result[0].Img_3 || ""
            ]);
          }
        } else {
          console.log("No data found for id:", id);
        }
      } catch (err) {
        console.error("Error:", err);
      }
      
      setLoading(false);
    }

    callGetAPI();
  }, [id]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setData({ ...data, CoverImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaseImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...caseImagePreviews];
        newPreviews[index] = reader.result;
        setCaseImagePreviews(newPreviews);
        
        const fieldName = `Case_Img_${index + 1}`;
        setData({ ...data, [fieldName]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCaseImage = (index) => {
    const newPreviews = [...caseImagePreviews];
    newPreviews[index] = "";
    setCaseImagePreviews(newPreviews);
    
    const fieldName = `Case_Img_${index + 1}`;
    setData({ ...data, [fieldName]: "" });
  };

  async function handleSubmit() {
    const performPublish = async () => {
      try {
        const payload = {
          ...data,  
        };

        const { data: error } = await supabase
          .from("Project Details")
          .insert([payload])
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          alert(error.message);
          return;
        }

        alert("Project published successfully!");
        navigate(-1);
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    };

    openConfirmModal('Publish Project', 'Are you sure you want to publish this project?', performPublish);
  }


  const handleSaveDraft = async () => {
    const performSaveDraft = async () => {
      try {
        const draftData = { ...data, status: "draft" };
        
        if (id) {
          const { error } = await supabase
            .from("Project Details")
            .update(draftData)
            .eq("id", id);

          if (error) {
            console.error("Error saving draft:", error);
            alert("Error saving draft!");
          } else {
            alert("Draft saved successfully!");
          }
        } else {
          const { error } = await supabase
            .from("Project Details")
            .insert([draftData]);

          if (error) {
            console.error("Error saving draft:", error);
            alert("Error saving draft!");
          } else {
            alert("Draft saved successfully!");
          }
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error saving draft!");
      }
    };

    openConfirmModal('Save Draft', 'Save this project as a draft?', performSaveDraft);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      window.location.reload();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="project-form-container">
      <LanguageSwitcher language={language} onLanguageChange={setLanguage} />

      <div className="form-grid">
        <div className="form-column-left">
          {/* Image Upload */}
          <div className="form-field">
            <label className="field-label">{t.projectImage}</label>
            <div className="image-upload-box" onClick={() => document.getElementById('imageInput').click()}>
              {preview ? (
                <img src={preview} alt="Preview" className="image-preview" />
              ) : (
                <>
                  <span className="upload-icon">📤</span>
                  <span className="upload-text">{t.uploadImage}</span>
                </>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>


          {/* Project Name */}
          <div className="form-field">
            <label className="field-label">{t.projectName} <span className="required">*</span></label>
            <input
              type="text"
              className="text-input"
              value={data.Title || ""}
              onChange={(e) => setData({ ...data, Title: e.target.value })}
              placeholder="Enter project name"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>


          {/* Role and Duration Row */}
          <div className="form-row">
            <div className="form-field">
              <label className="field-label">{t.role} <span className="required">*</span></label>
            <input
              type="text"
              className="text-input"
              value={data.Role || ""}
              onChange={(e) => setData({ ...data, Role: e.target.value })}
              placeholder="Enter Your Role"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
            </div>

            <div className="form-field">
              <label className="field-label">{t.duration} <span className="required">*</span></label>
              <input
                type="text"
                className="text-input"
                value={data.Time || ""}
                onChange={(e) => setData({ ...data, Time: e.target.value })}
                placeholder="e.g., 6 months"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {/* Year and Apps Row */}
          <div className="form-row">
            <div className="form-field">
              <label className="field-label">{t.year} <span className="required">*</span></label>
              <input
                type="text"
                className="text-input"
                value={data.Year || ""}
                onChange={(e) => setData({ ...data, Year: e.target.value })}
                placeholder="2024"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>

            <div className="form-field">
              <label className="field-label">{t.apps} <span className="required">*</span></label>
              <input
                type="text"
                className="text-input"
                value={data.Apps || ""}
                onChange={(e) => setData({ ...data, Apps: e.target.value })}
                placeholder="Tools used"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="form-field">
            <label className="field-label">{t.customerSatisfaction} <span className="required">*</span></label>
            <div className="number-input-wrapper">
              <input
                type="number"
                className="text-input"
                value={data.Impact_1 || ""}
                onChange={(e) => setData({ ...data, Impact_1: e.target.value })}
                placeholder="85"
                min="0"
                max="100"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
              <span className="input-suffix">%</span>
            </div>
          </div>

          {/* User Engagement */}
          <div className="form-field">
            <label className="field-label">{t.userEngagement} <span className="required">*</span></label>
            <div className="number-input-wrapper">
              <input
                type="number"
                className="text-input"
                value={data.Impact_2 || ""}
                onChange={(e) => setData({ ...data, Impact_2: e.target.value })}
                placeholder="75"
                min="0"
                max="100"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
              <span className="input-suffix">%</span>
            </div>
          </div>

          {/* Load Time */}
          <div className="form-field">
            <label className="field-label">{t.loadTime} <span className="required">*</span></label>
            <div className="number-input-wrapper">
              <input
                type="number"
                className="text-input"
                value={data.Impact_3 || ""}
                onChange={(e) => setData({ ...data, Impact_3: e.target.value })}
                placeholder="1200"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
              <span className="input-suffix">ms</span>
            </div>
          </div>

        

          {/* Subtitle */}
          <div className="form-field">
            <label className="field-label">Subtitle</label>
            <input
              type="text"
              className="text-input"
              value={data.Sub || ""}
              onChange={(e) => setData({ ...data, Sub: e.target.value })}
              placeholder="Enter subtitle"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Research */}
          <div className="form-field">
            <label className="field-label">Research</label>
            <input
              type="text"
              className="text-input"
              value={data.Research || ""}
              onChange={(e) => setData({ ...data, Research: e.target.value })}
              placeholder="Enter research details"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Prototype */}
          <div className="form-field">
            <label className="field-label">Prototype</label>
            <input
              type="text"
              className="text-input"
              value={data.Proto || ""}
              onChange={(e) => setData({ ...data, Proto: e.target.value })}
              placeholder="Enter prototype details"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Developer */}
          <div className="form-field">
            <label className="field-label">Developer</label>
            <input
              type="text"
              className="text-input"
              value={data.Dev || ""}
              onChange={(e) => setData({ ...data, Dev: e.target.value })}
              placeholder="Enter developer name/details"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Visual */}
          <div className="form-field">
            <label className="field-label">Visual</label>
            <input
              type="text"
              className="text-input"
              value={data.Vis || ""}
              onChange={(e) => setData({ ...data, Vis: e.target.value })}
              placeholder="Enter visual details"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Flow */}
          <div className="form-field">
            <label className="field-label">Flow</label>
            <input
              type="text"
              className="text-input"
              value={data.Flow || ""}
              onChange={(e) => setData({ ...data, Flow: e.target.value })}
              placeholder="Enter flow details"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Brand */}
          <div className="form-field">
            <label className="field-label">Brand</label>
            <input
              type="text"
              className="text-input"
              value={data.Brand || ""}
              onChange={(e) => setData({ ...data, Brand: e.target.value })}
              placeholder="Enter brand details"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

            {/* Case Study Images Section */}
          <div className="form-field">
            <label className="field-label">{t.caseStudyImages}</label>
            <div className="case-images-grid">
              {[0, 1, 2].map((index) => (
                <div key={index} className="case-image-item">
                  <div
                    className="image-upload-box"
                    onClick={() => document.getElementById(`caseImage${index}`).click()}
                  >
                    {caseImagePreviews[index] ? (
                      <>
                        <img 
                          src={caseImagePreviews[index]} 
                          alt={`Case ${index + 1}`} 
                          className="image-preview" 
                        />
                        <button
                          className="remove-image-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCaseImage(index);
                          }}
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="upload-icon">📷</span>
                        <span className="upload-text">Case {index + 1}</span>
                      </>
                    )}
                    <input
                      id={`caseImage${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCaseImageChange(e, index)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-field">
            <label className="field-label">{t.description} <span className="required">*</span></label>
            <textarea
              className="textarea-input"
              value={data.Ovr || ""}
              onChange={(e) => setData({ ...data, Ovr: e.target.value })}
              placeholder="Describe the project"
              rows="4"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Problem */}
          <div className="form-field">
            <label className="field-label">{t.problem} <span className="required">*</span></label>
            <textarea
              className="textarea-input"
              value={data.Prob || ""}
              onChange={(e) => setData({ ...data, Prob: e.target.value })}
              placeholder="What problem did this project solve?"
              rows="4"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          {/* Solution */}
          <div className="form-field">
            <label className="field-label">{t.solution} <span className="required">*</span></label>
            <textarea
              className="textarea-input"
              value={data.Sol || ""}
              onChange={(e) => setData({ ...data, Sol: e.target.value })}
              placeholder="How did you solve it?"
              rows="4"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className="form-column-right">

          {/* Tags */}
          <div className="form-field">
            <label className="field-label">{t.tags}</label>
            <input
              type="text"
              className="text-input"
              value={data.ProjectCategory || ""}
              onChange={(e) => setData({ ...data, ProjectCategory: e.target.value })}
              placeholder={t.enterTag}
              dir={language === "ar" ? "rtl" : "ltr"}
            />

                        <label className="field-label">{t.slug}</label>
            <input
              type="text"
              className="text-input"
              value={data.slug || ""}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              placeholder={t.enterSlug}
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>





          {/* Action Buttons */}
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              {t.cancel}
            </button>
            <button className="btn-save-draft" onClick={handleSaveDraft}>
              {t.saveDraft}
            </button>
            <button className="btn-publish" onClick={handleSubmit}>
              {t.save}
            </button>
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
    </div>
  );
};

export default ProjectForm;