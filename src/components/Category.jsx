import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Front End Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Design",
  "Full Stack developer",
  "Dev Ops",

  "Data Scientist",
  "UI UX Designer",

  "Cloud Engineer",
  "Product Manager",
];

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    console.log(query);
    navigate("/browse");
  };
  return (
    <div className="max-sm:hidden sm:block">
      <Carousel className="w-full max-w-4xl mx-auto my-20  ">
        <CarouselContent>
          {category?.map((cat, index) => (
            <div key={index}>
              <CarouselItem className="md:basis-1/4 lg:basis-1/5 sm:basis-1/3">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full"
                >
                  {cat}
                </Button>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Category;
