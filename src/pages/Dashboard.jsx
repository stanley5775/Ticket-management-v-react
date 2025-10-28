import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard(){
  // load tickets
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem("ticketapp_tickets");
    if (raw) setTickets(JSON.parse(raw));
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <ProtectedRoute>
      <div className="container-1440 mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-slate-500">Total tickets</h3>
            <div className="text-2xl font-bold">{total}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-slate-500">Open</h3>
            <div className="text-2xl font-bold text-green-600">{open}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-slate-500">Resolved</h3>
            <div className="text-2xl font-bold text-slate-600">{resolved}</div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/tickets"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Manage tickets
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
