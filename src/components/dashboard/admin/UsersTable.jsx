"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/TableSkeleton";

export default function UsersTable() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

const loadUsers = async () => {
try {
const res = await fetch(
`${process.env.NEXT_PUBLIC_URL}/api/admin/users`
);


  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  const data = await res.json();
  setUsers(data || []);
} catch (err) {
  console.log(err);
} finally {
  setLoading(false);
}


};

useEffect(() => {
loadUsers();
}, []);

const handleRoleChange = async (id, role) => {
try {
const res = await fetch(
`${process.env.NEXT_PUBLIC_URL}/api/admin/users/${id}/role`,
{
method: "PATCH",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ role }),
}
);


  if (!res.ok) {
    toast.error("Role update failed");
    return;
  }

  setUsers((prev) =>
    prev.map((user) =>
      user._id === id ? { ...user, role } : user
    )
  );
  toast.success("Role updated successfully");
} catch (err) {
  console.log(err);
  toast.error("Something went wrong");
}


};

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Delete this user?"
);


if (!confirmDelete) return;

try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/users/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    toast.error("Delete failed");
    return;
  }

  setUsers((prev) =>
    prev.filter((user) => user._id !== id)
  );
    toast.success("User deleted successfully");
} catch (err) {
  console.log(err);
  toast.error("Something went wrong");
}


};



if (loading) {
  return <TableSkeleton rows={6} />;
}

return (
  <>
    {/* Desktop Table */}
    <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {user.name || "N/A"}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : user.role === "writer"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="user">User</option>
                      <option value="writer">Writer</option>
                      <option value="admin">Admin</option>
                    </select>

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Cards */}
    <div className="grid gap-4 lg:hidden">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white rounded-2xl shadow-md p-5"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">
                Name
              </p>
              <h3 className="font-semibold">
                {user.name || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Email
              </p>
              <p className="text-sm break-all">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Role
              </p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : user.role === "writer"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {user.role || "user"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={user.role || "user"}
                onChange={(e) =>
                  handleRoleChange(
                    user._id,
                    e.target.value
                  )
                }
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="user">User</option>
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() =>
                  handleDelete(user._id)
                }
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {users.length === 0 && !loading && (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
        No users found
      </div>
    )}
  </>
);
}
