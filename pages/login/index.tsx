import axios from "axios";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import AppLogo from "../../public/mimical_logo.svg";

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
    }).then(async (res) => {
      if (res.data === false) {
        refreshPage();
        router.push("/");
      }

      if (res.data === true) {
        setError(true);
        await sleep(5000);
        setError(false);
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center scss-syntax">
        <div className="bg- min-h-screen w-1/2 flex justify-center items-center">
          <div>
            <form>
              <div className="flex justify-center pb-10">
                <Image src={AppLogo} alt="AppLogo" />
              </div>
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
                className="mt-4 mb-3 w-full custom-blue text-white font-light border-solid py-2 rounded-md transition duration-100"
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

function refreshPage() {
  window.location.reload();
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
