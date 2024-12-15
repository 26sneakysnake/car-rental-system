import React, { useState, useEffect } from 'react';

export default function CarManagement() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: 2024,
    licensePlate: '',
    dailyRate: 0,
    available: true
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar)
      });
      fetchCars();
      setNewCar({
        brand: '',
        model: '',
        year: 2024,
        licensePlate: '',
        dailyRate: 0,
        available: true
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'DELETE'
      });
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Voitures</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Marque"
            className="p-2 border rounded"
            value={newCar.brand}
            onChange={(e) => setNewCar({...newCar, brand: e.target.value})}
          />
          <input
            type="text"
            placeholder="Modèle"
            className="p-2 border rounded"
            value={newCar.model}
            onChange={(e) => setNewCar({...newCar, model: e.target.value})}
          />
          <input
            type="number"
            placeholder="Année"
            className="p-2 border rounded"
            value={newCar.year}
            onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
          />
          <input
            type="text"
            placeholder="Plaque d'immatriculation"
            className="p-2 border rounded"
            value={newCar.licensePlate}
            onChange={(e) => setNewCar({...newCar, licensePlate: e.target.value})}
          />
          <input
            type="number"
            placeholder="Prix journalier"
            className="p-2 border rounded"
            value={newCar.dailyRate}
            onChange={(e) => setNewCar({...newCar, dailyRate: parseFloat(e.target.value)})}
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ajouter une voiture
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
            <p>Année: {car.year}</p>
            <p>Plaque: {car.licensePlate}</p>
            <p>Prix/jour: {car.dailyRate}€</p>
            <p>Status: {car.available ? 'Disponible' : 'Non disponible'}</p>
            <button
              onClick={() => handleDelete(car.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}