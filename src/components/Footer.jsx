import React from "react";
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container-1440 mx-auto px-4 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} TicketApp — Built for Stage 2 Task •
        Accessible & Responsive
      </div>
    </footer>
  );
}
