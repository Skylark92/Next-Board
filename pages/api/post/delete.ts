import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = JSON.parse(req.body);
    if (req.method !== "DELETE") {
      throw new Error("잘못된 요청입니다!");
    }
    if (!id) {
      throw new Error("해당 글을 찾을 수 없습니다.");
    }
    const db = (await connectDB).db("forum");

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
