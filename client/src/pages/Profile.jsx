import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-20 w-20 object-cover self-center cursor-pointer rounded-full mt-2"
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disable:opacity-80 p-3">
          Update
        </button>
      </form>
      <div className="flex flex-row justify-between mt-4">
        <span className="text-red-700 cursor-pointer  capitalize">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer capitalize">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
