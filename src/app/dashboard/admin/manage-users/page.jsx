import UsersTable from "@/components/dashboard/admin/UsersTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Manage Users
        </h1>

        <p className="text-gray-500 mt-2">
          Change user roles and remove users.
        </p>
      </div>

      <UsersTable />
    </div>
  );
}