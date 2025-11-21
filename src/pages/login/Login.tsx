import { useState } from "react";
import InputField from "../../components/common/InputField";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const token = useSelector((store: RootState) => store.auth.token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <InputField
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <div className="mt-4">
            <InputField
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <InputField
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-semibold shadow-md">
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Switch Text */}
        <p className="text-center text-sm mt-4 text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Create Account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
