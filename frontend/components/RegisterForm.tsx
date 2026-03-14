"use client";

import { useState, FormEvent, useMemo } from "react";
import authService from "@/services/auth.service";
import { toast } from "react-toastify";

interface RegisterFormProps {
  dict: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    submit: string;
    passwordMismatch: string;
    registerSuccess: string;
    passwordStrength: string;
    strengthLabels: string[];
    reqLength: string;
    reqUpper: string;
    reqNumber: string;
    reqSpecial: string;
  };
}

export default function RegisterForm({ dict }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const requirements = useMemo(
    () => [
      { re: /.{8,}/, label: dict.reqLength },
      { re: /[A-Z]/, label: dict.reqUpper },
      { re: /[0-9]/, label: dict.reqNumber },
      { re: /[^A-Za-z0-9]/, label: dict.reqSpecial },
    ],
    [dict],
  );

  const passwordScore = requirements.filter((req) =>
    req.re.test(password),
  ).length;

  const strengthConfig = [
    { color: "bg-gray-200", width: "w-0", textColor: "text-gray-400" },
    { color: "bg-red-500", width: "w-1/4", textColor: "text-red-500" },
    { color: "bg-orange-500", width: "w-2/4", textColor: "text-orange-500" },
    { color: "bg-yellow-500", width: "w-3/4", textColor: "text-yellow-500" },
    { color: "bg-green-500", width: "w-full", textColor: "text-green-500" },
  ];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passwordScore < 4) {
      return;
    }
    if (password !== confirmPassword) {
      toast.error(dict.passwordMismatch);
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        username,
        email,
        password,
        confirmPassword,
      });
      toast.success(dict.registerSuccess);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          {dict.username}
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-sky-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          {dict.email}
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-sky-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          {dict.password}
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-sky-500"
          />
        </div>
        {/* Jauge Dynamique */}
        <div className="mt-3">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div
              className={`h-full transition-all duration-500 ${strengthConfig[passwordScore].color} ${strengthConfig[passwordScore].width}`}
            />
          </div>
          <p
            className={`mt-1 text-xs font-medium ${strengthConfig[passwordScore].textColor}`}
          >
            {dict.passwordStrength} : {dict.strengthLabels[passwordScore]}
          </p>
        </div>
        {/* Liste des critères traduits */}
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {requirements.map((req, i) => (
            <li
              key={i}
              className={`flex items-center text-xs ${req.re.test(password) ? "text-green-500" : "text-gray-400"}`}
            >
              <span className="mr-2">{req.re.test(password) ? "✔" : "○"}</span>
              {req.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          {dict.confirmPassword}
        </label>
        <div className="mt-2">
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-sky-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-sky-500 dark:shadow-none dark:hover:bg-sky-400 dark:focus-visible:outline-sky-500"
        >
          {loading ? "..." : dict.submit}
        </button>
      </div>
    </form>
  );
}
