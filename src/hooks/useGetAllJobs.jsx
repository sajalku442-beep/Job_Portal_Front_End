import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAlljobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );
        console.log(
          "all jobs from searchquery and  useGetallJObs",
          searchedQuery,
          res?.data
        );

        if (res?.data?.success) {
          dispatch(setAllJobs(res?.data?.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlljobs();
  }, []);
};

export default useGetAllJobs;
