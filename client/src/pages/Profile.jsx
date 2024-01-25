import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice.js";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(formData);
  // console.log(imagePercentage);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    // get storage
    const storage = getStorage(app);
    // assign a name to the image
    const fileName = new Date().getTime() + image.name;
    // get storage ref
    const storageRef = ref(storage, fileName);
    // upload task
    const uploadTask = uploadBytesResumable(storageRef, image);
    // check progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      // get image url
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
          dispatch(
            updateUserSuccess({ ...currentUser, profilePicture: downloadURL })
          );
        });
      }
    );
  };
  // handle change
  const handleUpdateChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(...formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess({ ...formData }));
      setFormData({});
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdateSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData?.profilePicture || currentUser?.profilePicture}
          alt="profile"
          className="h-20 w-20 object-cover self-center cursor-pointer rounded-full mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading profile (file size must be less than 2MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-800">{`Uploading: ${imagePercentage} '%'`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleUpdateChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleUpdateChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleUpdateChange}
        />
        <button
          type="button"
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3 cursor-pointer"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex flex-row justify-between mt-4">
        <span className="text-red-700 cursor-pointer  capitalize">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer capitalize">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User is updated successfully!"}
      </p>
    </div>
  );
}

export default Profile;
