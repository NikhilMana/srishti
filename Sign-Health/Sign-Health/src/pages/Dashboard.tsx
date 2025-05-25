import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, FileText, Calendar, Stethoscope } from 'lucide-react';

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();

  // Redirect if user is not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.user_metadata?.first_name || 'User'}</h1>
            <p className="text-gray-600 mb-6">Your personal healthcare communication dashboard</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Medical Records Card */}
              <div className="bg-healthcare-50 rounded-lg p-6 border border-healthcare-100">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-healthcare-600 mr-2" />
                  <h2 className="text-xl font-semibold">Medical Records</h2>
                </div>
                <p className="text-gray-600 mb-4">Store and access your healthcare information securely.</p>
                <Button className="bg-healthcare-600 hover:bg-healthcare-700">View Records</Button>
              </div>
              
              {/* Translation Card */}
              <div className="bg-healthcare-50 rounded-lg p-6 border border-healthcare-100">
                <div className="flex items-center mb-4">
                  <Stethoscope className="h-6 w-6 text-healthcare-600 mr-2" />
                  <h2 className="text-xl font-semibold">Start Translation</h2>
                </div>
                <p className="text-gray-600 mb-4">Begin translating sign language to text for your healthcare visit.</p>
                <Button className="bg-healthcare-600 hover:bg-healthcare-700">Start Session</Button>
              </div>
              
              {/* Appointments Card */}
              <div className="bg-healthcare-50 rounded-lg p-6 border border-healthcare-100">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-healthcare-600 mr-2" />
                  <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                </div>
                <p className="text-gray-600 mb-4">View and manage your healthcare appointments.</p>
                <Button className="bg-healthcare-600 hover:bg-healthcare-700">View Schedule</Button>
              </div>

              {/* Disease Search Card */}
              <div className="bg-healthcare-50 rounded-lg p-6 border border-healthcare-100">
                <div className="flex items-center mb-4">
                  <Search className="h-6 w-6 text-healthcare-600 mr-2" />
                  <h2 className="text-xl font-semibold">Disease Search</h2>
                </div>
                <p className="text-gray-600 mb-4">Search for diseases and their symptoms in multiple languages.</p>
                <Link to="/disease-search">
                  <Button className="bg-healthcare-600 hover:bg-healthcare-700 w-full">Search Diseases</Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                variant="outline" 
                onClick={signOut} 
                className="text-healthcare-600 hover:text-healthcare-700 border-healthcare-300"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
