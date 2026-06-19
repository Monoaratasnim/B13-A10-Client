"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Discover & Read Original Ebooks",
    desc: "Explore thousands of digital stories from creators around the world.",
  },
  {
    title: "Become a Published Writer",
    desc: "Publish your ebooks and reach global readers instantly.",
  },
  {
    title: "Read Anytime, Anywhere",
    desc: "Enjoy seamless reading experience across all your devices.",
  },
];

export default function HeroSwiper() {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden">

      {/* background blur shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          className="w-full h-[420px] md:h-[500px]"
        >

          {slides.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">

                <h1 className="text-3xl md:text-5xl font-bold text-stone-800 leading-tight max-w-3xl">
                  {item.title}
                </h1>

                <p className="text-stone-600 text-base md:text-lg max-w-2xl">
                  {item.desc}
                </p>

                <div className="flex gap-4 mt-4">
                  <Link
                    href="/ebooks"
                    className="px-8 py-3 bg-rose-500 text-white rounded-xl font-semibold shadow-md hover:bg-rose-600 transition"
                  >
                    Browse Ebooks
                  </Link>

                  <Link
                    href="/register"
                    className="px-8 py-3 border border-rose-300 text-rose-600 rounded-xl hover:bg-rose-50 transition"
                  >
                    Become a Writer
                  </Link>
                </div>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </section>
  );
}