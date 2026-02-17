import React, { useEffect } from "react";
import LatestJobCards from "./LatestJobCards";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

const LatestJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, []);

  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 ">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-[#c238b0]">Top </span>{" "}
        <span className="text-amber-400">Picks</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {allJobs?.length <= 0 ? (
          <span>No job available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job?._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
