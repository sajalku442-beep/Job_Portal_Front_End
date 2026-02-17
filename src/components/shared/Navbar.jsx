import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { useState } from "react";

import { Search } from "lucide-react";

import { setSearchedQuery } from "@/redux/jobSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center xs:justify-between mx-auto mb-2 h-16">
      <div className="hidden xs:block">
        <Link to="/">
          <h1 className="flex items-center text-2xl font-bold">
            <span className="text-[#763cda] ml-2">Job</span>
            <span className="text-emerald-600">Portal</span>
          </h1>
        </Link>
      </div>

      <div
        className="flex items-center gap-5
      "
      >
        <ul className="flex font-medium items-center gap-3">
          {user && user.role == "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              {/* <li>
                <>
                  <Link to={"/"} className="cursor-pointer">
                    Home
                  </Link>
                </>
              </li> */}
              <li>
                <Link to={"/job"} className="cursor-pointer">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to={"/browse"} className="cursor-pointer">
                  Browser
                </Link>
              </li>
            </>
          )}
        </ul>
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#6A38C2] hover:bg-[#4c3672]">
                SignUp
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-bold ">
                      Welcome <span>{user?.name?.toUpperCase()}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Link to={"/profile"}>
                      <Button variant="link">View Profile</Button>
                    </Link>
                  </div>

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
