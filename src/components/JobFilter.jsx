import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";

const JobFilter = ({ item }) => {
  const navigate = useNavigate();
  const jobId = "adasfdfadfadf";
  // console.log("browse items", item);

  return (
    <div
      className="p-5 rounded-xl shadow-xl bg-white border border-gray-100 transform hover:scale-105 hover:bg-gray-100 transition duration-300"
      onClick={() => navigate(`/des/${item?._id}`)}
    >
      <div className="flex items-center justify-between"></div>

      <div className="flex items-center gap-2 my-2">
        <Button className={"bg-white hover:bg-gray-100"}>
          <Avatar>
            <AvatarImage src={item?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{item?.company?.name}</h1>
          <p className="text-sm text-gray-500">{item?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{item?.title}</h1>
        <p className="text-sm text-gray-600">{item?.description}</p>
      </div>
      <div className="cursor-pointer flex flex-row items-center w-full gap-2 mt-4">
        <Badge className="text-red-800" variant="ghost">
          {item?.position} <span> Position</span>
        </Badge>
        <Badge className="text-orange-800" variant="ghost">
          {item?.salary}
        </Badge>
        <Badge className="text-red-800" variant="ghost">
          {item?.jobType}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {item.requirements.map((data) => (
          <div>
            <Badge className="text-purple-800" variant="ghost">
              {data}
            </Badge>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-row-reverse mt-4"></div>
    </div>
  );
};

export default JobFilter;
