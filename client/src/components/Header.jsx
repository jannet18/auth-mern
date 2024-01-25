import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <h1 className="font-bold uppercase">Auth App</h1>
        <ul className="flex gap-4 flex-row ">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser?.profilePicture || current.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
