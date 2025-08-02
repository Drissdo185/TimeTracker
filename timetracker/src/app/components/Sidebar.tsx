import { 
  BarChart3, 
  Lightbulb, 
  RefreshCw, 
  MessageSquare, 
  Users, 
  Repeat, 
  Clipboard, 
  MessageCircle, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Star,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl text-green-400 font-semibold">Treki</h1>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm font-medium mb-3">Menu</h3>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Lightbulb className="w-4 h-4" />
              <span>Insights</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <RefreshCw className="w-4 h-4" />
              <span>Updates</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
              <Badge variant="secondary" className="ml-auto">20</Badge>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </a>
          </nav>
        </div>

        {/* Features Section */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm font-medium mb-3">FEATURES</h3>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Repeat className="w-4 h-4" />
              <span>Recurring</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Clipboard className="w-4 h-4" />
              <span>Subscriptions</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MessageCircle className="w-4 h-4" />
              <span>Feedback</span>
            </a>
          </nav>
        </div>

        {/* General Section */}
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-3">GENERAL</h3>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <HelpCircle className="w-4 h-4" />
              <span>Help Desk</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg mb-4">
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </a>

        {/* Upgrade Card */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4" />
            <span className="font-semibold">Upgrade Pro!</span>
          </div>
          <p className="text-sm opacity-90 mb-3">Higher productivity with better organization</p>
          <Button variant="secondary" size="sm" className="bg-white text-green-600 hover:bg-gray-100">
            Upgrade Pro
          </Button>
        </Card>
      </div>
    </div>
  );
}