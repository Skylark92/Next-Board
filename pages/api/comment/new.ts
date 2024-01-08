import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    req.body = JSON.parse(req.body);

    if (req.method !== "POST") {
      throw new Error("잘못된 요청입니다!");
    }
    if (!(req.body && req.body.comment)) {
      throw new Error("내용을 입력해주세요.");
    }
    if (!session?.user) {
      throw new Error("로그인이 필요한 서비스입니다.");
    }

    const db = (await connectDB).db("forum");
    const find = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.body.post) });
    if (!find) {
      throw new Error("대상 글을 찾을 수 없습니다.");
    }
    const result = await db.collection("comment").insertOne({
      comment: req.body.comment,
      author: session.user.email,
      post: new ObjectId(req.body.post),
    });
    if (!result.acknowledged) {
      throw new Error("댓글 작성에 실패했습니다.");
    }
    const newList = await db
      .collection("comment")
      .find({ post: new ObjectId(req.body.post) })
      .toArray();

    res.status(200).json(newList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
}
