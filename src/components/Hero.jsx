import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Brain, ShieldAlert, Cpu } from 'lucide-react';

export default function Hero() {
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0.55);
  const [valLoss, setValLoss] = useState(0.85);
  const [isTraining, setIsTraining] = useState(true);

  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        setEpoch((prevEpoch) => {
          if (prevEpoch >= 100) {
            setIsTraining(false);
            return 100;
          }
          // Simulate machine learning training dynamics
          const nextEpoch = prevEpoch + 1;
          
          setAccuracy((prevAcc) => {
            const noise = (Math.random() - 0.45) * 0.01;
            const targetAcc = 0.94 - 0.39 * Math.exp(-nextEpoch / 30);
            return Math.min(0.98, Math.max(0.5, targetAcc + noise));
          });

          setValLoss((prevLoss) => {
            const noise = (Math.random() - 0.5) * 0.015;
            const targetLoss = 0.15 + 0.7 * Math.exp(-nextEpoch / 25);
            // Add a small overfitting spike at high epochs
            const overfit = nextEpoch > 75 ? (nextEpoch - 75) * 0.002 : 0;
            return Math.max(0.1, targetLoss + noise + overfit);
          });

          return nextEpoch;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  const resetTraining = () => {
    setEpoch(0);
    setAccuracy(0.55);
    setValLoss(0.85);
    setIsTraining(true);
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="badge-wrapper">
            <span className="hero-badge">
              <Brain size={14} className="badge-icon animate-pulse" />
              Available for Opportunities
            </span>
          </div>
          <h1 className="hero-title">
            Transforming Complex <span className="gradient-text">Data</span> Into <span className="gradient-text">Predictive Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            I'm <strong className="highlight-text">Vasu</strong>, a Data Scientist & Machine Learning Engineer. 
            I build end-to-end ML systems, design interactive data visualizations, and develop statistical models that turn raw numbers into business impact.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#playground" className="btn btn-secondary">
              Try ML Playground
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glass-card ds-dashboard">
            <div className="dashboard-header">
              <div className="dashboard-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="dashboard-title">
                <Cpu size={14} className="dashboard-title-icon" />
                neural_net_training.py
              </div>
              <button 
                onClick={resetTraining} 
                className="dashboard-reset-btn"
                title="Restart Training"
              >
                <RotateCcw size={14} className={isTraining ? '' : 'spin-once'} />
              </button>
            </div>
            
            <div className="dashboard-body">
              <div className="metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">Epoch</span>
                  <span className="metric-value">{epoch}/100</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Accuracy</span>
                  <span className="metric-value text-green">
                    {(accuracy * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Val Loss</span>
                  <span className="metric-value text-cyan">
                    {valLoss.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="progress-container">
                <div className="progress-bar-label">
                  <span>Training Progress</span>
                  <span>{epoch}%</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${epoch}%` }}
                  ></div>
                </div>
              </div>

              <div className="mock-console">
                <div className="console-line text-dim">&gt;&gt;&gt; import torch; import torch.nn as nn</div>
                <div className="console-line text-dim">&gt;&gt;&gt; model = ConvNet().to(device='cuda')</div>
                <div className="console-line text-dim">&gt;&gt;&gt; train_model(model, epochs=100)</div>
                {epoch > 0 && (
                  <div className="console-line text-green animate-fade-in">
                    Epoch {epoch}: [================] loss: {(valLoss * 0.92).toFixed(4)} - acc: {accuracy.toFixed(4)} - val_loss: {valLoss.toFixed(4)} - val_acc: {(accuracy * 0.985).toFixed(4)}
                  </div>
                )}
                {epoch === 100 && (
                  <div className="console-line text-cyan animate-pulse">
                    [INFO] Training complete. Model weights saved to weights/best_model.pt
                  </div>
                )}
              </div>

              <div className="training-indicator">
                <span className={`status-dot ${isTraining ? 'status-active animate-ping' : ''}`}></span>
                <span className="status-text">{isTraining ? 'Optimizing Weights (SGD)...' : 'Training Converged'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
