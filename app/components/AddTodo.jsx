"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodo = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api", data);
      toast.success(res.data.message);
      setData({ ...data, title: "", description: "" });
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex items-start justify-center flex-col gap-2 w-auto mt-16 px-2 xl:mx-96 lg:mx-64 md:mx-32 sm:mx-16 mx-8"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full rounded-md"
          value={data.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full rounded-md"
          value={data.description}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white rounded-md flex justify-end"
        >
          Add Todo
        </button>
      </form>
    </>
  );
};

export default AddTodo;
