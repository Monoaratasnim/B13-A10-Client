import EbooksTable from "@/components/dashboard/admin/EbooksTable";

export default function ManageEbooksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Manage All Ebooks
        </h1>

        <p className="text-gray-500 mt-2">
          Publish, unpublish and delete ebooks.
        </p>
      </div>

      <EbooksTable />
    </div>
  );
}