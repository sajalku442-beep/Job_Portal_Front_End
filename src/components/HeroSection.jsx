import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedQuery } = useSelector((store) => store.job);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    console.log("query from hero search", query);
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-3 ">
        <div className="flex w-[80%] sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-300 pl-3 rounded-2xl items-center gap-4 mx-auto ">
          <input
            type="text"
            placeholder="find Your dream job"
            className="w-full outline-none border-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full cursor-pointer"
          >
            <Search />
          </Button>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-5">
          Get Your{" "}
          <span className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
