import React from "react";

const StandardTemplates = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
        <h2 className="text-lg font-bold mb-2">StrongLifts 5x5</h2>
        <p className="text-sm text-gray-700">
          StrongLifts 5x5 is a popular strength training program focused on
          compound exercises...
        </p>
      </div>
      <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
        <h2 className="text-lg font-bold mb-2">HIIT Circuit</h2>
        <p className="text-sm text-gray-700">
          The HIIT (High-Intensity Interval Training) Circuit is a
          time-efficient workout that alternates between short bursts of intense
          exercise...
        </p>
      </div>
      <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
        <h2 className="text-lg font-bold mb-2">Upper Body Blast</h2>
        <p className="text-sm text-gray-700">
          The Upper Body Blast routine is designed to target the muscles of the
          upper body, including the chest, back, shoulders, and arms...
        </p>
      </div>
      <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
        <h2 className="text-lg font-bold mb-2">Leg Day Superset</h2>
        <p className="text-sm text-gray-700">
          Leg Day Superset is a challenging workout routine that focuses on
          strengthening and sculpting the lower body muscles...
        </p>
      </div>
      <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
        <h2 className="text-lg font-bold mb-2">Core Crusher</h2>
        <p className="text-sm text-gray-700">
          Core Crusher is a core-focused workout routine designed to target the
          muscles of the abdominals, obliques, and lower back...
        </p>
      </div>
    </div>
  );
};

export default StandardTemplates;
