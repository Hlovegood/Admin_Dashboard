import React, { useEffect, useState } from "react";
import "./ImageUpload.css";
import { useParams } from "react-router-dom";
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
    teamMembers: "Team Members",
    visibility: "Visibility Settings",
    public: "Public",
    private: "Private",
    customerSatisfaction: "Customer Satisfaction (%)",
    userEngagement: "User Engagement (%)",
    loadTime: "Page Load Time (ms)",
    caseStudyImages: "Case Study Images (Max 3)",
    description: "Project Description",
    problem: "The Problem",
    solution: "The Solution",
    save: "Update Project",
    saveDraft: "Save Draft",
    cancel: "Cancel",
    enterTag: "+ Add tag",
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
    visibility: "إعدادات الرؤية",
    public: "عام",
    private: "خاص",
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
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  
  // Individual state for each field
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [time, setTime] = useState("");
  const [year, setYear] = useState("");
  const [apps, setApps] = useState("");
  const [impact1, setImpact1] = useState("");
  const [impact2, setImpact2] = useState("");
  const [impact3, setImpact3] = useState("");
  const [sub, setSub] = useState("");
  const [research, setResearch] = useState("");
  const [proto, setProto] = useState("");
  const [dev, setDev] = useState("");
  const [vis, setVis] = useState("");
  const [flow, setFlow] = useState("");
  const [brand, setBrand] = useState("");
  const [ovr, setOvr] = useState("");
  const [prob, setProb] = useState("");
  const [sol, setSol] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [slug, setSlug] = useState("");
  
  const [preview, setPreview] = useState(null);
  const [caseImagePreviews, setCaseImagePreviews] = useState(["", "", ""]);
  const [caseImg1, setCaseImg1] = useState("");
  const [caseImg2, setCaseImg2] = useState("");
  const [caseImg3, setCaseImg3] = useState("");

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
          console.log("Fetched data:", result[0]); // Debug log
          const data = result[0];
          
          // Log case images for debugging
          console.log("Case_Img_1:", data.Case_Img_1);
          console.log("Case_Img_2:", data.Case_Img_2);
          console.log("Case_Img_3:", data.Case_Img_3);
          
          // Set all individual states
          setTitle(data.Title || "");
          setRole(data.Role || "");
          setTime(data.Time || "");
          setYear(data.Year || "");
          setApps(data.Apps || "");
          setImpact1(data.Impact_1 || "");
          setImpact2(data.Impact_2 || "");
          setImpact3(data.Impact_3 || "");
          setSub(data.Sub || "");
          setResearch(data.Research || "");
          setProto(data.Proto || "");
          setDev(data.Dev || "");
          setVis(data.Vis || "");
          setFlow(data.Flow || "");
          setBrand(data.Brand || "");
          setOvr(data.Ovr || "");
          setProb(data.Prob || "");
          setSol(data.Sol || "");
          setProjectCategory(data.ProjectCategory || "");
          setSlug(data.slug || "");
          setCaseImg1(data.Case_Img_1 || "");
          setCaseImg2(data.Case_Img_2 || "");
          setCaseImg3(data.Case_Img_3 || "");
          
          if (data.CoverImg) {
            setPreview(data.CoverImg);
          }
          if (data.Case_Img_1 || data.Case_Img_2 || data.Case_Img_3) {
            console.log("Setting case image previews");
            setCaseImagePreviews([
              data.Case_Img_1 || "",
              data.Case_Img_2 || "",
              data.Case_Img_3 || ""
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
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
        
        if (index === 0) setCaseImg1(reader.result);
        else if (index === 1) setCaseImg2(reader.result);
        else if (index === 2) setCaseImg3(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCaseImage = (index) => {
    const newPreviews = [...caseImagePreviews];
    newPreviews[index] = "";
    setCaseImagePreviews(newPreviews);
    
    if (index === 0) setCaseImg1("");
    else if (index === 1) setCaseImg2("");
    else if (index === 2) setCaseImg3("");
  };

  const handleSubmit = async () => {
    try {
      const updateData = {
        Title: title,
        Role: role,
        Time: time,
        Year: year,
        Apps: apps,
        Impact_1: impact1,
        Impact_2: impact2,
        Impact_3: impact3,
        Sub: sub,
        Research: research,
        Proto: proto,
        Dev: dev,
        Vis: vis,
        Flow: flow,
        Brand: brand,
        Ovr: ovr,
        Prob: prob,
        Sol: sol,
        ProjectCategory: projectCategory,
        slug: slug,
        CoverImg: preview,
        Case_Img_1: caseImg1,
        Case_Img_2: caseImg2,
        Case_Img_3: caseImg3,
      };

      const { error } = await supabase
        .from("Project Details")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error updating project:", error);
        alert(`Error updating project: ${error.message}`);
      } else {
        console.log("Form Data:", updateData);
        alert("Project published successfully!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error updating project!");
    }
  };

  const handleSaveDraft = async () => {
    try {
      const updateData = {
        Title: title,
        Role: role,
        Time: time,
        Year: year,
        Apps: apps,
        Impact_1: impact1,
        Impact_2: impact2,
        Impact_3: impact3,
        Sub: sub,
        Research: research,
        Proto: proto,
        Dev: dev,
        Vis: vis,
        Flow: flow,
        Brand: brand,
        Ovr: ovr,
        Prob: prob,
        Sol: sol,
        ProjectCategory: projectCategory,
        slug: slug,
        CoverImg: preview,
        Case_Img_1: caseImg1,
        Case_Img_2: caseImg2,
        Case_Img_3: caseImg3,
        status: "draft"
      };

      const { error } = await supabase
        .from("Project Details")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error saving draft:", error);
        alert(`Error saving draft: ${error.message}`);
      } else {
        alert("Draft saved successfully!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error saving draft!");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      // Reload the original data
      window.location.reload();
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!id) return <p>No project ID provided</p>;

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your role"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>

            <div className="form-field">
              <label className="field-label">{t.duration} <span className="required">*</span></label>
              <input
                type="text"
                className="text-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>

            <div className="form-field">
              <label className="field-label">{t.apps} <span className="required">*</span></label>
              <input
                type="text"
                className="text-input"
                value={apps}
                onChange={(e) => setApps(e.target.value)}
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
                value={impact1}
                onChange={(e) => setImpact1(e.target.value)}
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
                value={impact2}
                onChange={(e) => setImpact2(e.target.value)}
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
                value={impact3}
                onChange={(e) => setImpact3(e.target.value)}
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
              value={sub}
              onChange={(e) => setSub(e.target.value)}
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
              value={research}
              onChange={(e) => setResearch(e.target.value)}
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
              value={proto}
              onChange={(e) => setProto(e.target.value)}
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
              value={dev}
              onChange={(e) => setDev(e.target.value)}
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
              value={vis}
              onChange={(e) => setVis(e.target.value)}
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
              value={flow}
              onChange={(e) => setFlow(e.target.value)}
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
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
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
              value={ovr}
              onChange={(e) => setOvr(e.target.value)}
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
              value={prob}
              onChange={(e) => setProb(e.target.value)}
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
              value={sol}
              onChange={(e) => setSol(e.target.value)}
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
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              placeholder={t.enterTag}
              dir={language === "ar" ? "rtl" : "ltr"}
            />

                        <label className="field-label">{t.slug}</label>
            <input
              type="text"
              className="text-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
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
    </div>
  );
};

export default ProjectForm;