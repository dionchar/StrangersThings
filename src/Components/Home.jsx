/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React from 'react';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Strangers' Things</h1>
        <p>Your go-to platform for buying and selling unique items!</p>
      </header>
      <section className="home-features">
        <div className="feature">
          <h2>Explore</h2>
          <p>Discover a wide range of items from different sellers.</p>
        </div>
        <div className="feature">
          <h2>Sell</h2>
          <p>List your own items for sale and connect with potential buyers.</p>
        </div>
        <div className="feature">
          <h2>Connect</h2>
          <p>Communicate with buyers and sellers through our messaging system.</p>
        </div>
      </section>
      <footer className="home-footer">
        <p>&copy; 2023 Strangers' Things. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;