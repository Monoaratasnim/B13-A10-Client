"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Discover & Read Original Ebooks",
    desc: "Explore thousands of digital stories from creators around the world.",
    image: "/images/hero3.jpg",
  },
  {
    title: "Become a Published Writer",
    desc: "Publish your ebooks and reach global readers instantly.",
    image: "/images/hero2.jpg",
  },
  {
    title: "Read Anytime, Anywhere",
    desc: "Enjoy seamless reading experience across all your devices.",
    image: "/images/hero4.jpg",
  },
];

export default function HeroSwiper() {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
       className="h-[60vh] sm:h-[70vh] lg:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              {/* Background */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center lg:justify-start h-full px-4 sm:px-8 lg:px-16">

                <div className="max-w-2xl text-center lg:text-left text-white">

                  {/* Tagline */}
                  <p className="text-rose-400 uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                    Discover • Read • Publish
                  </p>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    {slide.desc}
                  </p>

                  {/* Buttons */}
                  <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">

                    <Link
                      href="/ebooks"
                      className="px-6 sm:px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-semibold text-center transition"
                    >
                      Browse Ebooks
                    </Link>

                    <Link
                      href="/register"
                      className="px-6 sm:px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl font-semibold text-center transition"
                    >
                      Become a Writer
                    </Link>

                  </div>

                  {/* Stats (compact on mobile) */}
                  <div className="mt-6 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-10">

                    <div className="text-center lg:text-left">
                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                        10K+
                      </h3>
                      <p className="text-gray-300 text-[10px] sm:text-sm">
                        Ebooks
                      </p>
                    </div>

                    <div className="text-center lg:text-left">
                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                        5K+
                      </h3>
                      <p className="text-gray-300 text-[10px] sm:text-sm">
                        Authors
                      </p>
                    </div>

                    <div className="text-center lg:text-left">
                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                        50K+
                      </h3>
                      <p className="text-gray-300 text-[10px] sm:text-sm">
                        Readers
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 14px !important;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.35;
        }

        .swiper-pagination-bullet-active {
          background: #e11d48;
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}