import { 
    LayoutDashboard,
    FileText,
    Search,
    Users,
    Settings,
    PlusCircle,
    UserCircle ,
    History
} from "lucide-react"

export const adminMenu = [
  { name: "Dashboard", path: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Laporan Hilang", path: "/dashboard/admin/lost-reports", icon: FileText },
  { name: "Buat Laporan Penemuan", path: "/dashboard/admin/found-reports/create", icon: PlusCircle },
  { name: "Laporan Ditemukan", path: "/dashboard/admin/found-reports", icon: Search },
  { name: "Users", path: "/dashboard/admin/users", icon: Users },
]

export const userMenu = [
  { name: "Dashboard", path: "/dashboard/user", icon: LayoutDashboard },
  { name: "Buat Laporan Hilang", path: "/dashboard/user/lost-reports/create", icon: PlusCircle },
  { name: "Laporan Hilang Saya", path: "/dashboard/user/lost-reports", icon: FileText },
  { name: "Laporan Penemuan Admin", path : "/dashboard/user/found-admin", icon: UserCircle },
  { name: "History Barang Ditemukan", path: "/dashboard/user/found-reports", icon: History },
]