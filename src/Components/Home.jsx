/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <div>
        
          <p className= "welcome-paragraph">
          Welcome to the Puppy Bowl 2023, the cutest sporting event of the year! 
          Get ready for a paw-some display of puppy athleticism, where fur and fluff 
          collide in an epic battle for the title of the Most Adorable Athlete.
          The halftime show promises to be an absolute treat, featuring the world-famous 
          Puppy Marching Band and their adorable rendition of "Who Let the Dogs Out."
          Puppy Bowl 2023 is an event you won't want to miss, where the stakes are high, 
          the fur is fluffy, and the "awwws" are in abundance. 
          Get ready for a barking good time!
          </p>
          <div>
          <p>
            Hello World
          </p>
          <Link to="/posts"> </Link> 
          </div>
          </div>
      );
    };
    
    export default Home;