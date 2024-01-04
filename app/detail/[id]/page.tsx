import { PageProps } from "@/.next/types/app/layout";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props: PageProps) {
  const db = (await connectDB).db("forum");
  const { id } = props.params;
  const result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  if (result)
    return (
      <div>
        <h4>상세페이지임</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
      </div>
    );
  else {
    <div>
      <h4>페이지를 찾을 수 없습니다.</h4>
    </div>;
  }
}
