import React from 'react';
import { Heart, BarChart2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <BarChart2 className="logo-icon" />
            <span>Vasu<span className="accent-text">.ds</span></span>
          </a>
          <p className="footer-tagline">
            Building data-driven products that deliver predictive intelligence.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <span className="footer-col-title">Navigation</span>
            <a href="#home" className="footer-link">Home</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#skills" className="footer-link">Skills</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Projects</span>
            <a href="#projects" className="footer-link">Work</a>
            <a href="#playground" className="footer-link">Playground</a>
            <a href="#timeline" className="footer-link">Timeline</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {currentYear} Vasu. All rights reserved.
          </p>
          <div className="footer-signature">
            <span>Designed & Coded with</span>
            <Heart size={12} className="heart-icon" />
            <span>&amp; Python &amp; React</span>
          </div>
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
