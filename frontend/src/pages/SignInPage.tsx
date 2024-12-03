import { signIn, signOut } from '../components/auth/auth';
import { Button } from '../components/button';
import { useAuth } from '../components/auth/AuthUserProvider';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signIn();
    navigate('/home');
  };

  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      {/* Title */}
      <h1 style={{ color: '#FF1493' }}>Welcome to Cornell's North Campus Eateries!</h1>

      {/* Sign In/Sign Out Section */}
      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">You are signed in as {user.email}</p>
          <Button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">Please sign in to continue</p>
          
          {/* Container for button and Cornell logo */}
          <div className="flex items-center space-x-4">
            {/* Google Sign-In Button */}
            <Button
              onClick={handleSignIn}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center"
            >
              {/* Google Logo */}
              <img
                src="/images/google.png"
                alt="Google Logo"
                className="w-6 h-6 rounded-lg mr-2" // 'mr-2' for space between logo and text
                style = {{ width: 100, height: 100, borderRadius: '10px' }}
              />
              {/* Text */}
              <p>Sign in with Google</p>
            </Button>

            {/* Cornell Logo next to the button */}
            <img
              src="/images/cornell.jpeg"
              alt="Cornell Logo"
              className="w-10 h-10 rounded-lg align-middle" // Using align-middle for vertical centering
              style={{ width: 500, height: 'auto', borderRadius: '10px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

  