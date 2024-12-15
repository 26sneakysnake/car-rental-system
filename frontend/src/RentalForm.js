import React, { useState, useEffect } from 'react';

export default function RentalForm() {
    const initialState = {
        customer: { id: '' },
        car: { id: '' },
        startDate: '',
        endDate: '',
        insuranceType: 'BASIC',
        status: 'IN_PROGRESS'
    };

    const [customers, setCustomers] = useState([]);
    const [cars, setCars] = useState([]);
    const [newRental, setNewRental] = useState(initialState);

    useEffect(() => {
        fetchCustomersAndCars();
    }, []);

    const fetchCustomersAndCars = async () => {
        try {
            const [customersResponse, carsResponse] = await Promise.all([
                fetch('http://localhost:8080/api/customers'),
                fetch('http://localhost:8080/api/cars')
            ]);
            const customersData = await customersResponse.json();
            const carsData = await carsResponse.json();
            setCustomers(customersData);
            setCars(carsData.filter(car => car.available));
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleReset = () => {
        setNewRental(initialState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/rentals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRental)
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            setNewRental(initialState);
            alert('Location créée avec succès !');
            fetchCustomersAndCars(); // Rafraîchir la liste des voitures disponibles
        } catch (error) {
            alert('Erreur : ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Nouvelle location</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <select
                        className="w-full p-2 border rounded"
                        value={newRental.customer.id}
                        onChange={(e) => setNewRental({...newRental, customer: { id: e.target.value }})}
                        required
                    >
                        <option value="">Sélectionnez un client</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        className="w-full p-2 border rounded"
                        value={newRental.car.id}
                        onChange={(e) => setNewRental({...newRental, car: { id: e.target.value }})}
                        required
                    >
                        <option value="">Sélectionnez une voiture</option>
                        {cars.map(car => (
                            <option key={car.id} value={car.id}>
                                {car.brand} {car.model} - {car.dailyRate}€/jour
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newRental.startDate}
                        onChange={(e) => setNewRental({...newRental, startDate: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newRental.endDate}
                        onChange={(e) => setNewRental({...newRental, endDate: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <select
                        className="w-full p-2 border rounded"
                        value={newRental.insuranceType}
                        onChange={(e) => setNewRental({...newRental, insuranceType: e.target.value})}
                        required
                    >
                        <option value="BASIC">Basique (+10%)</option>
                        <option value="MEDIUM">Medium (+20%)</option>
                        <option value="PREMIUM">Premium (+30%)</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Créer la location
                    </button>
                    <button 
                        type="button" 
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Réinitialiser
                    </button>
                </div>
            </form>
        </div>
    );
}