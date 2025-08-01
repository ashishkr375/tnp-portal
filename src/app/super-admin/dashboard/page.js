'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { 
  Users, 
  Building2, 
  ClipboardCheck, 
  FileText,
  GraduationCap,
  UserCog,
  Settings,
  History,
  FileCheck,
  Shield,
  Database,
  BarChart
} from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useState, useEffect } from "react"

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalAdmins: 0,
    pendingVerifications: 0
  })

  const breadcrumbItems = [
    { label: "Super Admin", href: "/super-admin/dashboard" },
    { label: "Dashboard", href: "/super-admin/dashboard" }
  ]

  const dashboardItems = [
    // {
    //   title: "Profile",
    //   description: "View and update your super admin profile",
    //   icon: <Shield className="h-6 w-6 text-primary" />,
    //   href: "/super-admin/profile",
    //   color: "bg-primary/10"
    // },
    {
      title: "Verifications",
      description: "Handle all verification requests",
      icon: <ClipboardCheck className="h-6 w-6 text-orange-500" />,
      href: "/super-admin/verifications",
      color: "bg-orange-500/10"
    },
    {
      title: "JAF Management",
      description: "Review and manage all job announcements",
      icon: <FileText className="h-6 w-6 text-yellow-500" />,
      href: "/super-admin/jaf",
      color: "bg-yellow-500/10"
    },
    {
      title: "Students",
      description: "Manage all student accounts and data",
      icon: <GraduationCap className="h-6 w-6 text-indigo-500" />,
      href: "/super-admin/students",
      color: "bg-indigo-500/10"
    },
    {
      title: "Companies",
      description: "Oversee company registrations and profiles",
      icon: <Building2 className="h-6 w-6 text-blue-500" />,
      href: "/super-admin/companies",
      color: "bg-blue-500/10"
    },
   
    
    {
      title: "Applications",
      description: "Monitor all student applications",
      icon: <FileCheck className="h-6 w-6 text-purple-500" />,
      href: "/super-admin/applications",
      color: "bg-purple-500/10"
    },
    {
      title: "Admin Management",
      description: "Manage admin accounts and permissions",
      icon: <UserCog className="h-6 w-6 text-green-500" />,
      href: "/super-admin/admins",
      color: "bg-green-500/10"
    },
   
    {
      title: "Activity Logs",
      description: "View all system activities and audits",
      icon: <History className="h-6 w-6 text-rose-500" />,
      href: "/super-admin/activity-logs",
      color: "bg-rose-500/10"
    },
    {
      title: "System Settings",
      description: "Configure global system settings",
      icon: <Settings className="h-6 w-6 text-gray-500" />,
      href: "/super-admin/settings",
      color: "bg-gray-500/10"
    },
    // {
    //   title: "Database",
    //   description: "Manage database and backups",
    //   icon: <Database className="h-6 w-6 text-cyan-500" />,
    //   href: "/super-admin/database",
    //   color: "bg-cyan-500/10"
    // },
    // {
    //   title: "Analytics",
    //   description: "View placement statistics and reports",
    //   icon: <BarChart className="h-6 w-6 text-emerald-500" />,
    //   href: "/super-admin/analytics",
    //   color: "bg-emerald-500/10"
    // }
  ]

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
      <div className="p-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid gap-6 pt-2">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Companies</p>
                  <h3 className="text-2xl font-bold">{stats.totalCompanies}</h3>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/10 p-3 rounded-full">
                  <ClipboardCheck className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Verifications</p>
                  <h3 className="text-2xl font-bold">{stats.pendingVerifications}</h3>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            {dashboardItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Card className="h-full p-6 hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex flex-col gap-4">
                    <div className={`${item.color} p-3 rounded-full w-fit`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 