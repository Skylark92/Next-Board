import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      throw new Error("잘못된 요청입니다!");
    }
    if (!req.query.id) {
      throw new Error("해당 글을 찾을 수 없습니다.");
    }
    if (!(typeof req.query.id === "string")) {
      throw new Error("해당 글의 id는 문자열이어야 합니다.");
    }
    const db = (await connectDB).db("forum");
    const comments = await db
      .collection("comment")
      .find({ post: new ObjectId(req.query.id) })
      .toArray();

    res.status(200).json(comments);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
}
