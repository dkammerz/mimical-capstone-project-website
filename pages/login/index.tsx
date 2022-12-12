import axios from "axios";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import { CodeAction } from "typescript";

// The login page captures the user's email and password and will be send to the backend in future sprints

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    axios({
      method: "POST",
      data: {
        username: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:3000/api/login",
    }).then((res) => {
      if (res.data === false) {
        refreshPage();
        router.push("/");
      }

      if (res.data === true) {
        setError(true);
      }
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/authenticate").then((res) => {
      if (res.data === true) {
        router.push("/");
      }
    });
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
      }}
    >
      <div className="flex justify-end scss-syntax">
        <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
          <div>
            <form>
              <div>
                <span className="text-sm">
                  Willkomen Zurück bei{" "}
                  <span className="font-bold">mimical</span>
                </span>
                <h1 className="text-2xl font-bold">Bitte melde dich an</h1>
              </div>
              <div className="my-3">
                <label
                  className="block font-light text-md mb-2"
                  htmlFor="email"
                >
                  E-Mail
                </label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mt-5">
                <label
                  className="block font-light text-md mb-2"
                  htmlFor="password"
                >
                  Passwort
                </label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="password"
                  name="password"
                  placeholder="Passwort"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </form>
            <div className="">
              <button
                type="submit"
                onClick={handleLogin}
                className="mt-4 mb-3 w-full bg-white hover:bg-gray-200 font-light border-solid border-2 border-black py-2 rounded-md transition duration-100"
              >
                Einloggen
              </button>
              <div
                className={`${
                  !error ? "hidden" : ""
                } font-light text-xs text-red-500 text-center`}
              >
                Email oder Passwort ist falsch
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
