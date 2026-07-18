import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, Award } from 'lucide-react';

export default function Resume() {
  const [activeTab, setActiveTab] = useState('education');

  const education = [
    {
      institution: 'State University of Technology',
      degree: 'Master of Science in Data Science',
      period: '2024 - 2026',
      gpa: '3.92 / 4.00',
      details: 'Focused on Advanced Machine Learning, Applied Statistics, Deep Learning, and Distributed Data Systems (Spark/Hadoop). Completed thesis on "Geospatial Clustering optimization using GNNs".',
    },
    {
      institution: 'National Institute of Science',
      degree: 'Bachelor of Science in Mathematics & Computer Science',
      period: '2020 - 2024',
      gpa: '3.85 / 4.00',
      details: 'Strong mathematical foundation in Linear Algebra, Calculus, Probability, Mathematical Statistics, and Data Structures & Algorithms.',
    },
  ];

  const experience = [
    {
      company: 'DataTech Solutions',
      role: 'Data Science Intern',
      period: 'May 2025 - August 2025',
      details: [
        'Wrangled and preprocessed over 50GB of transactional customer data using PySpark and Pandas.',
        'Built and tuned Random Forest and XGBoost classification models to predict customer churn, achieving an AUC-ROC of 0.88.',
        'Designed interactive Tableau dashboards to present model insights and feature importances to product managers.',
      ],
    },
    {
      company: 'State University Research Lab',
      role: 'Graduate Research Assistant',
      period: 'Sept 2024 - April 2025',
      details: [
        'Applied statistical hypothesis testing (ANOVA, Chi-Square, t-tests) to analyze climate anomalies datasets.',
        'Implemented custom data scraping and ingestion scripts using Python and Beautiful Soup, saving 15 hours of manual collection weekly.',
        'Collaborated with researchers to draft statistical methodology sections for peer-reviewed papers.',
      ],
    },
  ];

  const certifications = [
    {
      title: 'AWS Certified Machine Learning – Specialty',
      issuer: 'Amazon Web Services (AWS)',
      date: '2025',
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI (Coursera)',
      date: '2024',
    },
    {
      title: 'Google Advanced Data Analytics Certificate',
      issuer: 'Google',
      date: '2024',
    },
  ];

  return (
    <section id="timeline" className="resume-section">
      <div className="section-header">
        <h2 className="section-title">Academic & Professional Journey</h2>
        <p className="section-subtitle">Education, hands-on internships, and technical certifications</p>
      </div>

      <div className="resume-tabs">
        <button
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <GraduationCap size={16} className="btn-tab-icon" />
          Education
        </button>
        <button
          className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          <Briefcase size={16} className="btn-tab-icon" />
          Experience & Certs
        </button>
      </div>

      <div className="timeline-container">
        {activeTab === 'education' ? (
          <div className="timeline-list">
            {education.map((item, idx) => (
              <div key={idx} className="timeline-item glass-card animate-fade-in">
                <div className="timeline-marker">
                  <div className="marker-dot dot-edu"></div>
                  {idx < education.length - 1 && <div className="marker-line"></div>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="timeline-period">
                      <Calendar size={14} className="meta-icon" />
                      {item.period}
                    </span>
                    <span className="timeline-badge edu-badge">GPA: {item.gpa}</span>
                  </div>
                  <h3 className="timeline-title">{item.degree}</h3>
                  <h4 className="timeline-org text-cyan">{item.institution}</h4>
                  <p className="timeline-desc">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="timeline-grid">
            <div className="timeline-list">
              <h3 className="timeline-subheading">
                <Briefcase size={16} className="subheading-icon text-violet" />
                Work History
              </h3>
              {experience.map((item, idx) => (
                <div key={idx} className="timeline-item glass-card animate-fade-in">
                  <div className="timeline-marker">
                    <div className="marker-dot dot-exp"></div>
                    {idx < experience.length - 1 && <div className="marker-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-meta">
                      <span className="timeline-period">
                        <Calendar size={14} className="meta-icon" />
                        {item.period}
                      </span>
                    </div>
                    <h3 className="timeline-title">{item.role}</h3>
                    <h4 className="timeline-org text-violet">{item.company}</h4>
                    <ul className="timeline-bullet-list">
                      {item.details.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="certs-column">
              <h3 className="timeline-subheading">
                <Award size={16} className="subheading-icon text-emerald" />
                Certifications
              </h3>
              <div className="certs-list">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="cert-card glass-card animate-fade-in">
                    <div className="cert-icon-box">
                      <Award size={20} className="text-emerald" />
                    </div>
                    <div className="cert-details">
                      <h4 className="cert-title">{cert.title}</h4>
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-dot">•</span>
                        <span className="cert-date">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
