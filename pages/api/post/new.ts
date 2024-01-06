import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (req.method !== "POST") {
      throw new Error("잘못된 요청입니다!");
    }
    if (!(req.body && req.body.title && req.body.content)) {
      throw new Error("내용을 입력해주세요.");
    }
    if (!session?.user) {
      throw new Error("로그인이 필요한 서비스입니다.");
    }

    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne({
      title: req.body.title,
      content: req.body.content,
      author: session.user.email,
    });
    res.redirect(302, "/list");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
}
