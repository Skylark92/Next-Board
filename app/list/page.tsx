import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((post) => {
        const id = post._id.toString();
        return (
          <div className="list-item" key={id}>
            <Link href={`/detail/${id}`}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
