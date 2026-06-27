import EbookDetails from "@/components/EbookDetails";

async function getEbook(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/ebooks/${id}`,
    { cache: "no-store"
     }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function Page({ params }) {
  // ✅ FIX HERE (IMPORTANT)
  const { id } = await params;

  const ebook = await getEbook(id);

  if (!ebook) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">📕 Ebook Not Found</h1>
      </div>
    );
  }

  return <EbookDetails ebook={ebook} />;
}
