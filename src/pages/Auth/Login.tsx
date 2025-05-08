import { LoginForm } from "@/pages/Auth/children/login-form";

const Login = () => {
  return (
    <div className="flex min-h-[calc(100svh-56px)] w-full items-center justify-center pt-0 pr-6 pb-6 pl-6 ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
