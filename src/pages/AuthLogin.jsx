import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { loginUser, ensureTestUser, isAuthenticated } from '../utils/auth';
import { validateAuth } from '../utils/validation';

export default function AuthLogin(){
  const navigate = useNavigate();
  useEffect(() => {
    ensureTestUser();
    if (isAuthenticated()) navigate("/dashboard");
  }, []);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validateAuth(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      loginUser(form);
      toast.success("Logged in");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-xl font-semibold">Login</h2>
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
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

