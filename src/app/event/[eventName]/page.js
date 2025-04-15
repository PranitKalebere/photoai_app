"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventPage() {
  const params = useParams();
  const eventName = params?.eventName;

  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSubEvent, setSelectedSubEvent] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSubEventName, setNewSubEventName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    fetchEventDetails();
  }, [eventName]);

  const fetchEventDetails = () => {
    if (eventName) {
      fetch(`http://localhost:5000/api/get-event-details/${eventName}`)
        .then(res => res.json())
        .then(data => {
          setEventDetails(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching event details:', error);
          setLoading(false);
        });
    }
  };

  const fetchPhotos = () => {
    if (eventName && selectedSubEvent) {
      fetch(`http://localhost:5000/api/get-photos/${eventName}/${selectedSubEvent}`)
        .then(res => res.json())
        .then(data => {
          if (data.photos) {
            setPhotos(data.photos);
          } else {
            setPhotos([]);
          }
        })
        .catch(error => {
          console.error('Error fetching photos:', error);
        });
    }
  };

  const fetchPeoplePhotos = () => {
    if (eventName && selectedSubEvent) {
      fetch(`http://localhost:5000/api/get-photos/${eventName}/${selectedSubEvent}`)
        .then(res => res.json())
        .then(data => {
          if (data.photos) {
            setPhotos(data.photos);
          } else {
            setPhotos([]);
          }
        })
        .catch(error => {
          console.error('Error fetching people photos:', error);
        });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedSubEvent || !selectedFiles || selectedFiles.length === 0) {
      alert('Please select a sub-event and choose photos.');
      return;
    }

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('subEventName', selectedSubEvent);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('photos', selectedFiles[i]);
    }

    try {
      const res = await fetch('http://localhost:5000/api/upload-photos', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert('Photos uploaded successfully!');
      fetchPhotos();
      console.log('Upload response:', data);
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos.');
    }
  };

  const handleCreateSubEvent = async () => {
    if (!newSubEventName.trim()) {
      alert('Please enter a sub-event name.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/create-sub-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: eventName,
          subEventName: newSubEventName,
        }),
      });
      const data = await res.json();
      console.log('Sub-event created:', data);

      if (res.ok) {
        alert('Sub-event created successfully!');
        setShowModal(false);
        setNewSubEventName('');
        fetchEventDetails();
      } else {
        alert('Failed to create sub-event.');
      }
    } catch (error) {
      console.error('Error creating sub-event:', error);
      alert('Failed to create sub-event.');
    }
  };

  useEffect(() => {
    if (selectedSubEvent) {
      if (selectedTab === 'all') {
        fetchPhotos();
      } else if (selectedTab === 'people') {
        fetchPeoplePhotos();
      }
    }
  }, [selectedSubEvent, selectedTab]);

  if (loading) return <div>Loading...</div>;
  if (!eventDetails) return <div>No Event Details Found</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Side Panel */}
      <div style={{ width: '250px', background: '#f0f0f0', padding: '20px' }}>
        <h2>Sub Events</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {eventDetails.subEvents.map((sub, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedSubEvent(sub);
                setSelectedFiles(null);
              }}
              style={{
                padding: '10px',
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: selectedSubEvent === sub ? '#ddd' : '#fff',
                borderRadius: '5px',
                fontWeight: selectedSubEvent === sub ? 'bold' : 'normal',
              }}
            >
              {sub}
            </li>
          ))}
        </ul>
        <button
          style={{
            marginTop: '20px',
            padding: '10px',
            width: '100%',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => setShowModal(true)}
        >
          + Add Sub-Event
        </button>
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Event: {eventName}</h1>
        {selectedSubEvent && (
          <>
            <h2>Sub Event: {selectedSubEvent}</h2>

            {/* Tabs */}
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => setSelectedTab('all')}
                style={{
                  marginRight: '10px',
                  padding: '8px 16px',
                  backgroundColor: selectedTab === 'all' ? '#0070f3' : '#eee',
                  color: selectedTab === 'all' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                All Photos
              </button>
              <button
                onClick={() => setSelectedTab('people')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedTab === 'people' ? '#0070f3' : '#eee',
                  color: selectedTab === 'people' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                People Photos
              </button>
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '20px' }}>
              <input type="file" multiple onChange={handleFileChange} />
              <button
                onClick={handleUpload}
                style={{
                  marginLeft: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Upload Photos
              </button>
            </div>

            {/* Photo Gallery */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {photos.length > 0 ? (
                photos.map((photoUrl, idx) => (
                  <img
                    key={idx}
                    src={photoUrl}
                    alt={`Photo ${idx}`}
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ))
              ) : (
                <p>No photos found for this sub-event.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal for Sub-event creation */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', width: '300px' }}>
            <h3>Create New Sub-Event</h3>
            <input
              type="text"
              value={newSubEventName}
              onChange={(e) => setNewSubEventName(e.target.value)}
              placeholder="Sub-event name"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleCreateSubEvent} style={{
                padding: '8px 12px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}>
                Create
              </button>
              <button onClick={() => setShowModal(false)} style={{
                padding: '8px 12px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '5px',
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
