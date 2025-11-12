import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import JobFilter from "./JobFilter";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate();
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  // console.log("search query from browser", searchedQuery);

  const dispatch = useDispatch();
  // console.log("allJobs from browse", allJobs);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs?.length})
        </h1>
        <div className="grid grid-cols-1 w-[80%] sm:w-full sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allJobs?.map((item) => {
            return <JobFilter key={item._id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
