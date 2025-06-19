
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const HoursCalculator = () => {
  // Time state
  const [currentTime, setCurrentTime] = useState('--:-- --');
  const [useCustomStart, setUseCustomStart] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [startAmPm, setStartAmPm] = useState('AM');
  const [targetHour, setTargetHour] = useState('');
  const [targetMinute, setTargetMinute] = useState('');
  const [targetAmPm, setTargetAmPm] = useState('AM');
  const [addHours, setAddHours] = useState('');
  const [output, setOutput] = useState('--');
  const [error, setError] = useState('');

  // Functions
  const format12Hour = (hours: number, minutes: number) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const getTotalMinutes = (hour: string, minute: string, ampm: string) => {
    const h = parseInt(hour) || 0;
    const m = parseInt(minute) || 0;
    let totalHours = h;
    if (ampm === 'PM' && h !== 12) totalHours += 12;
    if (ampm === 'AM' && h === 12) totalHours = 0;
    return totalHours * 60 + m;
  };

  const getDateFromMinutes = (total: number) => {
    const h = Math.floor(total / 60) % 24;
    const m = total % 60;
    return format12Hour(h, m);
  };

  const getBaseMinutes = () => {
    if (useCustomStart) {
      return getTotalMinutes(startHour, startMinute, startAmPm);
    } else {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes();
    }
  };

  const updateCurrentTime = () => {
    const now = new Date();
    setCurrentTime(format12Hour(now.getHours(), now.getMinutes()));
  };

  const updateOutput = () => {
    setError('');
    const base = getBaseMinutes();
    const hasTargetTime = targetHour !== '';
    const hasAddHours = addHours !== '';

    // Handle case where both target time and add hours are filled
    if (hasTargetTime && hasAddHours) {
      setError('Please fill only target time OR hours to add');
      setOutput('--');
      return;
    }

    if (hasTargetTime) {
      // Use Target Time (assume minute = 0 if empty)
      const minutes = targetMinute === "" ? 0 : parseInt(targetMinute);
      const target = getTotalMinutes(targetHour, targetMinute || '0', targetAmPm);
      let diff = target - base;
      if (diff < 0) diff += 1440;
      const hrs = Math.floor(diff / 60);
      const mins = diff % 60;
      setOutput(`${hrs}h ${mins}m`);
    } else if (hasAddHours) {
      // Use Add Hours
      const future = (base + parseInt(addHours) * 60) % 1440;
      setOutput(`${getDateFromMinutes(future)}`);
    } else {
      setOutput('Fill target time OR hours to add');
    }

    saveToStorage();
  };

  const saveToStorage = () => {
    localStorage.setItem('useCustomStart', useCustomStart.toString());
    localStorage.setItem('startHour', startHour);
    localStorage.setItem('startMinute', startMinute);
    localStorage.setItem('startAmPm', startAmPm);
    localStorage.setItem('targetHour', targetHour);
    localStorage.setItem('targetMinute', targetMinute);
    localStorage.setItem('targetAmPm', targetAmPm);
    localStorage.setItem('addHours', addHours);
  };

  const loadFromStorage = () => {
    setUseCustomStart(localStorage.getItem('useCustomStart') === 'true');
    setStartHour(localStorage.getItem('startHour') || '');
    setStartMinute(localStorage.getItem('startMinute') || '');
    setStartAmPm(localStorage.getItem('startAmPm') || 'AM');
    setTargetHour(localStorage.getItem('targetHour') || '');
    setTargetMinute(localStorage.getItem('targetMinute') || '');
    setTargetAmPm(localStorage.getItem('targetAmPm') || 'AM');
    setAddHours(localStorage.getItem('addHours') || '');
  };

  // Effects
  useEffect(() => {
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    loadFromStorage();
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateOutput();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCustomStart, startHour, startMinute, startAmPm, targetHour, targetMinute, targetAmPm, addHours]);

  // Input handlers
  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    max: number
  ) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= max)) {
      setter(value);
    }
  };

  const handleTargetHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNumberInput(e, setTargetHour, 12);
    if (e.target.value) {
      setAddHours(''); // Clear addHours when targetHour is entered
    }
  };

  const handleAddHoursInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNumberInput(e, setAddHours, 999);
    if (e.target.value) {
      // Clear target time fields when addHours is entered
      setTargetHour('');
      setTargetMinute('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Display */}
      <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-purple-300">
        <Clock size={20} className="text-purple-400" />
        {currentTime}
      </div>

      {/* Start Time Card */}
      <div className="bg-[#222] p-5 rounded-2xl border border-purple-500/20 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Start Time</span>
          <div className="flex items-center space-x-2">
            <Label htmlFor="custom-start" className="text-sm text-gray-400">Custom</Label>
            <Switch
              id="custom-start"
              checked={useCustomStart}
              onCheckedChange={setUseCustomStart}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </div>

        {useCustomStart && (
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Input 
                type="number"
                min="1"
                max="12"
                placeholder="HH"
                value={startHour}
                onChange={(e) => handleNumberInput(e, setStartHour, 12)}
                className="w-full bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl"
              />
            </div>
            <div className="relative flex-1">
              <Input 
                type="number"
                min="0"
                max="59"
                placeholder="MM"
                value={startMinute}
                onChange={(e) => handleNumberInput(e, setStartMinute, 59)}
                className="w-full bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl"
              />
            </div>
            <select
              value={startAmPm}
              onChange={(e) => setStartAmPm(e.target.value)}
              className="bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        )}
      </div>

      {/* Target Time Card */}
      <div className="bg-[#222] p-5 rounded-2xl border border-purple-500/20 shadow-lg">
        <span className="text-gray-300">Target Time</span>
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Input 
              type="number"
              min="1"
              max="12"
              placeholder="HH"
              value={targetHour}
              onChange={handleTargetHourInput}
              className="w-full bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl"
            />
          </div>
          <div className="relative flex-1">
            <Input 
              type="number"
              min="0"
              max="59"
              placeholder="MM"
              value={targetMinute}
              onChange={(e) => handleNumberInput(e, setTargetMinute, 59)}
              className="w-full bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl"
            />
          </div>
          <select
            value={targetAmPm}
            onChange={(e) => setTargetAmPm(e.target.value)}
            className="bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        <div className="mt-3">
          <span className="text-gray-300">Add Hours</span>
          <Input 
            type="number"
            min="0"
            placeholder="e.g. 7"
            value={addHours}
            onChange={handleAddHoursInput}
            className="w-full bg-[#333] border border-purple-500/30 rounded-lg p-3 text-center text-xl mt-2"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-purple-900/70 p-5 rounded-2xl border border-purple-500/30 shadow-lg">
        <span className="text-gray-300">Result</span>
        {error ? (
          <div className="mt-2 text-xl font-bold text-center text-red-400">{error}</div>
        ) : (
          <div className="mt-2 text-2xl font-bold text-center text-white">{output}</div>
        )}
      </div>
    </div>
  );
};

export default HoursCalculator;
