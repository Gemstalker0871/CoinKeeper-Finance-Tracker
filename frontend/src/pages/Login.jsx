import React, { useEffect } from 'react';
import { 
  SignInButton, 
  SignUpButton, 
  SignedOut, 
  SignedIn, 
  UserButton, 
  useAuth  
} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-20 h-20",
      userButtonPopoverCard: "bg-blue-100",
      userButtonPopoverActionButton: "text-red-600",
    },
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        console.log("🔑 Clerk JWT Token:", token);
      }
    };
    fetchToken();
  }, [isSignedIn, getToken]);

  if (!isLoaded) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-red-200 text-white px-4">
      
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
        Welcome to CoinKeeper
      </h1>

      <SignedOut>
        <div className="flex flex-col md:flex-row gap-4">
          <SignInButton mode="modal">
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-8 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="mt-6">
          <UserButton appearance={userButtonAppearance} />
        </div>
      </SignedIn>

      {/* Footer / tagline */}
      <p className="mt-10 text-sm md:text-base text-indigo-100 text-center max-w-md">
        Securely track your income and expenses with CoinKeeper. Your finances, simplified.
      </p>
    </div>
  );
};

export default Login;
