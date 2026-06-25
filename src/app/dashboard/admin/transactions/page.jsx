import TransactionsTable from "@/components/dashboard/admin/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          All Transactions
        </h1>

        <p className="text-gray-500 mt-2">
          Purchase and publishing fee history.
        </p>
      </div>

      <TransactionsTable />
    </div>
  );
}