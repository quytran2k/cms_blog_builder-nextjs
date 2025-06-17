import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions, cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "../_components/login-form";

const AuthLogin = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-2 items-center w-3xl">
      <h3 className="font-primary font-bold text-2xl">
        Join the DEV Community
      </h3>
      <p className="font-secondary text-lg">
        DEV Community is a community of 322317 amazing developer
      </p>
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
