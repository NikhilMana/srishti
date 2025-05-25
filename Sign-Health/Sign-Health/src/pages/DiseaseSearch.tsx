import React, { useState, useEffect } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { searchDiseases, Disease } from '../lib/disease-db';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const DiseaseSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'kannada' | 'hindi'>('english');

  // Load common diseases when component mounts
  useEffect(() => {
    const loadCommonDiseases = async () => {
      try {
        setLoading(true);
        const results = await searchDiseases('');
        setDiseases(results);
        setError(null);
      } catch (err) {
        setError('Failed to load diseases. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCommonDiseases();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // If search is empty, show all diseases
      const results = await searchDiseases('');
      setDiseases(results);
      return;
    }

    try {
      setLoading(true);
      const results = await searchDiseases(searchTerm);
      setDiseases(results);
      setError(null);
    } catch (err) {
      setError('Failed to search diseases. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Disease Search</h1>
          <p className="text-gray-600">Search for diseases and their symptoms in multiple languages</p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search diseases or symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} className="whitespace-nowrap">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-4">
            <Select
              value={selectedLanguage}
              onValueChange={(value: 'english' | 'kannada' | 'hindi') => setSelectedLanguage(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {diseases.map((disease) => (
                <div key={disease.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{disease.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(disease.severity)}`}>
                      {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Severity
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{disease.description[selectedLanguage]}</p>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Symptoms:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {disease.symptoms[selectedLanguage].map((symptom, index) => (
                        <li key={index} className="text-gray-600">{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">Category: {disease.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseSearch;