import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signOut } from '../components/auth/auth';
import { Button } from "../components/button";
import { useAuth } from '../components/auth/AuthUserProvider'; // Assuming you're using this to get the user

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth(); // Get the current authenticated user
  const navigate = useNavigate(); // Hook to navigate the user

  // List of eateries 
  const eateries = [
    { name: 'Morrison Dining', description: 'Choose your own culinary adventure at Cornell\'s newest dining room.', imageUrl: '/images/morrison.jpg', link: '/morrison-dining' },
    { name: 'North Star Dining', description: 'Dining room located in Appel Commons on North Campus.', imageUrl: '/images/northStar.jpg', link: '/northstar-dining' },
    ];

  // Filter eateries based on the search 
  const filteredEateries = eateries.filter(eatery => 
    eatery.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

   // Sign in handler
   const handleSignIn = async () => {
    await signIn();
    navigate('/home'); // Redirect user to /home after successful sign-in
  };

  // Sign out handler
  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redirect user to home or login page after sign-out
  };

  useEffect(() => {
    if (user) {
      // If user is already signed in, redirect them to the new home page
      navigate('/home');
    }
  }, [user, navigate]);

  // Update search state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px'}}>
      <center>
        <h1 style={{ color: '#FF1493' }}>Welcome to Cornell's North Campus Eateries!</h1>
      </center>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Eateries"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      {/* Show filtered eateries */}
      {filteredEateries.length > 0 ? (
        <div>
          {filteredEateries.map((eatery, index) => (
            <div key={index}>
              <Link to={eatery.link}>
                <h2>{eatery.name}</h2>
              </Link>
              <p>{eatery.description}</p>
              <img
                src={eatery.imageUrl}
                alt={eatery.name}
                style={{ width: 'auto', height: 'auto', borderRadius: '10px', maxWidth: '300px' }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No eateries found matching your search.</p>
      )}

      {/* SignIn/SignOut Buttons */}
      <div style={{ marginTop: '20px' }}>
        {!user ? (
          <Button onClick={handleSignIn}>Sign In</Button>
        ) : (
          <Button onClick={handleSignOut}>Sign Out</Button>
        )}
      </div>
    </div>
  );
};

export default HomePage;