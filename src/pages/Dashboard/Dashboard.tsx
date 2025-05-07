import Header from "@/components/ui/header";

export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-col w-100 pt-28">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div>Sectiion card </div>
            <div className="px-4 lg:px-6">
              <div>Chart</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
