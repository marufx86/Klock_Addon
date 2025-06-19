
import React, { useState, useEffect } from 'react';
import { Clock, Pause } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HoursCalculator from "@/components/HoursCalculator";
import FocusSession from "@/components/FocusSession";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-8">
          Klock Addon
        </h1>
        
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Hours Calculator</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <HoursCalculator />
          </TabsContent>
          
          <TabsContent value="focus">
            <FocusSession />
          </TabsContent>
        </Tabs>

        {/* Credit */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Credit @Maruf Khan Ornob
        </div>
      </div>
    </div>
  );
};

export default Index;
