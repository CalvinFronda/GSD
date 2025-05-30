import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import NavBar from "@/components/layout/Navbar";

const HomePage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen flex flex-col ">
      <NavBar />
      <main className="flex-1  flex flex-col px-15">
        <section className="hero-section">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to GSD</h1>
            <p className="mt-4 text-muted-foreground">
              Get started by managing your tasks effectively.
            </p>
          </div>
        </section>

        <section className="flex flex-row justify-between px-10 py-20">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Accountability</CardTitle>
              <CardDescription>Keep yourself accountable</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Organize</CardTitle>
              <CardDescription>Keep yourself organized</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Getting shit done</CardTitle>
              <CardDescription>Keep yourself accountable</CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © {currentYear} GSD. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
