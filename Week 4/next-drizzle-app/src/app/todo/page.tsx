import { db } from "@/app/db/drizzle"
import { todo } from "@/app/db/schema"
import { cacheLife } from "next/cache";
import { Suspense } from "react";


async function getTodos() {
    "use cache"
    cacheLife("minutes")
    return db.select().from(todo)
}

export default async function TodoPage(){

    const todos = await getTodos();

    return <div>
        <Suspense fallback={<h1>Loading</h1>}>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.id}> Name : {todo.text}, Status : {todo.done ? "Done" : "In-Progress"}</li>
                    ))
                }
            </ul>
        </Suspense>
    </div>
}