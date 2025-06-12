import { LoginForm } from "../_components/login-form";

const AuthLogin = () => {
  return (
    <div className="flex flex-col gap-2 items-center w-3xl">
      <h3 className="font-primary font-bold text-2xl">
        Join the DEV Community
      </h3>
      <p className="font-secondary text-lg">
        DEV Community is a community of 322317 amazing developer
      </p>
      <LoginForm />
    </div>
  );
};

export default AuthLogin;
