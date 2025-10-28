"use client";

import useSWR from "swr";
import { Suspense } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TodoPage() {
  const { data: todos, error, isLoading } = useSWR("/api/todos", fetcher, {
    refreshInterval: 3000, // re-fetch every 3s
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Suspense fallback={<h1>Loading</h1>}>
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>
              Name: {todo.text}, Status: {todo.done ? "Done" : "In-Progress"}
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}