"use client"
import { login } from "@/actions/auth";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface ProviderProps {}
export default function SignInPage() {
  const onSubmit = async (provider: "github" | "google") => {
    await login(provider);
  };
  return (
    <div className="w-full flex items-center justify-center h-[80vh]">
      <Card className="w-[400px] flex flex-col">
        <CardHeader className="pb-5">
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription className="text-xs">
            Choose a provider to login or create account
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form className="space-y-2">
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() => onSubmit("github")}
              type="submit"
            >
              <FaGithub className="h-6 w-6 mr-2" />
              Login with Github
            </Button>
            <Button className="w-full" variant={"outline"}>
              <FcGoogle className="h-6 w-6 mr-2" />
              Login with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
