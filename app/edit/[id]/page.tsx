import { PageProps } from "@/.next/types/app/layout";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props: PageProps) {
  const db = (await connectDB).db("forum");
  const { id } = props.params;
  const result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  return (
    <div className="p-20">
      <h4>수정 페이지</h4>
      <form action={`/api/post/edit/${id}`} method="POST">
        <input type="hidden" name="id" value={id} />
        <label htmlFor="edit_title">제목</label>
        <input
          id="edit_title"
          type="text"
          name="title"
          placeholder="글 제목"
          defaultValue={result?.title}
        />
        <label htmlFor="edit_content">내용</label>
        <input
          id="edit_content"
          type="text"
          name="content"
          placeholder="글 내용"
          defaultValue={result?.content}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
