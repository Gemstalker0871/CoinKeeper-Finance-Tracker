import React, { useEffect } from 'react';
import { 
  SignInButton, 
  SignUpButton, 
  SignedOut, 
  SignedIn, 
  UserButton, 
  useAuth  
} from '@clerk/clerk-react';

const Login = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-20 h-20", // Custom avatar size
      userButtonPopoverCard: "bg-blue-100", // Custom background
      userButtonPopoverActionButton: "text-red-600", // Custom action button text color
    },
  };

  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        console.log("🔑 Clerk JWT Token:", token);
      } else {
        console.log("Not signed in.");
      }
    };

    fetchToken();
  }, [isSignedIn, getToken]);

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
