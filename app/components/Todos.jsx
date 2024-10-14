"use client";
import React, { useEffect, useState } from "react";
import Lists from "./Lists";
import axios from "axios";

const Todos = () => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const getLists = async () => {
      const res = await axios.get("/api");
      setLists(res.data.todos);
    };
    getLists();
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8 lg:mx-64 md:mx-32 sm:mx-16 mx-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list, index) => (
            <Lists
              key={index}
              id={index}
              mongoId={list._id}
              title={list.title}
              description={list.description}
              isCompleted={list.isCompleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;
