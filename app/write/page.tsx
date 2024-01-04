import React from "react";

export default function Write() {
  return (
    <div className="p-20">
      <form action="/api/post/new" method="POST">
        <label htmlFor="write_title">제목</label>
        <input
          id="write_title"
          type="text"
          name="title"
          placeholder="글 제목"
        />
        <label htmlFor="write_content">내용</label>
        <input
          id="write_content"
          type="text"
          name="content"
          placeholder="글 내용"
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
