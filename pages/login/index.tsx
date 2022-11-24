import { useState, useEffect } from "react";

// The login page captures the user's email and password and will be send to the backend in future sprints

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
      }}
    >
      <div className="flex justify-end">
        <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
          <div>
            <form>
              <div>
                <span className="text-sm text-gray-900">
                  Willkomen Zurück bei{" "}
                  <span className="font-bold">mimical</span>
                </span>
                <h1 className="text-2xl text-black font-bold">
                  Bitte melde dich an
                </h1>
              </div>
              <div className="my-3">
                <label
                  className="block text-md text-black mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="px-4 w-full border-2 py-2 text-black rounded-md text-sm outline-none"
                  type="email"
                  name="password"
                  placeholder="Email"
                />
              </div>
              <div className="mt-5">
                <label
                  className="block text-md text-black mb-2"
                  htmlFor="password"
                >
                  Passwort
                </label>
                <input
                  className="px-4 w-full border-2 text-black py-2 rounded-md text-sm outline-none"
                  type="password"
                  name="password"
                  placeholder="Passwort"
                />
              </div>
              <div className="">
                <button className="mt-4 mb-3 w-full bg-white hover:bg-gray-200 text-black font-light border-solid border-2 border-black py-2 rounded-md transition duration-100">
                  Einloggen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
