import React from 'react';
import { SIDE_MENU_DATA } from '../utils/data.js';
import { useUser, useClerk, SignedIn, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      signOut();
      return;
    }
    navigate(route);
  };

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-20 h-20",
      userButtonPopoverCard: "bg-blue-100",
      userButtonPopoverActionButton: "text-red-600",
    },
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* Clerk user button */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <SignedIn>
          <UserButton appearance={userButtonAppearance} />
        </SignedIn>
      </div>

      {/* Menu items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-red-700" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-lg" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
