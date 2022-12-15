import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({ email: "", password: "", error: null, loading: false });
      navigate("/", { replace: true });

        console.log(auth)
    } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }
  };
  return (
    <section>
      <h3>Login</h3>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="Email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="Password">Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Logging In..." : "Login"}
        </button>
        <p style={{textAlign : 'center'}}>Don't have an account. <Link to={'/register'}>Register here</Link></p>
      </form>
    </section>
  );
}

export default Login;
