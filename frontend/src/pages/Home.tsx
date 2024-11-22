import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../components/auth/auth';
import { Button } from "../components/button";

<Button onClick={signIn}>Sign In</Button>;

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <center>
        <h1 style={{ color: '#FF1493' }}>Welcome to Cornell's North Campus Eateries!</h1>
      </center>
      <input
        type="text"
        placeholder="Search Eateries"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <div>
          <Link to="/morrison-dining">
            <h2>Morrison Dining</h2>
          </Link>
          <p>Choose your own culinary adventure at Cornell's newest dining room.</p>
        </div>

        <div>
          <Link to="/northstar-dining">
            <h2>North Star Dining</h2>
          </Link>
          <p>Dining room located in Appel Commons on North Campus.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
