import AuthForm from "../../components/auth-form";

export default function Login() {
  return (
    <div className="min-h-full mx-auto max-w-2xl py-28 sm:py-28 lg:py-32">
      <div className="text-center">
        <h1 className="text-3xl">Login</h1>
      </div>
      <div className="">
        <AuthForm />
      </div>
    </div>
  );
}
