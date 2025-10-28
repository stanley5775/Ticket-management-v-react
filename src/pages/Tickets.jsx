import React, {useEffect, useState} from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import TicketCard from '../components/TicketCard';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { validateTicket } from '../utils/validation';
import { Link } from 'react-router-dom';

export default function Tickets(){
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ticketapp_tickets");
      if (!raw) {
        // initialize from initial tickets
        const init = require("../data/initialTickets").default;
        localStorage.setItem("ticketapp_tickets", JSON.stringify(init));
        setTickets(init);
      } else {
        setTickets(JSON.parse(raw));
      }
    } catch (e) {
      toast.error("Failed to load tickets. Please retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  function saveList(list) {
    setTickets(list);
    localStorage.setItem("ticketapp_tickets", JSON.stringify(list));
  }

  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    const next = tickets.filter((t) => t.id !== id);
    saveList(next);
    toast.success("Ticket deleted");
  }

  return (
    <ProtectedRoute>
      <div className="container-1440 mx-auto px-4 py-8">
        <Toaster />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tickets</h1>
          <div>
            <Link
              to="/tickets/new"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Create Ticket
            </Link>
          </div>
        </div>
        {loading ? (
          <p className="mt-6">Loading...</p>
        ) : (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {tickets.length === 0 && (
              <div className="bg-white p-6 rounded shadow">No tickets yet</div>
            )}
            {tickets.map((t) => (
              <TicketCard key={t.id} ticket={t} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
