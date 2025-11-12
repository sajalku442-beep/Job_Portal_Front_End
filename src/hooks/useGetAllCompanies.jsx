import { setCompanies } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        // console.log(res.data.jobs);

        if (res?.data?.success) {
          dispatch(setCompanies(res?.data?.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompany();
  }, []);
};

export default useGetAllCompanies;
