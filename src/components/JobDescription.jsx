import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
  JOB_APPLY_END_POINT,
} from "@/utils/constant";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application?.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setSingleJob(res?.data?.job));
          console.log("inside use effect res.data-", res?.data?.job);
          setIsApplied(
            res?.data?.job?.application.some(
              (application) => application?.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
        console.log(
          "inside useeffect job description setapplied-",
          isApplied,
          singleJob
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div>
            <div className="flex items-center justify-center gap-3">
              <Avatar className="w-16 h-16">
                <AvatarImage src={singleJob?.company?.logo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-xl">{singleJob?.company?.name}</h1>
            </div>

            <div className="cursor-pointer flex flex-row items-center w-full gap-2 mt-4">
              {singleJob?.requirements?.map((data) => (
                <div>
                  <Badge className="text-orange-400" variant="ghost">
                    {data}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden sm:block">
            <Button
              onClick={applyJobHandler}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? (
                <div className=" cursor-not-allowed">Already Applied</div>
              ) : (
                <div>Apply Now</div>
              )}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-center sm:text-left">
          {singleJob?.description}
        </h1>
        <div className="text-center sm:text-left">
          <h1 className="font-bold my-1">
            Role :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Salary :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Job -Type :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experience} <span> Years</span>
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Post Open :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.position}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Total Applicants :{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.application?.length}
            </span>
          </h1>
        </div>
      </div>
      <div className="w-[80%] mx-auto flex justify-center sm:hidden">
        <Button
          onClick={applyJobHandler}
          className={`rounded-lg w-[60%] ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? (
            <div className=" cursor-not-allowed">Already Applied</div>
          ) : (
            <div>Apply Now</div>
          )}
        </Button>
      </div>
    </>
  );
};

export default JobDescription;
