import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((post) => {
        const id = post._id.toString();
        return <ListItem id={id} title={post.title} key={id} />;
      })}
    </div>
  );
}
