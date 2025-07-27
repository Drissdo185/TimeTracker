import Image from "next/image";

export default function Home() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
    {/* Header */}
    <div className="p-6 border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex 
  items-center justify-center">
          <span className="text-white font-bold">W</span>
        </div>
        <h1 className="text-xl font-semibold">Treki</h1>
      </div>
    </div>

    

    {/* Menu Section */}
    <div className="flex-1 p-4">
      <div className="mb-6">
        <h3 className="text-gray-400 text-sm font-medium 
  mb-3">Menu</h3>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-purple-600 bg-purple-50 rounded-lg">
            <span>📊</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>💡</span>
            <span>Insights</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>🔄</span>
            <span>Updates</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>💬</span>
            <span>Message</span>
            <span className="ml-auto bg-gray-200 text-xs px-2 py-1 
  rounded-full">20</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>👥</span>
            <span>Customers</span>
          </a>
        </nav>
      </div>

      {/* Features Section */}
      <div className="mb-6">
        <h3 className="text-gray-400 text-sm font-medium 
  mb-3">FEATURES</h3>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>🔁</span>
            <span>Recurring</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>📋</span>
            <span>Subscriptions</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>💭</span>
            <span>Feedback</span>
          </a>
        </nav>
      </div>

      {/* General Section */}
      <div>
        <h3 className="text-gray-400 text-sm font-medium 
  mb-3">GENERAL</h3>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-gray-600 hover:bg-gray-50 rounded-lg">
            <span>❓</span>
            <span>Help Desk</span>
          </a>
        </nav>
      </div>
    </div>

    {/* Footer */}
    <div className="p-4 border-t">
      <a href="#" className="flex items-center gap-3 px-3 py-2 
  text-red-500 hover:bg-red-50 rounded-lg mb-4">
        <span>🚪</span>
        <span>Log out</span>
      </a>

      {/* Upgrade Card */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 
  rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span>⭐</span>
          <span className="font-semibold">Upgrade Pro!</span>
        </div>
        <p className="text-sm opacity-90 mb-3">Higher productivity
  with better organization</p>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 
  rounded-lg p-4 text-white">
          Upgrade Pro
        </button>
      </div>
    </div>
  </div>
  
  
  
  );
}
