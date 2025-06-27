"use client"

import { useState } from "react"
import { Lock, Menu, X, Plus, Minus, CreditCard, Users, Clock, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", accountNumber: "****-****-****-1234", accessTime: "Always" },
  { id: 2, name: "Jane Smith", accountNumber: "****-****-****-5678", accessTime: "Always" },
  { id: 3, name: "Mike Johnson", accountNumber: "****-****-****-9012", accessTime: "Always" },
]

const mockAccessLogs = [
  { id: 1, name: "John Doe", date: "2024-01-15", timeRange: "09:00 - 17:00" },
  { id: 2, name: "Jane Smith", date: "2024-01-15", timeRange: "10:30 - 16:30" },
  { id: 3, name: "Mike Johnson", date: "2024-01-14", timeRange: "08:00 - 18:00" },
]

type View = "home" | "dashboard" | "users" | "access-duration" | "statements" | "pin-change"

export default function SafeAccessDashboard() {
  const [currentView, setCurrentView] = useState<View>("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [hasPendingPermissions, setHasPendingPermissions] = useState(true)
  const [users, setUsers] = useState(mockUsers)

  // Simulate fingerprint alert
  const triggerFingerprintAlert = () => {
    setHasPendingPermissions(true)
    setShowPermissionModal(true)
  }

  const handlePermissionResponse = (approved: boolean) => {
    console.log(`Permission ${approved ? "granted" : "denied"}`)
    setShowPermissionModal(false)
    setHasPendingPermissions(false)

    // Simulate no pending permissions after 3 seconds
    setTimeout(() => {
      setShowPermissionModal(true)
    }, 3000)
  }

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,
      accountNumber: `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`,
      accessTime: "Always",
    }
    setUsers([...users, newUser])
  }

  const removeUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Lock className="h-8 w-8 text-red-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">SAFEACCESS</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <button
                  onClick={() => setCurrentView("home")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentView === "home" ? "text-red-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Home
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Discover
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Digital Banking
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Loans
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Lock className="h-5 w-5 text-gray-400" />
            <Button onClick={() => setCurrentView("dashboard")} className="bg-red-600 hover:bg-red-700 text-white">
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className="text-lg font-semibold">Dashboard</span>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <button
            onClick={() => setCurrentView("statements")}
            className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${
              currentView === "statements" ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Statement
          </button>
          <button
            onClick={() => setCurrentView("access-duration")}
            className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${
              currentView === "access-duration" ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Clock className="h-5 w-5 mr-3" />
            Card Access Duration
          </button>
          <button
            onClick={() => setCurrentView("pin-change")}
            className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${
              currentView === "pin-change" ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            PIN Change
          </button>
          <button
            onClick={() => setCurrentView("users")}
            className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${
              currentView === "users" ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="h-5 w-5 mr-3" />
            Registered Card User
          </button>
        </div>
      </nav>
    </div>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">WELCOME LOREM!</h1>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">🏦</div>
                  <div className="text-sm">BANK</div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">Secure access management for your banking needs</p>
              <Button
                onClick={() => setCurrentView("dashboard")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Access Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const DashboardMain = () => (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <Button onClick={triggerFingerprintAlert} className="bg-red-600 hover:bg-red-700 text-white">
              Simulate Alert
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-2" />
                  Card Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-sm opacity-75">Card Number</p>
                      <p className="text-xl font-mono">**** **** **** 1234</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-75">Valid Thru</p>
                      <p className="text-lg">12/26</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Cardholder Name</p>
                    <p className="text-lg font-semibold">LOREM IPSUM</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">Active</p>
                    <p className="text-sm text-gray-600">Card Status</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                    <p className="text-sm text-gray-600">Registered Users</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">24/7</p>
                    <p className="text-sm text-gray-600">Access Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )

  const RegisteredUsersView = () => (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Registered Card Users</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Access Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {user.accountNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{user.accessTime}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Button
                            onClick={() => removeUser(user.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-center space-x-4">
            <Button onClick={addUser} className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </main>
      </div>
    </div>
  )

  const AccessDurationView = () => (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Card Access Duration</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Range
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockAccessLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timeRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4">
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Permission Request
            </Badge>
          </div>
        </main>
      </div>
    </div>
  )

  const PermissionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {hasPendingPermissions ? "Invalid Fingerprint Alert" : "NO PENDING PERMISSIONS!"}
          </h2>
          {hasPendingPermissions && <p className="text-gray-600 mb-6">Is this you?</p>}
          <div className="flex justify-center space-x-4">
            {hasPendingPermissions ? (
              <>
                <Button
                  onClick={() => handlePermissionResponse(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  YES
                </Button>
                <Button
                  onClick={() => handlePermissionResponse(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                >
                  NO
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setShowPermissionModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8"
              >
                OK
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage />
      case "dashboard":
        return <DashboardMain />
      case "users":
        return <RegisteredUsersView />
      case "access-duration":
        return <AccessDurationView />
      case "statements":
      case "pin-change":
        return <DashboardMain />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
      {showPermissionModal && <PermissionModal />}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
