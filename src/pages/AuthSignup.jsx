import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser, loginUser } from '../utils/auth';
import { validateAuth } from '../utils/validation';

export default function AuthSignup(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validateAuth({ email: form.email, password: form.password });
    if (form.password !== form.confirm) v.confirm = "Passwords do not match";
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      registerUser({ email: form.email, password: form.password });
      loginUser({ email: form.email, password: form.password });
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-xl font-semibold">Sign up</h2>
        <label className="block mt-4">
          <span className="text-sm">Email</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <div className="text-rose-600 text-sm mt-1">{errors.email}</div>
          )}
        </label>
        <label className="block mt-4">
          <span className="text-sm">Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <div className="text-rose-600 text-sm mt-1">{errors.password}</div>
          )}
        </label>
        <label className="block mt-4">
          <span className="text-sm">Confirm Password</span>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.confirm && (
            <div className="text-rose-600 text-sm mt-1">{errors.confirm}</div>
          )}
        </label>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
