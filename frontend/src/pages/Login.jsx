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
  const { getToken, isSignedIn, isLoaded } = useAuth(); // 👈 include isLoaded

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-20 h-20",
      userButtonPopoverCard: "bg-blue-100",
      userButtonPopoverActionButton: "text-red-600",
    },
  };

  useEffect(() => {
    if (!isLoaded) return; // wait until Clerk finishes loading
    if (isSignedIn) {
      navigate("/"); // redirect if already signed in
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

  // Show login page only after Clerk is loaded and user is not signed in
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <SignedOut>
        <SignUpButton mode="modal" />
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <UserButton appearance={userButtonAppearance} />
      </SignedIn>
    </div>
  );
};

export default Login;
