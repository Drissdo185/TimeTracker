import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Keep your existing sidebar code */}
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
            <button className="bg-white text-purple-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              Upgrade Pro
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area*/}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-80 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* User Avatar */}
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              O
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Earnings</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">💰</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$5,567.00</div>
            <div className="text-sm text-gray-500">Last month: $4,545.00</div>
          </div>

          {/* Spending Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Spending</h3>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">💳</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$3,533.00</div>
            <div className="text-sm text-gray-500">Last month: $3,243.00</div>
          </div>

          {/* Savings Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Savings</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600">🏦</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$2,324.00</div>
            <div className="text-sm text-gray-500">Last month: $2,232.00</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transactions Overview</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">$4,235.00</div>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">📊 Chart will go here</span>
            </div>
          </div>

          {/* Right Side - Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent orders</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700">Sort by</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">INV_000076</div>
                    <div className="text-sm text-gray-500">17 Apr, 2026</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">$25,500</div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">INV_000075</div>
                    <div className="text-sm text-gray-500">15 Apr, 2026</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">$32,750</div>
                  <div className="text-sm text-orange-600">Pending</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">INV_000073</div>
                    <div className="text-sm text-gray-500">10 Apr, 2026</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">$15,900</div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}