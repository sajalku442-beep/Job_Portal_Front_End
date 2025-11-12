import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { PopoverContent } from "../ui/popover";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setAllApplicants } from "@/redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  console.log("Applicants:", applicants);
  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      const updatedApplicants = {
        ...applicants,
        application: applicants?.application?.map((app) =>
          app._id === id ? { ...app, status } : app
        ),
      };
      dispatch(setAllApplicants(updatedApplicants));
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.application?.length > 0 ? (
            applicants?.application?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.applicant?.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell>{item?.applicant?.phone}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item?.applicant?.createdAt?.split("T")[0] || "—"}
                </TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus?.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
