import React from 'react';
import Card from './card';
import java from '../images/java.png';
import react from '../react.svg';
import '../css/home.css';

const Home = () => {
  return (
    <div className="content">
      <Card name="Java" status="Learnt" category="programming language" image={java} />
      <Card name="React" status="Learnt" category="frontend" image={react} />
    </div>
  );
};

export default Home;
