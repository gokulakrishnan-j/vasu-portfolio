import React from 'react';
import { Database, LineChart, Code, Award, GraduationCap } from 'lucide-react';

export default function About() {
  const dsPillars = [
    {
      icon: <LineChart className="pillar-icon text-violet" />,
      title: 'Statistical Modeling',
      desc: 'Formulating hypotheses, designing experiments (A/B testing), and building predictive models using regression, classification, and forecasting algorithms.',
    },
    {
      icon: <Database className="pillar-icon text-cyan" />,
      title: 'Data Engineering & ETL',
      desc: 'Wrangling messy data, constructing robust ETL pipelines, querying databases using advanced SQL, and handling large-scale data manipulation.',
    },
    {
      icon: <Code className="pillar-icon text-emerald" />,
      title: 'Software & Deployment',
      desc: 'Writing clean, reproducible Python code, containerizing models with Docker, and building interactive web dashboards with Streamlit and React.',
    },
  ];

  const quickStats = [
    { value: '15+', label: 'ML Models Built' },
    { value: '10+', label: 'Academic & Personal Projects' },
    { value: '50GB+', label: 'Data Cleaned & Analyzed' },
    { value: 'Top 12%', label: 'Kaggle Competition Rank' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Bridging mathematics, computer science, and business strategy</p>
      </div>

      <div className="about-grid">
        <div className="about-bio">
          <div className="profile-img-wrapper">
            <img src="/profile.jpg" alt="Vasu Profile" className="profile-img" />
          </div>
          <h3 className="bio-title">Hello! I'm Vasu.</h3>
          <p className="bio-text">
            I am a highly motivated Data Scientist fresher with a strong academic foundation in statistics and computer science. I specialize in training machine learning models, uncovering hidden patterns through exploratory data analysis, and deploying models to production.
          </p>
          <p className="bio-text">
            During my academic journey, I discovered a passion for solving complex, real-world problems. Whether it's optimizing a customer churn model, fine-tuning an NLP classifier, or deploying a containerized API on the cloud, I thrive on the challenge of making data useful.
          </p>

          <div className="stats-grid">
            {quickStats.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-value gradient-text">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-pillars">
          <h3 className="pillars-title">My Core Focus Areas</h3>
          <div className="pillars-list">
            {dsPillars.map((pillar, i) => (
              <div key={i} className="pillar-card glass-card">
                <div className="pillar-header">
                  {pillar.icon}
                  <h4 className="pillar-title">{pillar.title}</h4>
                </div>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
