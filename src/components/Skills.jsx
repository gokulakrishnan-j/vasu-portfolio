import React, { useState } from 'react';
import { Terminal, Database, Cpu, Layout, Cloud } from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'languages', name: 'Languages' },
    { id: 'mldl', name: 'ML & Deep Learning' },
    { id: 'data', name: 'Data Wrangling & Viz' },
    { id: 'tools', name: 'Tools & DevOps' },
  ];

  const skillList = [
    // Languages
    { name: 'Python', category: 'languages', level: 92, icon: <Terminal size={16} /> },
    { name: 'SQL', category: 'languages', level: 88, icon: <Database size={16} /> },
    { name: 'R Programming', category: 'languages', level: 75, icon: <Terminal size={16} /> },
    { name: 'JavaScript', category: 'languages', level: 80, icon: <Terminal size={16} /> },
    { name: 'HTML5/CSS3', category: 'languages', level: 85, icon: <Layout size={16} /> },

    // ML/DL
    { name: 'Scikit-Learn', category: 'mldl', level: 90, icon: <Cpu size={16} /> },
    { name: 'PyTorch', category: 'mldl', level: 82, icon: <Cpu size={16} /> },
    { name: 'TensorFlow', category: 'mldl', level: 78, icon: <Cpu size={16} /> },
    { name: 'XGBoost & LightGBM', category: 'mldl', level: 85, icon: <Cpu size={16} /> },
    { name: 'Natural Language Processing (NLP)', category: 'mldl', level: 80, icon: <Cpu size={16} /> },
    { name: 'Computer Vision', category: 'mldl', level: 75, icon: <Cpu size={16} /> },

    // Data Wrangling & Viz
    { name: 'Pandas & NumPy', category: 'data', level: 95, icon: <Database size={16} /> },
    { name: 'Matplotlib & Seaborn', category: 'data', level: 90, icon: <Layout size={16} /> },
    { name: 'Tableau & PowerBI', category: 'data', level: 80, icon: <Layout size={16} /> },
    { name: 'Exploratory Data Analysis (EDA)', category: 'data', level: 92, icon: <Database size={16} /> },
    { name: 'Feature Engineering', category: 'data', level: 88, icon: <Database size={16} /> },

    // Tools & Cloud
    { name: 'Git & GitHub', category: 'tools', level: 88, icon: <Cloud size={16} /> },
    { name: 'Docker', category: 'tools', level: 78, icon: <Cloud size={16} /> },
    { name: 'AWS (S3, EC2, SageMaker)', category: 'tools', level: 75, icon: <Cloud size={16} /> },
    { name: 'FastAPI & Flask', category: 'tools', level: 82, icon: <Database size={16} /> },
    { name: 'PostgreSQL & MongoDB', category: 'tools', level: 84, icon: <Database size={16} /> },
    { name: 'Streamlit & Gradio', category: 'tools', level: 88, icon: <Layout size={16} /> },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillList 
    : skillList.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">Technical Skillset</h2>
        <p className="section-subtitle">My toolbox for solving statistical and machine learning challenges</p>
      </div>

      <div className="skills-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="skill-card glass-card animate-fade-in">
            <div className="skill-info">
              <div className="skill-name-wrapper">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-track">
              <div 
                className="skill-fill" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
