import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const checkEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/;
const maxName = 15;
const minPass = 4;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error("잘못된 요청입니다!");
    }
    if (!(req?.body.email && req?.body.password && req?.body.name)) {
      throw new Error("빈 칸으로 제출할 수 없습니다.");
    }
    if (!checkEmail.test(req.body.email)) {
      throw new Error("잘못된 이메일 형식입니다.");
    }
    if (req.body.name.length > maxName) {
      throw new Error("이름은 15자 이내여야 합니다.");
    }
    if (req.body.password.length < minPass) {
      throw new Error("비밀번호는 최소 4자리 이상이이야 합니다.");
    }
    const db = (await connectDB).db("forum");

    const find = await db
      .collection("user_cred")
      .findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] });
    if (find) {
      throw new Error("이미 존재하는 이름 또는 이메일입니다.");
    }
    const hash = await bcrypt.hash(req.body.password, 263);
    await db.collection("user_cred").insertOne({ ...req.body, password: hash });
    res.status(200).json("회원 가입 성공.");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
}
