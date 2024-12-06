
import React, { useState } from 'react';

const App = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [equipment, setEquipment] = useState({
    tablet: { id: 'T123', isVerified: false },
    stretcher: { id: 'S456', isVerified: false },
    pump: { id: 'P789', isVerified: false },
    monitor: { id: 'M012', isVerified: false }
  });

  const stations = {
    Anderlecht: ['Alpha 12', 'Alpha 13', 'Alpha 14', 'Alpha 15'],
    HSP: ['Alpha 22', 'Alpha 23', 'PIT 21'],
    Chenaie: ['Alpha 32']
  };

  const updateEquipment = (type, newId) => {
    setEquipment(prev => ({
      ...prev,
      [type]: { id: newId, isVerified: true }
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {!selectedStation && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-4">Sélection de la Caserne</h2>
          {Object.keys(stations).map(station => (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className="w-full p-4 text-left bg-gray-100 hover:bg-blue-500 hover:text-white rounded"
            >
              {station}
            </button>
          ))}
        </div>
      )}

      {selectedStation && !selectedVehicle && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-4">Véhicules - {selectedStation}</h2>
          {stations[selectedStation].map(vehicle => (
            <button
              key={vehicle}
              onClick={() => setSelectedVehicle(vehicle)}
              className="w-full p-4 text-left bg-gray-100 hover:bg-blue-500 hover:text-white rounded"
            >
              {vehicle}
            </button>
          ))}
        </div>
      )}

      {selectedVehicle && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Inventaire - {selectedVehicle}</h2>
            {Object.entries(equipment).map(([type, item]) => (
              <div key={type} className="flex justify-between items-center mb-2 p-2">
                <span className="capitalize">{type}</span>
                <div className="flex gap-2 items-center">
                  <span>{item.id}</span>
                  <button
                    onClick={() => {
                      const newId = prompt(`Nouveau numéro pour ${type}`);
                      if (newId) updateEquipment(type, newId);
                    }}
                    className={`px-3 py-1 rounded ${
                      item.isVerified ? 'bg-green-500' : 'bg-blue-500'
                    } text-white`}
                  >
                    {item.isVerified ? 'Vérifié' : 'Vérifier'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Repas du Jour</h2>
            {['Midi: Steak-frites', 'Soir: Pâtes Carbonara'].map(meal => (
              <div key={meal} className="flex justify-between items-center mb-2">
                <span>{meal}</span>
                <button className="px-4 py-2 bg-gray-200 hover:bg-green-500 hover:text-white rounded">
                  Présent
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;