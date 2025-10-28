import React, {useState, useEffect} from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { validateTicket } from '../utils/validation';

export default function AddEditTicket(){
  const { id } = useParams();
  const editMode = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode) {
      const raw = localStorage.getItem("ticketapp_tickets");
      if (raw) {
        const list = JSON.parse(raw);
        const one = list.find((t) => t.id === id);
        if (one) setForm(one);
        else toast.error("Ticket not found");
      }
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function saveList(list) {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(list));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validateTicket(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      const raw = localStorage.getItem("ticketapp_tickets");
      const list = raw ? JSON.parse(raw) : [];
      if (editMode) {
        const next = list.map((t) => (t.id === id ? { ...form } : t));
        saveList(next);
        toast.success("Ticket updated");
      } else {
        const newTicket = {
          ...form,
          id: uuidv4(),
          date: new Date().toISOString().split("T")[0],
        };
        const next = [newTicket, ...list];
        saveList(next);
        toast.success("Ticket created");
      }
      navigate("/tickets");
    } catch (err) {
      toast.error("Failed to save ticket");
    }
  }

  return (
    <ProtectedRoute>
      <div className="container-1440 mx-auto px-4 py-8">
        <Toaster />
        <h1 className="text-2xl font-semibold">
          {editMode ? "Edit Ticket" : "Create Ticket"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-6 rounded shadow max-w-2xl"
        >
          <label className="block">
            <span className="text-sm">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
            {errors.title && (
              <div className="text-rose-600 text-sm mt-1">{errors.title}</div>
            )}
          </label>
          <label className="block mt-4">
            <span className="text-sm">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
              rows={4}
            ></textarea>
          </label>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <label className="block">
              <span className="text-sm">Status</span>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-3 py-2"
              >
                <option value="open">open</option>
                <option value="in_progress">in_progress</option>
                <option value="closed">closed</option>
              </select>
              {errors.status && (
                <div className="text-rose-600 text-sm mt-1">
                  {errors.status}
                </div>
              )}
            </label>

            <label className="block">
              <span className="text-sm">Priority</span>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="mt-1 block w-full border rounded px-3 py-2"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
