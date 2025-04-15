'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventName, setNewEventName] = useState('');

  // Fetch events on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:5000/api/list-events');
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events || []);
    }
  };

  const createEvent = async () => {
    if (!newEventName.trim()) return; // prevent empty names

    const res = await fetch('http://localhost:5000/api/create-event', {
      method: 'POST',
      body: JSON.stringify({ eventName: newEventName }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      // After creating, fetch the updated list again
      fetchEvents();
      setNewEventName('');
      setIsModalOpen(false);
    }
  };
  
  return (
    <div className="p-5">
      {/* Main Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Main Event
      </button>

      {/* Events List */}
      <div className="mt-5">
        {events.length > 0 ? (
          events.map((event) => (
            <Link 
              href={`/event/${encodeURIComponent(event)}`}
              key={event}
            >
              <div className="cursor-pointer p-2 border rounded mb-2 hover:bg-gray-100">
                {event}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No events yet. Create one!</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal content remains the same */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>

            <input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              placeholder="Enter event name"
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={createEvent}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}