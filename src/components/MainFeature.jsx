import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addDays } from 'date-fns';
import { getIcon } from '../utils/iconUtils';

const MainFeature = ({ onEventCreated, isCreatingEvent, setIsCreatingEvent }) => {
  // Event form state
  const [formCreatingState, setFormCreatingState] = useState(isCreatingEvent || false);
  const [formStep, setFormStep] = useState(1);
  
  // Form data state
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    eventType: 'conference',
    location: '',
    startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endDate: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    timezone: 'UTC'
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (formStep === 1) {
      if (!eventData.name.trim()) newErrors.name = "Event name is required";
      if (eventData.name.trim().length < 5) newErrors.name = "Event name must be at least 5 characters";
      if (!eventData.description.trim()) newErrors.description = "Description is required";
      if (eventData.description.trim().length < 20) newErrors.description = "Description must be at least 20 characters";
      if (!eventData.eventType) newErrors.eventType = "Event type is required";
    } else if (formStep === 2) {
      if (!eventData.location.trim()) newErrors.location = "Location is required";
      if (!eventData.startDate) newErrors.startDate = "Start date is required";
      if (!eventData.endDate) newErrors.endDate = "End date is required";
      
      const start = new Date(eventData.startDate);
      const end = new Date(eventData.endDate);
      
      if (start >= end) newErrors.endDate = "End date must be after start date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setFormStep(prev => prev + 1);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process event creation
      onEventCreated(eventData);
      
      // Show success toast
      toast.success("Event created successfully!");
      
      // Reset form
      setEventData({
        name: '',
        description: '',
        eventType: 'conference',
        location: '',
        startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        endDate: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
        timezone: 'UTC'
      });
      
      // Reset form state
      setFormStep(1);
      setFormCreatingState(false);
      setIsCreatingEvent(false); // Update parent state
    }
  };
  
  // Keyboard handling for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isCreatingEvent) {
        setFormCreatingState(false);
        setIsCreatingEvent(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape); 
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isCreatingEvent]);
  
  // Icons for the component
  const PlusIcon = getIcon('plus');
  const CalendarIcon = getIcon('calendar');
  const XIcon = getIcon('x');
  const CheckIcon = getIcon('check-circle');
  const ArrowLeftIcon = getIcon('arrow-left');
  const ArrowRightIcon = getIcon('arrow-right');
  const MapPinIcon = getIcon('map-pin');
  const ClockIcon = getIcon('clock');
  const BuildingIcon = getIcon('building');
  const VideoIcon = getIcon('video');
  const UsersIcon = getIcon('users');
  const PartyPopperIcon = getIcon('party-popper');
  const GraduationCapIcon = getIcon('graduation-cap');

  return (
    <div className="relative">
      {/* Section heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Event Management</h2>
          <p className="text-surface-600 dark:text-surface-400">Create and manage your events efficiently</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreatingEvent(true)}
          className="btn btn-primary px-5 py-2.5"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Event
        </motion.button>
      </div>
      
      {/* Feature card */}
      <div className="card overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Feature content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Streamline Your Event Planning Process
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  EventFlux makes it easy to create, manage, and track events of all types. From conferences 
                  to workshops to webinars, our platform provides all the tools you need to ensure your 
                  events are successful.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3 mt-0.5">
                      <CheckIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Effortless Event Creation</h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Intuitive wizard interface guides you through the event creation process
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3 mt-0.5">
                      <CheckIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Complete Event Management</h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Handle everything from attendee registration to scheduling in one place
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3 mt-0.5">
                      <CheckIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Comprehensive Analytics</h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Gain insights from detailed reports on attendance, engagement, and more
                      </p>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCreatingEvent(true)}
                  className="btn btn-primary mt-8"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Get Started
                </motion.button>
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012" 
                    alt="Event Management Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-white text-xl font-bold mb-2">Interactive Dashboard</h4>
                    <p className="text-white/80 text-sm">
                      Manage all aspects of your events with our intuitive dashboard
                    </p>
                  </div>
                </div>
                
                {/* Floating elements for decoration */}
                <div className="absolute -top-4 -right-4 bg-accent p-3 rounded-lg shadow-lg text-white">
                  <UsersIcon className="w-6 h-6" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-primary p-3 rounded-lg shadow-lg text-white hidden md:block">
                  <CalendarIcon className="w-6 h-6" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* Create Event Modal - using parent state via props */}
      {/* Create Event Modal */}
      <AnimatePresence>
        {isCreatingEvent && (
            initial={{ opacity: 0 }} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsCreatingEvent(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-surface-200 dark:border-surface-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">
                    {formStep === 1 ? "Create New Event - Basic Info" : "Create New Event - Date & Location"}
                  </h3>
                  <button
                    onClick={() => setIsCreatingEvent(false)}
                    className="p-1.5 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress indicator */}
                <div className="flex items-center mt-6">
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-primary"
                        initial={{ width: '50%' }}
                        animate={{ width: formStep === 1 ? '50%' : '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-center text-sm text-surface-500 dark:text-surface-400">
                    {formStep}/2
                  </div>
                </div>
              </div>
              
              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="p-6">
                {formStep === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="label">Event Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        placeholder="Enter event name"
                        className={`input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="label">Event Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        placeholder="Describe your event"
                        rows="4"
                        className={`input resize-none ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="eventType" className="label">Event Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        <button
                          type="button"
                          onClick={() => setEventData(prev => ({ ...prev, eventType: 'conference' }))}
                          className={`p-4 rounded-lg border ${
                            eventData.eventType === 'conference' 
                              ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                              : 'border-surface-200 dark:border-surface-700'
                          } flex flex-col items-center justify-center gap-2 transition-colors`}
                        >
                          <BuildingIcon className={`w-6 h-6 ${
                            eventData.eventType === 'conference' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'
                          }`} />
                          <span className={eventData.eventType === 'conference' ? 'font-medium' : ''}>Conference</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setEventData(prev => ({ ...prev, eventType: 'webinar' }))}
                          className={`p-4 rounded-lg border ${
                            eventData.eventType === 'webinar' 
                              ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                              : 'border-surface-200 dark:border-surface-700'
                          } flex flex-col items-center justify-center gap-2 transition-colors`}
                        >
                          <VideoIcon className={`w-6 h-6 ${
                            eventData.eventType === 'webinar' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'
                          }`} />
                          <span className={eventData.eventType === 'webinar' ? 'font-medium' : ''}>Webinar</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setEventData(prev => ({ ...prev, eventType: 'workshop' }))}
                          className={`p-4 rounded-lg border ${
                            eventData.eventType === 'workshop' 
                              ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                              : 'border-surface-200 dark:border-surface-700'
                          } flex flex-col items-center justify-center gap-2 transition-colors`}
                        >
                          <GraduationCapIcon className={`w-6 h-6 ${
                            eventData.eventType === 'workshop' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'
                          }`} />
                          <span className={eventData.eventType === 'workshop' ? 'font-medium' : ''}>Workshop</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setEventData(prev => ({ ...prev, eventType: 'networking' }))}
                          className={`p-4 rounded-lg border ${
                            eventData.eventType === 'networking' 
                              ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                              : 'border-surface-200 dark:border-surface-700'
                          } flex flex-col items-center justify-center gap-2 transition-colors`}
                        >
                          <UsersIcon className={`w-6 h-6 ${
                            eventData.eventType === 'networking' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'
                          }`} />
                          <span className={eventData.eventType === 'networking' ? 'font-medium' : ''}>Networking</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setEventData(prev => ({ ...prev, eventType: 'celebration' }))}
                          className={`p-4 rounded-lg border ${
                            eventData.eventType === 'celebration' 
                              ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                              : 'border-surface-200 dark:border-surface-700'
                          } flex flex-col items-center justify-center gap-2 transition-colors`}
                        >
                          <PartyPopperIcon className={`w-6 h-6 ${
                            eventData.eventType === 'celebration' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'
                          }`} />
                          <span className={eventData.eventType === 'celebration' ? 'font-medium' : ''}>Celebration</span>
                        </button>
                      </div>
                      {errors.eventType && (
                        <p className="mt-1 text-sm text-red-500">{errors.eventType}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="location" className="label">Location</label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500 dark:text-surface-400" />
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={eventData.location}
                          onChange={handleChange}
                          placeholder="Enter event location (venue or online)"
                          className={`input pl-10 ${errors.location ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="label">Start Date & Time</label>
                        <div className="relative">
                          <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500 dark:text-surface-400" />
                          <input
                            type="datetime-local"
                            id="startDate"
                            name="startDate"
                            value={eventData.startDate}
                            onChange={handleChange}
                            className={`input pl-10 ${errors.startDate ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.startDate && (
                          <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="endDate" className="label">End Date & Time</label>
                        <div className="relative">
                          <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500 dark:text-surface-400" />
                          <input
                            type="datetime-local"
                            id="endDate"
                            name="endDate"
                            value={eventData.endDate}
                            onChange={handleChange}
                            className={`input pl-10 ${errors.endDate ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.endDate && (
                          <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="timezone" className="label">Timezone</label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={eventData.timezone}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="EST">EST (Eastern Standard Time)</option>
                        <option value="CST">CST (Central Standard Time)</option>
                        <option value="MST">MST (Mountain Standard Time)</option>
                        <option value="PST">PST (Pacific Standard Time)</option>
                        <option value="IST">IST (Indian Standard Time)</option>
                        <option value="GMT">GMT (Greenwich Mean Time)</option>
                      </select>
                    </div>
                  </div>
                )}
              </form>
              
              {/* Modal Footer */}
              <div className="p-6 border-t border-surface-200 dark:border-surface-700 flex justify-between">
                {formStep === 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsCreatingEvent(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary"
                    >
                      Next Step
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn btn-outline"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Create Event
                      <CheckIcon className="w-4 h-4 ml-2" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;