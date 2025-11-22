import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField";
import ErrorText from "../../components/common/ErrorText";
import ButtonLayout from "../../components/common/ButtonLayout";
import { useValidation } from "../../hooks/UseValidation";
import { authService } from "../../services/authService/authService";
import { setAuth } from "../../redux/slice/AuthSlice";


export default function LoginForm() {
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

      if (!data.email.trim()) err.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(data.email))
        err.email = "Invalid email format";

      if (!data.password.trim()) err.password = "Password is required";
      else if (data.password.length < 4)
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
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
      </h2>

      {submitError && <ErrorText text={submitError} />}

      <div className="space-y-4">
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

        <InputField
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <ErrorText text={errors.email} />}

        <InputField
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <ErrorText text={errors.password} />}
      </div>

      <ButtonLayout className="w-full mt-4" onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </ButtonLayout>

      <p className="text-center text-sm mt-4 text-gray-600">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          {isLogin ? "Create Account" : "Login"}
        </span>
      </p>
    </>
  );
}
