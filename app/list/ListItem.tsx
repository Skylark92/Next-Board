"use client";

import Link from "next/link";

export default function ListItem({ id, title }: { id: string; title: string }) {
  const deleteHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
    const isConfirm = confirm(`[${title}] 정말로 삭제하시겠습니까?`);

    if (isConfirm) {
      fetch("/api/post/delete/" + id, {
        method: "DELETE",
      }).then((res) => {
        if (res?.status === 200) {
          const target = event.target as HTMLSpanElement;
          const parent = target.parentElement;
          if (!parent) return;
          parent.style.opacity = "0";
          setTimeout(() => {
            parent.remove();
          }, 1000);
        } else {
          alert("삭제하지 못했습니다.");
          console.log(res);
        }
      });
    }
  };

  return (
    <div className="list-item">
      <Link href={`/detail/${id}`}>
        <h4>{title}</h4>
      </Link>
      <Link href={`/edit/${id}`}>✏</Link>
      <span onClick={deleteHandler}>🗑</span>
      <p>1월 1일</p>
    </div>
  );
}
