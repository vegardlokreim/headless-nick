// pages/login.tsx
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/auth/login",
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
    <div className="flex flex-col items-center justify-start h-[92vh] bg-gray-100 pt-20">
      <Image src="/nextlogo.png" alt="logo" width="100" height="100" />
      <div className="flex flex-col bg-white p-6 my-8 border-[1px] border-gray-300">
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div>
            <p>Username</p>
            <input className="outline-none border border-slate-400 px-2 py-1 w-64 text-[24px] rounded-[4px]" type="text" value={username} onChange={handleInputChange(setUsername)} />
          </div>
          <div className="mt-4">
            <p>Password</p>
            <input className="outline-none border border-slate-400 px-2 py-1 w-64 text-[24px] rounded-[4px]" type="password" value={password} onChange={handleInputChange(setPassword)} />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>

            <button className="bg-black text-white mt-4 w-20 px-4 py-2" type="submit">
              Login
            </button>
          </div>
        </form>
        <p className="mt-4">{error && <p>{error}</p>}</p>
      </div>
      <div className="flex flex-col w-[300px] gap-4 ">
        <p>Mistet passordet ditt?</p>
        <Link href="/">Tilbake</Link>
      </div>
    </div>
  );
}