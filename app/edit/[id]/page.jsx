"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Edit = ({ params }) => {
  const route = useRouter()
  const [data, setData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axios.get("/api/edit/" + params.id);
        setData({
          ...data,
          title: res.data.title,
          description: res.data.description,
          isCompleted: res.data.isCompleted,
        });
      } catch (err) {
        toast.error("Error");
      }
    };
    getTodo();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/edit/" + params.id, data);
      route.push("/")
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Error");
    }
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex items-start justify-center flex-col gap-2 w-auto mt-24 px-2 xl:mx-96 lg:mx-64 md:mx-32 sm:mx-16 mx-8">
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full rounded-md"
          required
          value={data.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full rounded-md"
          required
          value={data.description}
          onChange={handleChange}
        ></textarea>
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative">
            <select
              value={data.isCompleted ? "completed" : "pending"}
              onChange={(e) =>
                e.target.value === "completed"
                  ? setData({ ...data, isCompleted: true })
                  : setData({ ...data, isCompleted: false })
              }
              className="w-full border-2 rounded-md pl-3 pr-8 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="currentColor"
              className="h-5 w-5 ml-1 absolute top-3.5 right-2.5 text-slate-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white rounded-md flex justify-end"
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default Edit;
