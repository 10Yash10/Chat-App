import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
// import { useToast } from "../../hooks/use-toast";
import apiClient from "../../lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

function Auth() {
  // const { toast } = useToast();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateSignup = () => {
    if (!signup.username.length) {
      toast.error("Username Not Found");
      return false;
    }
    if (!signup.email.length) {
      // toast({
      //   title: "Email not found",
      //   description: "Please fill to proceed furthur.",
      // });
      toast.error("Email Not Found");
      return false;
    }
    if (!signup.password.length) {
      toast.error("Password Not Found");
      return false;
    }
    if (signup.confirmPassword !== signup.password) {
      toast.error("Confirm Password does not matches with you Password.");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!login.email.length) {
      toast.error("Email Not Found");
      return false;
    }
    if (!login.password.length) {
      toast.error("Password Not Found");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const { email, password } = login;
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.user.id) {
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
    }
  };

  const handleSignup = async () => {
    const { email, username, password } = signup;
    if (validateSignup()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        navigate("/profile");
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-[70%] h-[80%] bg-zinc-900 flex items-center justify-center rounded-lg p-4">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800 ">
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white "
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="data-[state=active]:bg-zinc-950 data-[state=active]:text-white"
              >
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="bg-zinc-950 text-white">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Fill up your login credentials to start chatting or signup
                    to create new account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="@peduarte"
                      onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="password"
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-wrap">
                  <Button
                    className="bg-white text-zinc-800 hover:bg-zinc-300"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <h1>or</h1>
                  <a href="" className="underline">
                    Forget Password?
                  </a>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="bg-zinc-950 text-white">
                <CardHeader>
                  <CardTitle>Signup</CardTitle>
                  <CardDescription>
                    Enter your details to create a new account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username-signup">Username</Label>
                    <Input
                      id="username-signup"
                      type="text"
                      placeholder="Pedro Duarte"
                      onChange={(e) =>
                        setSignup({ ...signup, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="text"
                      placeholder="@peduarte"
                      onChange={(e) =>
                        setSignup({ ...signup, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="password"
                      onChange={(e) =>
                        setSignup({ ...signup, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password-signup">
                      confirm password
                    </Label>
                    <Input
                      id="confirm-password-signup"
                      type="password"
                      placeholder="confirm password"
                      onChange={(e) =>
                        setSignup({
                          ...signup,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-white text-zinc-800 hover:bg-zinc-300"
                    onClick={handleSignup}
                  >
                    Signup
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Auth;
