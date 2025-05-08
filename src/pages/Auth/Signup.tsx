import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Signup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center  pt-0 pr-6 pb-6 pl-6 ">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle> Create an account</CardTitle>
              <CardDescription>
                Fill in the details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        type="text"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Signup
                    </Button>
                    <Button variant="outline" className="w-full">
                      Sign up with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Have an account?
                  <a href="/login" className="underline underline-offset-4">
                    Login
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
