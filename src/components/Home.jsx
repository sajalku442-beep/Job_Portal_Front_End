import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import Category from "./Category";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "@/redux/store";
import { setSearchedQuery } from "@/redux/jobSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  });
  return (
    <div className=" bg-gradient-to-br from-[#f9fafb] via-[#f4f3ff] to-[#faf5ff]">
      <Navbar />
      <HeroSection />
      <Category />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
