import { useState } from "react";
import InputField from "../../components/common/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../../apiServices/authService/authService";
import { setAuth } from "../../redux/slice/AuthSlice";
import { useValidation } from "../../hooks/UseValidation";
import ErrorText from "../../components/common/ErrorText";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors, validate } = useValidation<typeof form>();

  const handleSubmit = async () => {
    setSubmitError(null);
    const isValid = validate(form, (data) => {
      const err: Partial<typeof form> = {};
      if (!isLogin) {
        if (!data.name.trim()) err.name = "Full name is required";
        else if (data.name.length < 3)
          err.name = "Name must be at least 3 characters";
      }

      // Email validation
      if (!data.email.trim()) err.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(data.email))
        err.email = "Invalid email format";

      // Password validation
      if (!data.password.trim()) err.password = "Password is required";
      else if (data.password.length < 6)
        err.password = "Password must be at least 6 characters";

      return err;
    });

    if (!isValid) return;

    try {
      let data;

      if (isLogin) {
        data = await authService.login({
          email: form.email,
          password: form.password,
        });
      } else {
        data = await authService.register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }

      dispatch(setAuth({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center   px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h2>

        {/* Submit Error */}
        {submitError && <ErrorText text={submitError} />}

        <div className="space-y-4">
          {/* Name Field */}
          {!isLogin && (
            <>
              <InputField
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <ErrorText text={errors.name} />}
            </>
          )}

          {/* Email */}
          <InputField
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <ErrorText text={errors.email} />}

          {/* Password */}
          <InputField
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <ErrorText text={errors.password} />}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-semibold shadow-md"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle Link */}
        <p className=" text-center text-sm mt-4 text-gray-600">
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
