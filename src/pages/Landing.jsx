import React from "react";
import Hero from "../components/Hore";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero>
        <h1 className="text-3xl md:text-5xl font-bold">
          TicketApp — Manage issues effortlessly
        </h1>
        <p className="mt-4 text-slate-600">
          Create, track, and resolve tickets with an intuitive interface. Built
          responsively and accessibly.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/auth/login"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg"
          >
            Login
          </Link>
          <Link to="/auth/signup" className="px-5 py-3 border rounded-lg">
            Get Started
          </Link>
        </div>
      </Hero>
      <section className="container-1440 mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold">Create Tickets</h3>
            <p className="text-sm text-slate-600 mt-2">
              Add issues quickly with validation and priority levels.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold">Track Status</h3>
            <p className="text-sm text-slate-600 mt-2">
              Open, In Progress, and Closed statuses with visual badges.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold">Secure Access</h3>
            <p className="text-sm text-slate-600 mt-2">
              Protect pages using session tokens stored locally.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
