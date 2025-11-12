import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import JobFilter from "./JobFilter";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Link } from "react-router-dom";

const Job = () => {
  useGetAllJobs();

  const { allJobs, searchedQuery, filterQuery } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState(allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job?.description?.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(filterQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
    // return () => {
    //   dispatch(setSearchedQuery(""));
    // };
  }, [allJobs, filterQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="sm:hidden">
          <FilterCard />
        </div>

        <div className="flex gap-5">
          <div className="w-20% hidden sm:block">
            <FilterCard />
          </div>
          {filterJobs?.length <= 0 ? (
            <span>No job exist</span>
          ) : (
            <div className="flex-1 items-center h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 w-[80%] mx-auto sm:w-[100%] sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs?.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    key={item._id}
                  >
                    <Link to={`/des/${item?._id}`}>
                      <JobFilter item={item} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
