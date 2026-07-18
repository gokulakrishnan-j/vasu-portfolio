import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Trash2, Sliders, RefreshCw, BarChart2 } from 'lucide-react';

export default function Playground() {
  // SVG coordinates: Width 500, Height 350
  const width = 500;
  const height = 350;
  
  // Default data points to show on load (in Math coordinates where y=0 is bottom)
  const defaultPoints = [
    { x: 80, y: 70 },
    { x: 150, y: 120 },
    { x: 220, y: 160 },
    { x: 290, y: 240 },
    { x: 360, y: 270 },
    { x: 420, y: 310 },
  ];

  const [points, setPoints] = useState(defaultPoints);
  const [modelType, setModelType] = useState('linear'); // 'linear' or 'quadratic'
  const [metrics, setMetrics] = useState({ r2: 0, mse: 0 });
  const [modelParams, setModelParams] = useState({ equation: '', coefficients: [] });
  const plotRef = useRef(null);

  // Helper: Solve 3x3 system using Cramer's Rule for quadratic regression
  const solve3x3 = (A, B) => {
    const det3x3 = (M) => {
      return M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
             M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
             M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
    };

    const d = det3x3(A);
    if (Math.abs(d) < 1e-7) return null; // Singular matrix

    // Replace columns with B
    const A1 = [
      [B[0], A[0][1], A[0][2]],
      [B[1], A[1][1], A[1][2]],
      [B[2], A[2][1], A[2][2]],
    ];
    const A2 = [
      [A[0][0], B[0], A[0][2]],
      [A[1][0], B[1], A[1][2]],
      [A[2][0], B[2], A[2][2]],
    ];
    const A3 = [
      [A[0][0], A[0][1], B[0]],
      [A[1][0], A[1][1], B[1]],
      [A[2][0], A[2][1], B[2]],
    ];

    return [det3x3(A1) / d, det3x3(A2) / d, det3x3(A3) / d];
  };

  // Re-compute regression line when points or model type changes
  useEffect(() => {
    if (points.length < 2) {
      setMetrics({ r2: 0, mse: 0 });
      setModelParams({ equation: 'Add at least 2 points to fit a model', coefficients: [] });
      return;
    }

    const n = points.length;
    let r2 = 0;
    let mse = 0;
    let equation = '';
    let coefficients = [];

    // Calculate mean of Y
    const meanY = points.reduce((sum, p) => sum + p.y, 0) / n;
    
    // Total Sum of Squares (SST)
    const sst = points.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0);

    if (modelType === 'linear') {
      // Linear: y = mx + c
      const sumX = points.reduce((sum, p) => sum + p.x, 0);
      const sumY = points.reduce((sum, p) => sum + p.y, 0);
      const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
      const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);

      const denominator = n * sumXX - sumX * sumX;
      let m = 0;
      let c = 0;

      if (Math.abs(denominator) > 1e-5) {
        m = (n * sumXY - sumX * sumY) / denominator;
        c = (sumY - m * sumX) / n;
      } else {
        // Vertical-ish distribution
        m = 0;
        c = meanY;
      }

      coefficients = [m, c];
      equation = `y = ${m.toFixed(3)}x + ${c.toFixed(1)}`;

      // Calculate MSE and R^2
      let sse = 0;
      points.forEach(p => {
        const predY = m * p.x + c;
        sse += Math.pow(p.y - predY, 2);
      });
      mse = sse / n;
      r2 = sst > 0 ? 1 - (sse / sst) : 0;

    } else if (modelType === 'quadratic') {
      // Quadratic: y = ax^2 + bx + c
      if (points.length < 3) {
        setMetrics({ r2: 0, mse: 0 });
        setModelParams({ equation: 'Add at least 3 points for Quadratic model', coefficients: [] });
        return;
      }

      // X^T X elements
      let sumX = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0;
      let sumY = 0, sumXY = 0, sumX2Y = 0;

      points.forEach(p => {
        const x2 = p.x * p.x;
        sumX += p.x;
        sumX2 += x2;
        sumX3 += x2 * p.x;
        sumX4 += x2 * x2;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumX2Y += x2 * p.y;
      });

      const A = [
        [sumX4, sumX3, sumX2],
        [sumX3, sumX2, sumX],
        [sumX2, sumX, n]
      ];
      const B = [sumX2Y, sumXY, sumY];

      const res = solve3x3(A, B);
      if (res) {
        const [a, b, c] = res;
        coefficients = [a, b, c];
        equation = `y = ${a.toFixed(5)}x² + ${b.toFixed(3)}x + ${c.toFixed(1)}`;

        // Calculate MSE and R^2
        let sse = 0;
        points.forEach(p => {
          const predY = a * p.x * p.x + b * p.x + c;
          sse += Math.pow(p.y - predY, 2);
        });
        mse = sse / n;
        r2 = sst > 0 ? 1 - (sse / sst) : 0;
      } else {
        // Fallback to simple mean
        coefficients = [0, 0, meanY];
        equation = `y = ${meanY.toFixed(1)} (Failed to fit parabola)`;
        mse = sst / n;
        r2 = 0;
      }
    }

    setMetrics({ r2: Math.max(0, r2), mse });
    setModelParams({ equation, coefficients });
  }, [points, modelType]);

  // Handle click on plot container to add point
  const handlePlotClick = (e) => {
    if (!plotRef.current) return;
    const rect = plotRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert SVG Y coordinate to Math Y coordinate (flip vertically)
    const mathX = clickX;
    const mathY = height - clickY;

    // Add new point (limit to max 30 points to avoid visual clutter)
    if (points.length < 30) {
      setPoints([...points, { x: mathX, y: mathY }]);
    }
  };

  const clearPoints = () => setPoints([]);
  
  const generateRandomData = () => {
    const newPoints = [];
    const count = 8 + Math.floor(Math.random() * 6); // 8 to 13 points
    const slope = (Math.random() - 0.2) * 0.8; // Random slope
    const intercept = 50 + Math.random() * 100;
    const noiseLevel = 25 + Math.random() * 35;

    for (let i = 0; i < count; i++) {
      const x = 50 + (i / count) * 400 + (Math.random() - 0.5) * 20;
      const trueY = slope * x + intercept;
      const noise = (Math.random() - 0.5) * noiseLevel * 2;
      const y = Math.max(20, Math.min(height - 20, trueY + noise));
      newPoints.push({ x: Math.round(x), y: Math.round(y) });
    }
    setPoints(newPoints);
  };

  // Generate SVG Path for the fitted curve
  const getFittedCurvePath = () => {
    if (points.length < 2 || modelParams.coefficients.length === 0) return '';
    
    if (modelType === 'linear') {
      const [m, c] = modelParams.coefficients;
      // Start and end points inside bounds
      const xStart = 0;
      const yStartMath = m * xStart + c;
      const yStartSvg = height - yStartMath;

      const xEnd = width;
      const yEndMath = m * xEnd + c;
      const yEndSvg = height - yEndMath;

      return `M ${xStart} ${yStartSvg} L ${xEnd} ${yEndSvg}`;
    } else {
      // Quadratic: evaluate curve at multiple intervals
      const [a, b, c] = modelParams.coefficients;
      let pathStr = '';
      
      for (let x = 0; x <= width; x += 10) {
        const yMath = a * x * x + b * x + c;
        const ySvg = height - yMath;
        
        if (x === 0) {
          pathStr = `M ${x} ${ySvg}`;
        } else {
          pathStr += ` L ${x} ${ySvg}`;
        }
      }
      return pathStr;
    }
  };

  return (
    <section id="playground" className="playground-section">
      <div className="section-header">
        <h2 className="section-title">ML Model Playground</h2>
        <p className="section-subtitle">Interact with machine learning fitting algorithms live in your browser</p>
      </div>

      <div className="playground-container glass-card">
        <div className="playground-sidebar">
          <div className="sidebar-group">
            <h3 className="sidebar-title">
              <Sliders size={16} className="sidebar-title-icon" />
              Model Parameters
            </h3>
            
            <div className="control-field">
              <label className="field-label">Algorithm</label>
              <div className="button-group">
                <button
                  className={`option-btn ${modelType === 'linear' ? 'active' : ''}`}
                  onClick={() => setModelType('linear')}
                >
                  Linear Regression
                </button>
                <button
                  className={`option-btn ${modelType === 'quadratic' ? 'active' : ''}`}
                  onClick={() => setModelType('quadratic')}
                >
                  Polynomial (Deg 2)
                </button>
              </div>
            </div>
          </div>

          <div className="sidebar-group">
            <h3 className="sidebar-title">
              <BarChart2 size={16} className="sidebar-title-icon" />
              Training Metrics
            </h3>
            
            <div className="metrics-list">
              <div className="metric-row">
                <span className="metric-name">R² Score (Fit)</span>
                <span className={`metric-val ${metrics.r2 > 0.8 ? 'text-green' : metrics.r2 > 0.5 ? 'text-cyan' : 'text-yellow'}`}>
                  {points.length >= (modelType === 'quadratic' ? 3 : 2) ? metrics.r2.toFixed(4) : 'N/A'}
                </span>
              </div>
              <div className="metric-row">
                <span className="metric-name">Mean Sq. Error</span>
                <span className="metric-val text-violet">
                  {points.length >= (modelType === 'quadratic' ? 3 : 2) ? metrics.mse.toFixed(1) : 'N/A'}
                </span>
              </div>
              <div className="metric-row">
                <span className="metric-name">Data Points</span>
                <span className="metric-val">{points.length} / 30</span>
              </div>
            </div>
          </div>

          <div className="sidebar-group font-mono text-xs equation-box">
            <span className="text-dim">Fitted Equation:</span>
            <div className="equation-text text-green">{modelParams.equation}</div>
          </div>

          <div className="playground-actions">
            <button className="btn btn-secondary btn-full" onClick={generateRandomData}>
              <RefreshCw size={14} />
              Generate Data
            </button>
            <button className="btn btn-danger btn-full" onClick={clearPoints}>
              <Trash2 size={14} />
              Clear Points
            </button>
          </div>
        </div>

        <div className="playground-canvas-area">
          <div className="canvas-header">
            <span>Least Squares Curve Fitter Sandbox</span>
            <div className="tooltip-trigger">
              <HelpCircle size={14} />
              <span className="tooltip-text">
                Click inside the coordinate space to plot points. The regression solver will instantly fit a curve and calculate R² goodness-of-fit.
              </span>
            </div>
          </div>
          
          <div 
            className="svg-wrapper" 
            ref={plotRef}
            onClick={handlePlotClick}
          >
            <svg 
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${width} ${height}`}
              className="regression-svg"
            >
              {/* Grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={(width / 10) * i}
                  y1={0}
                  x2={(width / 10) * i}
                  y2={height}
                  className="grid-line"
                />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={(height / 7) * i}
                  x2={width}
                  y2={(height / 7) * i}
                  className="grid-line"
                />
              ))}

              {/* Axis Labels */}
              <text x="10" y="20" className="axis-label">Y (Feature Target)</text>
              <text x={width - 110} y={height - 10} className="axis-label">X (Independent Variable)</text>

              {/* Fitted Regression Curve */}
              {points.length >= (modelType === 'quadratic' ? 3 : 2) && (
                <path
                  d={getFittedCurvePath()}
                  className="regression-curve animate-draw"
                />
              )}

              {/* Residual lines (error bars) */}
              {points.length >= (modelType === 'quadratic' ? 3 : 2) && modelParams.coefficients.length > 0 && (
                points.map((p, idx) => {
                  let predYMath = 0;
                  if (modelType === 'linear') {
                    const [m, c] = modelParams.coefficients;
                    predYMath = m * p.x + c;
                  } else {
                    const [a, b, c] = modelParams.coefficients;
                    predYMath = a * p.x * p.x + b * p.x + c;
                  }
                  const predYSvg = height - predYMath;
                  const pYSvg = height - p.y;
                  
                  return (
                    <line
                      key={`res-${idx}`}
                      x1={p.x}
                      y1={pYSvg}
                      x2={p.x}
                      y2={predYSvg}
                      className="residual-line"
                    />
                  );
                })
              )}

              {/* Plotted points */}
              {points.map((p, idx) => (
                <g key={`pt-${idx}`}>
                  <circle
                    cx={p.x}
                    cy={height - p.y}
                    r="8"
                    className="data-point-glow"
                  />
                  <circle
                    cx={p.x}
                    cy={height - p.y}
                    r="5"
                    className="data-point"
                  />
                </g>
              ))}
            </svg>

            {points.length === 0 && (
              <div className="canvas-empty-state">
                <p>Canvas is empty. Click anywhere here to add data points!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
