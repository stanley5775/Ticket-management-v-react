export function validateTicket({ title, status }) {
  const errors = {};
  if (!title || title.trim().length === 0) errors.title = "Title is required.";
  else if (title.trim().length < 3)
    errors.title = "Title must be at least 3 characters.";

  const allowed = ["open", "in_progress", "closed"];
  if (!status || !allowed.includes(status))
    (errors.status = "Status must be one of: ${allowed.join("), ")}";

  return errors;
}

export function validateAuth({ email, password }) {
  const errors = {};
  if (!email || !/\S+@\S+\.\S+/.test(email))
    errors.email = "Valid email required.";
  if (!password || password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  return errors;
}
