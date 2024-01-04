import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      throw new Error("잘못된 요청입니다!");
    }

    const db = (await connectDB).db("forum");
    const list = await db.collection("post").find().toArray();

    res.status(200).json(list);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
}
