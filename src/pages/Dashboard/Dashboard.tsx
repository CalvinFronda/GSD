import LogoutButton from "@/components/ui/logoutbutton";

export default function Dashboard() {
  return (
    <div>
      <div className="sidebar">
        <ul>
          <li>Home</li>
          <li>Calendar</li>
          <li>Something</li>
        </ul>
      </div>

      <div>
        <h1>Main </h1>
        <LogoutButton />
      </div>
    </div>
  );
}
