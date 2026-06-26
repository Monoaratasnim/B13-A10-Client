"use client";

import { useEffect, useState } from "react";

import TopWriterCard from "./TopWriterCard";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWriters = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/top-writers`
        );

        const data = await res.json();

        setWriters(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadWriters();
  }, []);

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-14">

          <span className="text-rose-500 font-semibold uppercase tracking-wider">
            Our Best Authors
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Top Writers
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Meet the writers whose ebooks have been
            loved the most by readers across Fable.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow p-6 animate-pulse"
              >
                <div className="h-20 bg-gray-200 rounded-xl"></div>

                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto -mt-12"></div>

                <div className="h-6 bg-gray-200 rounded mt-6"></div>

                <div className="h-4 bg-gray-200 rounded mt-4"></div>

                <div className="h-10 bg-gray-200 rounded-full mt-6"></div>

                <div className="h-12 bg-gray-200 rounded mt-6"></div>
              </div>
            ))}

          </div>
        )}

        {/* Cards */}

        {!loading && writers.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {writers.map((writer, index) => (
         <TopWriterCard
         key={writer.writerEmail}
         writer={writer}
          index={index}
         />
))}

          </div>

        )}

        {/* Empty */}

        {!loading && writers.length === 0 && (

          <div className="bg-white rounded-2xl border text-center py-14">

            <h3 className="text-xl font-semibold">
              No Top Writers Found
            </h3>

            <p className="text-gray-500 mt-2">
              Writers will appear here after ebook sales are recorded.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}