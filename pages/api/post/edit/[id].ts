import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
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
      throw new Error("빈 칸으로 제출할 수 없습니다.");
    }
    if (!req.query.id || typeof req.query.id !== "string") {
      throw new Error("해당 글을 찾을 수 없습니다.");
    }

    const db = (await connectDB).db("forum");
    await db.collection("post").updateOne(
      {
        _id: new ObjectId(req.query.id),
      },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      }
    );

    res.redirect(302, "/list");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
}
