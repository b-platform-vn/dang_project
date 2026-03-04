import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar"; 
import Header from "./Header";

export default function MainLayout({ role }: { role: number }) {
  if (role === 1) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header role={role} />
        <main className="flex-1 w-full pt-20 px-6">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header role={role} />
          
          <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}