import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    // Simulate API network request
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's discuss datasets, models, opportunities, or collaboration</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3 className="info-title">Let's connect</h3>
          <p className="info-desc">
            I'm currently seeking full-time opportunities in Data Science, Machine Learning, and Data Engineering. Whether you have a job opening, a project idea, or just want to chat about statistics, feel free to reach out!
          </p>

          <div className="contact-methods">
            <a href="mailto:vasu.datascience@email.com" className="method-card glass-card">
              <Mail className="method-icon text-violet" />
              <div className="method-details">
                <span className="method-label">Email Me</span>
                <span className="method-value">vasu.datascience@email.com</span>
              </div>
            </a>

            <div className="social-links-grid">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-card glass-card"
              >
                <Linkedin className="social-card-icon text-cyan" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-card glass-card"
              >
                <Github className="social-card-icon" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container glass-card">
          {isSubmitted ? (
            <div className="success-state animate-fade-in">
              <CheckCircle2 size={48} className="text-green success-icon" />
              <h3 className="success-title">Message Sent Successfully!</h3>
              <p className="success-desc">
                Thank you for reaching out. I have received your message and will respond within 24 hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="btn btn-secondary btn-center"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Data Science Role / Partnership"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Vasu, I would love to talk about a potential opportunity..."
                  className="form-textarea"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSending} 
                className="btn btn-primary btn-submit"
              >
                {isSending ? (
                  <>
                    <Send size={16} className="btn-icon spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={16} className="btn-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
