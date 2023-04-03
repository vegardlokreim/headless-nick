// pages/login.tsx
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      Router.push("/orders");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleInputChange(setUsername)} />
        <input type="password" placeholder="Password" value={password} onChange={handleInputChange(setPassword)} />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
