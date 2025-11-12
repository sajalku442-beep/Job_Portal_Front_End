import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import store from "@/redux/store.js";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setAuthUser(res?.data?.user));
        navigate("/");
        toast.success(res?.data?.message);
      }
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center sm:max-w-5xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[90%] sm:w-[80%] md:w-[60%] border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 m-2 text-center">Login</h1>

          <div>
            <Label className="m-2">Email</Label>
            <Input
              type="text"
              placeholder="email"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
            />
          </div>

          <div>
            <Label className={"m-2"}>Password</Label>
            <Input
              type="text"
              placeholder="Enter Password"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="r2">Recruter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/login" className="text-blue-600">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
