import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { getIcon } from '../utils/iconUtils';

const CreateEvent = () => {
  const navigate = useNavigate();
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
      window.scrollTo(0, 0);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process event creation (in a real app, this would send data to a server)
      // For this example, we'll just show a success message
      
      toast.success("Event created successfully!");
      
      // In a real application, you might wait for the backend response before redirecting
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };
  
  // Icons for the component
  const ArrowLeftIcon = getIcon('arrow-left');
  const ArrowRightIcon = getIcon('arrow-right');
  const CheckIcon = getIcon('check-circle');
  const MapPinIcon = getIcon('map-pin');
  const ClockIcon = getIcon('clock');
  const BuildingIcon = getIcon('building');
  const VideoIcon = getIcon('video');
  const UsersIcon = getIcon('users');
  const PartyPopperIcon = getIcon('party-popper');
  const GraduationCapIcon = getIcon('graduation-cap');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Fill in the details below to create your event
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center mb-8">
          <div className="flex-1">
            <div className="h-2 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
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
        
        {/* Card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          {/* Card header */}
          <div className="p-6 border-b border-surface-200 dark:border-surface-700">
            <h2 className="text-xl font-bold">
              {formStep === 1 ? "Basic Information" : "Date & Location"}
            </h2>
          </div>
          
          {/* Card content */}
          <form onSubmit={handleSubmit} className="p-6">
            {formStep === 1 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
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
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </motion.div>
            )}
          </form>
          
          {/* Card footer */}
          <div className="p-6 border-t border-surface-200 dark:border-surface-700 flex justify-between">
            {formStep === 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate('/')}
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
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Create Event
                  <CheckIcon className="w-4 h-4 ml-2" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;