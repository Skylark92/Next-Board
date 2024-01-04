import { NextApiRequest, NextApiResponse } from "next";

export default function now(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error("잘못된 요청입니다!");
    }

    res.status(200).json({
      날짜: new Date().toDateString(),
      시간: new Date().toTimeString(),
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
}
