import { User } from "@/utils/types";

async function getUsers() {
  const Response = await fetch("http://localhost:5000/users", {
    cache: "no-cache",
  });
  if (!Response.ok) {
    throw new Error("Error");
  }

  return Response.json();
}

export default async function Users() {
  const Users: User[] = await getUsers();
  return (
    <div>
      {Users.map((user) => (
        <p key={user.user_id}>Usuário: {user.first_name}</p>
      ))}
    </div>
  );
}
