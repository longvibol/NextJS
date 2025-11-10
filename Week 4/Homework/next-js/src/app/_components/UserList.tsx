import { resolve } from "path";
import { db } from "../../../db/drizzle";
import { usersTable } from "../../../db/schema";
import { cacheTag } from "next/cache";

function delay(ms: number){
    return new Promise(resolve => setTimeout(resolve,ms));
}

// get from server
async function getAllUsers() {
  "use server"; // to clearify this is server function
//   await delay(3000)
  return await db.select().from(usersTable);
}

export default async function UserList() {
    "use cache"
    cacheTag("user-list")

  // when it startup we mount from the server
  const users = await getAllUsers();

  return (
    <section>
      {/* {JSON.stringify(users, null, 2)} = display on webpage not recommand*/}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Username: {user.name}, Age: {user.age}, Email: {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}
