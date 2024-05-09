
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Address from '../components/Address';
import Orders from '../components/Orders';
import UserProfile from '../components/UserProfile';
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
  const [render, setRender] = useState("Profile");
  const [data, setData] = useState({
    email: "",
    FirstName: "",
    LastName: "",
    googleID: "",
    address: {},
    orders: {},
  });
  const {  user,ready } = useContext(UserContext);
  const sidebarNavItems = [
    {
      title: "Profile"
    },
    {
      title: "Orders"
    },
    {
      title: "Address"
    },

  ];
  
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user-profile/${user._id}`);
        const { FirstName, LastName, email, orders, googleID, address } =
          response.data;
        if (googleID)
          setData({
            email: email,
            FirstName: FirstName,
            LastName: LastName,
            googleID: googleID,
            address: address,
            orders: orders,
          });
        else
          setData({
            email: email,
            FirstName: FirstName,
            LastName: LastName,
            address: address,
            googleID: null,
            orders: orders,
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!ready) {
    return "Loading.....";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Navbar links={[{ button: true, path: "/", btn_name: "Logout" }]} />
      <div className="space-y-6 p-10 pb-16 md:block mx-auto max-w-4xl">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Account</h2>
          <p className="text-muted-foreground">
            Manage your user account.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
        <Sidebar setRender={setRender} render={render} items={sidebarNavItems}/>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
          {render === 'Profile' && <UserProfile 
        FirstName={data.FirstName} 
        LastName={data.LastName} 
        email={data.email}
        addressData={data.address}
          id={user._id}
        />}
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Profile;
