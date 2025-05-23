import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/authContext";

// TODO: just the design, this page doesn't do anything.
const Account = () => {
  const { user, userData } = useAuth();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue={userData?.firstName} />
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={userData?.lastName} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">email</Label>
              <Input id="email" defaultValue={user?.email ?? ""} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input id="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Update Account</Button>
      </CardFooter>
    </Card>
  );
};

export default Account;
