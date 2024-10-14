import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request, {params}) {
  const todo = await TodoModel.findById(params.id).populate();
  return NextResponse.json(todo);
}

export async function PATCH(request, {params}) {
  const {title, description, isCompleted} = await request.json()
  const todo = await TodoModel.findById(params.id);
  todo.title = title;
  todo.description = description;
  todo.isCompleted = isCompleted;
  await todo.save()
  return NextResponse.json({ message: "Todo edited" });
}