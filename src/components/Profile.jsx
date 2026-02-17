import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { BadgeAlert, Contact, Ghost, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

const skills = ["html", "Java", "python"];
const ishasResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log(user);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <h1>{user?.name?.toUpperCase()}</h1>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <p className="font-bold mt-2 mb-2">{user?.profile?.bio}</p>
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>{user?.email}</span>
          <Contact />
          <span>{user?.phone}</span>
        </div>
        <div className="flex gap-2">
          <h1>Skills</h1>

          {user?.profile?.skills?.length != 0 ? (
            user?.profile?.skills?.map((item, index) => (
              <Badge variant={Ghost} key={index}>
                {item}
              </Badge>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {ishasResume ? (
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            </div>
          ) : (
            <div>
              <span>NA</span>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-center font-semibold m-4">Applied Job</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
