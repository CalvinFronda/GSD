const HomePage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 flex flex-col items-center ">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to GSD</h1>
          <p className="mt-4 text-muted-foreground">
            Get started by managing your tasks effectively.
          </p>
        </div>
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
