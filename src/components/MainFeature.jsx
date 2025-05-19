import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const MainFeature = ({ onEventCreated, isCreatingEvent, setIsCreatingEvent }) => {
  // Event form state
  const [formCreatingState, setFormCreatingState] = useState(isCreatingEvent || false);
  const [formStep, setFormStep] = useState(1);
  
  const navigate = useNavigate();
  
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
          onClick={() => navigate('/create-event')}
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
                  onClick={() => navigate('/create-event')}
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
    </div>
  );
};

export default MainFeature;