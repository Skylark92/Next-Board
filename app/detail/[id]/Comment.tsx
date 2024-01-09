"use client";

import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

export default function Comment({ post }: { post: string }) {
  const [comment, setComment] = useState("");
  const [list, setList] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`/api/post/${post}/comments`).then((res) => {
      if (res.ok) {
        res.json().then((result) => {
          setList(result);
        });
      }
    });
  }, []);

  const addComment = async () => {
    const body = {
      comment: comment,
      post: post,
    };
    fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        res.json().then((result) => {
          setList(result);
        });
      }
    });
  };

  return (
    <div>
      <div>
        {list.map((comment) => {
          return <p key={comment._id.toString()}>{comment.comment}</p>;
        })}
      </div>
      <input
        type="text"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={addComment}>댓글전송</button>
    </div>
  );
}

interface Comment {
  _id: ObjectId;
  comment: string;
  author: string;
  post: ObjectId;
}
