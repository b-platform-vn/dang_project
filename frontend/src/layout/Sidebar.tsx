import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader 
} from "@/components/ui/sidebar"
import { ListChecks } from "lucide-react"
import { useLocation } from "react-router-dom"

export function AppSidebar() {
  const location = useLocation()
  const isActive = location.pathname.startsWith("/customerslist")
  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex justify-center px-6">
        <h1 className="text-2xl font-bold text-blue-500 text-center">
          Dash<span className="text-gray-800">Stack</span>
        </h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive}
                  className={isActive ? "!bg-red-500 !text-white hover:!bg-red-600 px-4 py-3" : "px-4 py-3"}
                >
                  <ListChecks className="h-4 w-4" />
                  <span className="font-medium text-base">Thông Tin Khách Hàng</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}