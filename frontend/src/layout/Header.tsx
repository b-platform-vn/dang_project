// src/layouts/Header.tsx
import { useLocation } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Bell, ChevronDown } from "lucide-react"

export default function Header({ role }: { role: number }) {
  switch (role) {
    case 1:
      return <HomeHeader />;
    case 2:
      return <AdminHeader />;
    default:
      return null;
  }
}

function AdminHeader() {
  const location = useLocation();
  const isAddCustomerPage = location.pathname.includes('/add');

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-6 flex-1">
        <SidebarTrigger className="-ml-2 text-gray-600 hover:text-black" />
        
        {isAddCustomerPage && (
          <div className="relative w-full max-w-[360px] hidden sm:flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search" 
              className="w-full h-10 pl-11 pr-4 rounded-full bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-gray-200 text-sm shadow-none text-gray-600"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-6 md:gap-8">
        {isAddCustomerPage && (
          <>
            <button className="relative flex items-center justify-center transition-transform hover:scale-105">
              <Bell className="h-[22px] w-[22px] text-blue-500 fill-blue-500" />
              <span className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                6
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="https://flagcdn.com/w40/gb.png" 
                alt="English Flag" 
                className="h-3.5 w-5 rounded-sm object-cover"
              />
              <span className="text-sm font-medium text-gray-600">English</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </>
        )}

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-gray-800 leading-tight">
               Dang Nguyen
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Quản trị viên
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
        </div>

      </div>
    </header>
  );
}

function HomeHeader() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow z-50 h-16 flex items-center px-6">
      <h1 className="font-bold text-blue-600">Trang Home</h1>
    </header>
  );
}