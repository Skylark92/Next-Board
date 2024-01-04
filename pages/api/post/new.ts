import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error("잘못된 요청입니다!");
    }
    if (!(req.body && req.body.title && req.body.content)) {
      throw new Error("내용을 입력해주세요.");
    }

    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne({
      title: req.body.title,
      content: req.body.content,
    });
    res.redirect(302, "/list");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
}
