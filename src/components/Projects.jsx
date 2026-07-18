import React, { useState } from 'react';
import { ExternalLink, BarChart2, Eye, Compass, Cpu, MessageSquare } from 'lucide-react';
import { Github } from './Icons';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Work' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'nlp', name: 'NLP & Text' },
    { id: 'cv', name: 'Computer Vision' },
  ];

  const projectsList = [
    {
      title: 'Customer Churn Analytics & Predictive Model',
      category: 'ml',
      desc: 'Developed an end-to-end churn prediction pipeline using XGBoost and SHAP explainability. Features include custom transformers, feature importance charts, and a deployment-ready containerized microservice.',
      metrics: { metricName: 'Accuracy', metricVal: '89.4%', extra: 'SHAP Explainability' },
      tech: ['Python', 'XGBoost', 'Scikit-Learn', 'Docker', 'FastAPI'],
      icon: <BarChart2 size={24} className="project-type-icon text-violet" />,
      githubLink: 'https://github.com',
      demoLink: '#playground', // links to our internal playground!
    },
    {
      title: 'Mental Health Sentiment Classifier',
      category: 'nlp',
      desc: 'Fine-tuned a DistilBERT model to classify mental health support queries into 5 distinct psychological severity tags. Includes custom scraping scripts and a Flask API integrated with visual dashboard analytics.',
      metrics: { metricName: 'F1-Score', metricVal: '0.912', extra: 'DistilBERT model' },
      tech: ['PyTorch', 'HuggingFace', 'Flask', 'Pandas', 'Matplotlib'],
      icon: <MessageSquare size={24} className="project-type-icon text-cyan" />,
      githubLink: 'https://github.com',
      demoLink: 'https://github.com',
    },
    {
      title: 'Real Estate Valuation via Spatial Clustering',
      category: 'ml',
      desc: 'Engineered a geospatial price-prediction model using Random Forest and K-Means clustering. Segmented locations into spatial groups to capture micro-neighborhood premiums, reducing error margins significantly.',
      metrics: { metricName: 'MAE Reduction', metricVal: '14.2%', extra: 'K-Means + Random Forest' },
      tech: ['Scikit-Learn', 'K-Means', 'Geopandas', 'Seaborn', 'Python'],
      icon: <Compass size={24} className="project-type-icon text-emerald" />,
      githubLink: 'https://github.com',
      demoLink: 'https://github.com',
    },
    {
      title: 'Automated Manufacturing Defect Detection',
      category: 'cv',
      desc: 'Trained a YOLOv8 object detection model to identify physical defects on assembly line components. Engineered a data augmentation pipeline using Albumentations to simulate lighting variances.',
      metrics: { metricName: 'mAP @ 0.5', metricVal: '94.5%', extra: '42 FPS Inference' },
      tech: ['YOLOv8', 'PyTorch', 'OpenCV', 'Albumentations', 'Python'],
      icon: <Cpu size={24} className="project-type-icon text-rose" />,
      githubLink: 'https://github.com',
      demoLink: 'https://github.com',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Real-world applications of machine learning, NLP, and statistical inference</p>
      </div>

      <div className="projects-tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`tab-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, i) => (
          <div key={i} className="project-card glass-card animate-fade-in">
            <div className="project-header">
              <div className="project-icon-box">{project.icon}</div>
              <div className="project-links">
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link-btn"
                  title="Source Code"
                >
                  <Github size={18} />
                </a>
                <a 
                  href={project.demoLink} 
                  className="project-link-btn"
                  title="Live Demo"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              
              <div className="project-metrics-badge">
                <span className="metric-badge-label">{project.metrics.metricName}:</span>
                <span className="metric-badge-val font-semibold">{project.metrics.metricVal}</span>
                <span className="metric-badge-extra">({project.metrics.extra})</span>
              </div>
            </div>

            <div className="project-footer">
              <div className="project-tech-tags">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
