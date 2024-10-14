"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lists = ({ id, title, description, isCompleted, mongoId }) => {
  const router = useRouter();
  const deleteList = async (mongoId) => {
    try {
      const res = await axios.delete("/api", { params: { mongoId: mongoId } });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <ToastContainer />
      <tr className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {id + 1}
        </th>
        <td className="px-6 py-4">{title}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">
          {isCompleted ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex justify-center items-center">
              Completed
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex justify-center items-center">Pending</span>
          )}
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-6 items-center text-xl">
            <MdEdit
              className="text-green-600 cursor-pointer"
              onClick={() => router.push("/edit/" + mongoId)}
            />
            <MdDelete
              className="text-red-600 cursor-pointer"
              onClick={() => deleteList(mongoId)}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Lists;
