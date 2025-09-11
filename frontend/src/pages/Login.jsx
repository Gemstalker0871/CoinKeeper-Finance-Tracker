import React from 'react'
import { SignIn, SignOutButton, SignInButton, SignedOut, UserButton, SignUpButton, SignedIn } from '@clerk/clerk-react'

const Login = () => {

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-20 h-20", // Custom width and height
      userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
      userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };

  return (
    <div>
      <SignedOut>
        <SignUpButton mode="modal"/>
        <SignInButton mode="modal"/>
      </SignedOut>

      <SignedIn>
        <UserButton appearance={userButtonAppearance}/>
      </SignedIn>

    </div>
  )
}

export default Login