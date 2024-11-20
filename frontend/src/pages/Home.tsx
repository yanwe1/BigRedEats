import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn, signOut} from '../../../backend/auth' 

<button onClick={signIn}> Sign In</button>;

interface Eatery {
    id: number;
    name: string;
    description: string;
}
const HomePage: React.FC = () => {
    // Create eateries
    const [eateries] = useState<Eatery[]>([
        { id: 1, name: 'Morrison Dining', description: 'Choose your own culinary adventure at Cornell\'s newest dining room.'},
        { id: 2, name: 'North Star Dining Room', description: 'Dining room located in Appel Commons on North Campus.'} 
    ]);
    const [searchQuery, setSearchQuery] = useState(''); 
    
    const filteredEateries = eateries.filter((eatery) =>
    eatery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    eatery.description.toLowerCase().includes(searchQuery.toLowerCase())
);

    return (
        <div>
            <center>
                <h1 style={{ color: '#FF1493'}}>Welcome to Cornell's North Campus Eateries!</h1>
            </center>
            <input 
                type="text" 
                placeholder="Search Eateries" 
                value ={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            <div>
                {filteredEateries.map((eateries) => (
                <div key={eateries.id}>
                    <Link to={`/eatery/${eateries.id}`}>
                    <h2>{eateries.name}</h2>
                    </Link>
                    <p>{eateries.description}</p>
                </div>
                ))}
          </div>
        </div>
      );
    };

export default HomePage;
