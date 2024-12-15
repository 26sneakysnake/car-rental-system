import React, { useState } from 'react';
import CarForm from './CarForm';
import CustomerForm from './CustomerForm';
import RentalForm from './RentalForm';
import DashboardView from './DashboardView';

function App() {
  const [activeForm, setActiveForm] = useState(null);

  const renderForm = () => {
    switch(activeForm) {
      case 'car':
        return <CarForm />;
      case 'customer':
        return <CustomerForm />;
      case 'rental':
        return <RentalForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-6">
          Système de Location de Voitures
        </h1>

        {/* Boutons pour les formulaires */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveForm(activeForm === 'car' ? null : 'car')}
            className={`px-4 py-2 rounded ${
              activeForm === 'car' ? 'bg-blue-600' : 'bg-blue-500'
            } text-white hover:bg-blue-600`}
          >
            Nouvelle voiture
          </button>
          <button
            onClick={() => setActiveForm(activeForm === 'customer' ? null : 'customer')}
            className={`px-4 py-2 rounded ${
              activeForm === 'customer' ? 'bg-green-600' : 'bg-green-500'
            } text-white hover:bg-green-600`}
          >
            Nouveau client
          </button>
          <button
            onClick={() => setActiveForm(activeForm === 'rental' ? null : 'rental')}
            className={`px-4 py-2 rounded ${
              activeForm === 'rental' ? 'bg-purple-600' : 'bg-purple-500'
            } text-white hover:bg-purple-600`}
          >
            Nouvelle location
          </button>
          {activeForm && (
            <button
              onClick={() => setActiveForm(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Fermer le formulaire
            </button>
          )}
        </div>

        {/* Formulaire actif */}
        {renderForm()}

        {/* Tableau de bord */}
        <div className="mt-8">
          <DashboardView />
        </div>
      </div>
    </div>
  );
}

export default App;