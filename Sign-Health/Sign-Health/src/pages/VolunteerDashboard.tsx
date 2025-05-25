import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, auth, SignRecord, Volunteer } from '../lib/firebase';

const VolunteerDashboard: React.FC = () => {
  const [signs, setSigns] = useState<SignRecord[]>([]);
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      // Handle not logged in
      setLoading(false);
      return;
    }

    // Get volunteer data
    const volunteerRef = doc(db, 'volunteers', user.uid);
    const unsubscribeVolunteer = onSnapshot(volunteerRef, (doc) => {
      if (doc.exists()) {
        setVolunteer({ id: doc.id, ...doc.data() } as Volunteer);
      }
    });

    // Get signs
    const signsQuery = query(
      collection(db, 'signs'),
      where('status', 'in', ['pending', 'assigned'])
    );

    const unsubscribeSigns = onSnapshot(signsQuery, (snapshot) => {
      const signsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SignRecord[];
      setSigns(signsData);
      setLoading(false);
    });

    return () => {
      unsubscribeVolunteer();
      unsubscribeSigns();
    };
  }, []);

  const handleAcceptSign = async (signId: string) => {
    if (!volunteer) return;

    try {
      const signRef = doc(db, 'signs', signId);
      await updateDoc(signRef, {
        status: 'assigned',
        assignedVolunteerId: volunteer.id
      });
    } catch (error) {
      console.error('Error accepting sign:', error);
    }
  };

  const handleCompleteSign = async (signId: string) => {
    try {
      const signRef = doc(db, 'signs', signId);
      await updateDoc(signRef, {
        status: 'completed'
      });
    } catch (error) {
      console.error('Error completing sign:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!volunteer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Please log in as a volunteer</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Volunteer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Signs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Signs</h2>
          {signs.filter(sign => sign.status === 'pending').map(sign => (
            <div key={sign.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{sign.gesture}</p>
                  <p className="text-sm text-gray-500">
                    {sign.timestamp.toDate().toLocaleString()}
                  </p>
                  {sign.location && (
                    <p className="text-sm text-gray-500">
                      Location: {sign.location.latitude.toFixed(4)}, {sign.location.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleAcceptSign(sign.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Assigned Signs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Assigned Signs</h2>
          {signs.filter(sign => sign.status === 'assigned' && sign.assignedVolunteerId === volunteer.id).map(sign => (
            <div key={sign.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{sign.gesture}</p>
                  <p className="text-sm text-gray-500">
                    {sign.timestamp.toDate().toLocaleString()}
                  </p>
                  {sign.location && (
                    <p className="text-sm text-gray-500">
                      Location: {sign.location.latitude.toFixed(4)}, {sign.location.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleCompleteSign(sign.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard; 