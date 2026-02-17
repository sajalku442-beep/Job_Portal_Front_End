import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transform hover:scale-105 hover:bg-gray-50 transition duration-300"
      onClick={() => navigate(`/des/${job?._id}`)}
    >
      <div className="flex items-center gap-2 my-2">
        <Button className={"bg-white hover:bg-gray-100"}>
          <Avatar className="w-13 h-13">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="cursor-pointer flex flex-row items-center w-full gap-2 mt-4">
        <Badge className="text-red-800" variant="ghost">
          <span>{job?.position}</span> position
        </Badge>
        <Badge className="text-orange-800" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-red-800" variant="ghost">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {job?.requirements?.map((data) => (
          <div>
            <Badge className="text-purple-700" variant="ghost">
              {data}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobCards;
