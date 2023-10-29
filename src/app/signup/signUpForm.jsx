"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

export function SignUpForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/api/signup", user);
      event.target.reset();
      console.log("Signup success", response.data);
    } catch (error) {
      console.log("Signup failed", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function onSubmit(event) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSignup}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              required
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              UserName
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
          </div>
          <Button disabled={buttonDisabled ? true : false}>
            {isLoading && (
              <CircularProgress color="inherit"  />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button> */}
    </div>
  );
}
