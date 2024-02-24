import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, isPending } = useLogin();

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    /* Login form with input fields for email, password, display name, and profile thumbnail */
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* Heading for the Login section */}
      <h2>Login</h2>

      {/* Input field for email */}
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      {/* Input field for password */}
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {/* Login button enabled if not pending*/}
      {!isPending && <button className="btn">Login</button>}
      {/* Login button disabled if pending*/}
      {isPending && (
        <button className="btn" disabled>
          Logging in...
        </button>
      )}

      {/* Show error message if there is an error */}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
