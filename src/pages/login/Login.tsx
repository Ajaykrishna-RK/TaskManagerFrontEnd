
import LoginForm from "../../components/auth/Auth";

function Login() {
  return (
    <div className="min-h-screen container flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
