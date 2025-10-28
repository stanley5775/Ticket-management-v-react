import React from 'react';

export default function Hero({children}){
  return (
    <section className="relative bg-linear-to-b from-sky-50 to-white overflow-hidden">
      <div className="container-1440 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">{children}</div>
      </div>

      {/* decorative circles */}
      <div
        className="absolute -left-16 -top-10 w-40 h-40 rounded-full bg-blue-200 opacity-60 blur"
        aria-hidden="true"
      ></div>
      <div
        className="absolute right-6 top-6 w-24 h-24 rounded-full bg-amber-200 opacity-60 blur"
        aria-hidden="true"
      ></div>

      {/* wave SVG at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,32 C360,150 1080,0 1440,96 L1440 150 L0 150 Z"
          fill="#f8fafc"
        />
      </svg>
    </section>
  );
}

