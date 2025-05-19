import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample data for demonstration
  const [events, setEvents] = useState([
    {
      id: '1',
      name: 'Tech Conference 2023',
      description: 'Annual technology conference featuring keynotes, workshops, and networking opportunities',
      startDate: '2023-12-15T09:00:00',
      endDate: '2023-12-17T18:00:00',
      location: 'San Francisco Convention Center',
      eventType: 'conference',
      status: 'upcoming'
    },
    {
      id: '2',
      name: 'Product Launch Webinar',
      description: 'Virtual product launch event with live demonstrations and Q&A session',
      startDate: '2023-11-25T14:00:00',
      endDate: '2023-11-25T16:00:00',
      location: 'Virtual (Zoom)',
      eventType: 'webinar',
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'Leadership Workshop',
      description: 'Interactive workshop focusing on leadership skills and team management',
      startDate: '2023-10-05T10:00:00',
      endDate: '2023-10-05T16:00:00',
      location: 'Downtown Business Center',
      eventType: 'workshop',
      status: 'past'
    }
  ]);
  
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };
  
  const filteredEvents = events.filter(event => {
    if (activeTab === 'all') return true;
    return event.status === activeTab;
  });

  // Icons
  const CalendarIcon = getIcon('calendar');
  const UsersIcon = getIcon('users');
  const LayoutIcon = getIcon('layout-dashboard');
  const PlusIcon = getIcon('plus');
  const TrashIcon = getIcon('trash-2');
  const ClockIcon = getIcon('clock');
  const MapPinIcon = getIcon('map-pin');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              EventFlux
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Efficiently organize and manage events from creation to completion
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white text-primary hover:bg-surface-100 px-6 py-3"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Event
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-primary-dark/40 hover:bg-primary-dark/60 border border-white/20 px-6 py-3"
              >
                <LayoutIcon className="w-5 h-5 mr-2" />
                View Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="currentColor" 
              fillOpacity="1" 
              className="text-surface-50 dark:text-surface-900"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-neu p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{events.filter(e => e.status === 'upcoming').length}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">Upcoming Events</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-neu p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary mr-4">
                <UsersIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">245</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">Total Attendees</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card-neu p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent/10 text-accent mr-4">
                <LayoutIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{events.length}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">Total Events</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event Management Feature */}
        <MainFeature 
          onEventCreated={(newEvent) => {
            setEvents([...events, { ...newEvent, id: Date.now().toString(), status: 'upcoming' }]);
          }}
        />
        
        {/* Event Listing */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Events</h2>
            <div className="flex bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-surface-700 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-surface-700/50'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === 'upcoming' ? 'bg-white dark:bg-surface-700 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-surface-700/50'}`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === 'past' ? 'bg-white dark:bg-surface-700 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-surface-700/50'}`}
              >
                Past
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="card group hover:shadow-lg dark:hover:border-primary/50 transition-all duration-300"
              >
                <div 
                  className={`h-32 bg-cover bg-center ${event.eventType === 'conference' ? 'bg-[url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070")]' : 
                    event.eventType === 'webinar' ? 'bg-[url("https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070")]' : 
                    'bg-[url("https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070")]'}`}
                >
                  <div className="w-full h-full bg-gradient-to-t from-surface-900/80 to-transparent p-4 flex items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                      event.eventType === 'conference' ? 'bg-primary/80 text-white' :
                      event.eventType === 'webinar' ? 'bg-secondary/80 text-white' :
                      'bg-accent/80 text-white'
                    }`}>
                      {event.eventType}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{event.name}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm line-clamp-2 mb-4">{event.description}</p>
                  
                  <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm mb-2">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 flex justify-between items-center">
                  <button className="btn btn-primary">Manage</button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 text-surface-500 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon className="w-10 h-10 text-surface-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-surface-500 dark:text-surface-400 max-w-md">
                  There are no events matching your current filter. Try changing your filter or create a new event.
                </p>
                <button className="btn btn-primary mt-4 flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create New Event
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
            <p>© 2023 EventFlux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;