
import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const FocusSession = () => {
  const [duration, setDuration] = useState(20);
  const [skipBreaks, setSkipBreaks] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedDuration = localStorage.getItem('focusDuration');
    const savedSkipBreaks = localStorage.getItem('skipBreaks');
    
    if (savedDuration) {
      setDuration(parseInt(savedDuration));
      setTimeRemaining(parseInt(savedDuration) * 60);
    }
    
    if (savedSkipBreaks) {
      setSkipBreaks(savedSkipBreaks === 'true');
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('focusDuration', duration.toString());
    localStorage.setItem('skipBreaks', skipBreaks.toString());
  }, [duration, skipBreaks]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Timer completed
            clearInterval(timerRef.current!);
            setIsRunning(false);
            toast.success("Focus session completed!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const startSession = () => {
    setTimeRemaining(duration * 60);
    setIsRunning(true);
    toast.info("Focus session started");
  };

  const pauseSession = () => {
    setIsRunning(false);
    toast.info("Focus session paused");
  };

  const resumeSession = () => {
    setIsRunning(true);
    toast.info("Focus session resumed");
  };

  const handleIncrementDuration = () => {
    if (duration < 90) {
      const newDuration = duration + 5;
      setDuration(newDuration);
      if (!isRunning) {
        setTimeRemaining(newDuration * 60);
      }
    }
  };

  const handleDecrementDuration = () => {
    if (duration > 5) {
      const newDuration = duration - 5;
      setDuration(newDuration);
      if (!isRunning) {
        setTimeRemaining(newDuration * 60);
      }
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return {
      minutes,
      seconds
    };
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSeconds = duration * 60;
    const percentage = ((totalSeconds - timeRemaining) / totalSeconds) * 100;
    return percentage;
  };

  const { minutes, seconds } = formatTime(timeRemaining);
  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      {!isRunning ? (
        // Setup View
        <div className="bg-[#222] p-5 rounded-2xl border border-purple-500/20 shadow-lg">
          <h2 className="text-xl font-bold text-center mb-3">Get ready to focus</h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            We'll turn off notifications and app alerts during each session. 
            For longer sessions, we'll add a short break so you can recharge.
          </p>

          <div className="flex justify-center mb-6">
            <div className="relative flex items-center">
              <button 
                onClick={handleDecrementDuration} 
                className="absolute left-0 -ml-6 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              
              <div className="w-24 h-24 bg-[#333] flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold">{duration}</div>
                  <div className="text-gray-400 text-xs">mins</div>
                </div>
              </div>
              
              <button 
                onClick={handleIncrementDuration} 
                className="absolute right-0 -mr-6 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 justify-center mb-6">
            <Checkbox 
              id="skip-breaks" 
              checked={skipBreaks} 
              onCheckedChange={(checked) => {
                setSkipBreaks(checked === true);
              }} 
            />
            <label 
              htmlFor="skip-breaks" 
              className="text-sm text-gray-400 cursor-pointer"
            >
              Skip breaks
            </label>
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-sm mb-2">
              {skipBreaks ? "You'll have no breaks" : "Short breaks will be added automatically"}
            </p>
            <Button 
              onClick={startSession} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Start focus session
            </Button>
          </div>
        </div>
      ) : (
        // Timer View - Fixed Layout
        <div className="bg-[#222] p-6 rounded-2xl border border-purple-500/20 shadow-lg">
          <h2 className="text-xl font-bold text-center mb-8">Focus session</h2>
          
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
              
              {/* Progress circle */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              
              {/* Clock tick marks */}
              <div className="absolute inset-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-4 bg-gray-500 rounded-full"
                    style={{
                      left: '50%',
                      top: '0%',
                      transformOrigin: '50% 120px',
                      transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    }}
                  />
                ))}
              </div>
              
              {/* Center timer display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold leading-none">
                    {minutes}
                    <span className="text-lg ml-1 text-gray-400">min</span>
                  </div>
                  <div className="text-xl text-gray-400 mt-1">
                    {seconds.toString().padStart(2, '0')}
                    <span className="text-sm ml-1">sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={isRunning ? pauseSession : resumeSession}
              variant="secondary"
              size="icon"
              className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusSession;
