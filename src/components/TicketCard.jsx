import React from "react";
import { Link } from "react-router-dom";

function statusClasses(status) {
  if (status === "open") return "bg-green-100 text-green-800";
  if (status === "in_progress") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

export default function TicketCard({ ticket, onDelete }) {
  return (
    <article className="bg-white shadow p-4 rounded-lg flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{ticket.title}</h3>
          <p className="text-sm text-slate-500">{ticket.date}</p>
        </div>

        <div
          className={
            "px-3 py-1 rounded-full text-xs font-medium ${statusClasses(ticket.status)}"
          }
        >
          {ticket.status.replace("_", " ")}
        </div>
      </div>

      <p className="text-sm text-slate-600">{ticket.description}</p>

      <div className="flex items-center gap-2 mt-2">
        <Link
          to={`/tickets/edit/${ticket.id}`}
          className="px-3 py-1 border rounded"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(ticket.id)}
          className="px-3 py-1 border rounded text-rose-600"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
