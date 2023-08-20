/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
          <div>
          <p>
            Hello World
          </p>
          <Link to="/posts"> </Link> 
          </div>
      );
    };
    
    export default Home;