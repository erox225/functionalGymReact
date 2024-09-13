import React from 'react';
import './css/Section.css';

const Section = ({ id, title, content, backgroundColor }) => {
  return (
    <div id={id} className="section" style={{ backgroundColor }}>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export default Section;
