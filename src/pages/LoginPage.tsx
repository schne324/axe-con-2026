import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import TextInput from "../components/shared/TextInput";

function safeRedirectTarget(raw: string | null): string {
  if (!raw) return "/";
  // Only allow internal paths; reject protocol-relative URLs (//evil.com)
  // and absolute URLs to prevent open-redirect.
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please enter an email and password.");
      return;
    }

    login(trimmedEmail);
    const target = safeRedirectTarget(searchParams.get("redirect_uri"));
    navigate(target, { replace: true });
  }

  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a2e4a]/20 to-transparent px-8 pt-8 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to manage your trips and rewards.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 pb-8 mt-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="login-email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <TextInput
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <TextInput
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#1a2e4a] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#243d60] transition-colors mt-2"
          >
            Sign in
          </button>

          <p className="text-sm text-gray-500 text-center">
            New to CJ Railway?{" "}
            <Link to="/" className="text-[#1a2e4a] font-medium underline">
              Browse trips
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
