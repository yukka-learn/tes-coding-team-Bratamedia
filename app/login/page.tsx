import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoginForm />
      <div className="w-1/2">
        {/* kasih info ini email dan passowrd */}
        <p className="text-center text-sm text-gray-400 mt-2">
          Email: <span className="text-gray-800">admin@example.com</span>
        </p>
        <p className="text-center text-sm text-gray-400">
          Password: <span className="text-gray-800">admin</span>
        </p>
      </div>
    </div>
  );
}
