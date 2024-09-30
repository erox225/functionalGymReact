import React from 'react';
import './css/Section.css';

const Section = ({ id, leftContent, rightContent, backgroundColor }) => {
  return (
    <div id={id} className="section" style={{ backgroundColor }}>
      <div className="section-content">
        <div className="left-content">
          {leftContent}
        </div>
        <div className="right-content">
          {rightContent}
        </div>
      </div>
    </div>
  );
}

export default Section;
