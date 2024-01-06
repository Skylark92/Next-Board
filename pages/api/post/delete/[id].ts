import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const session = await getServerSession(req, res, authOptions);
    if (req.method !== "DELETE" || !id || typeof id !== "string") {
      throw new Error("잘못된 요청입니다!");
    }
    const db = (await connectDB).db("forum");

    const find = await db.collection("post").findOne({ _id: new ObjectId(id) });
    if (!session?.user) {
      throw new Error("로그인이 필요한 서비스입니다.");
    }
    if (find?.author !== session.user.email) {
      throw new Error("자신의 글만 삭제할 수 있습니다.");
    }

    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json("삭제 완료.");
    } else if (result.deletedCount === 0) {
      throw new Error("삭제에 실패했습니다.");
    } else {
      throw new Error("알 수 없는 에러!");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
}
