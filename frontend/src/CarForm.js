import React, { useState } from 'react';

export default function CarForm() {
    const initialState = {
        brand: '',
        model: '',
        year: 2024,
        licensePlate: '',
        dailyRate: 0,
        available: true
    };

    const [newCar, setNewCar] = useState(initialState);

    const handleReset = () => {
        setNewCar(initialState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8080/api/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCar)
            });
            setNewCar(initialState);
            alert('Voiture ajoutée avec succès !');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle voiture</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Marque"
                        className="w-full p-2 border rounded"
                        value={newCar.brand}
                        onChange={(e) => setNewCar({...newCar, brand: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Modèle"
                        className="w-full p-2 border rounded"
                        value={newCar.model}
                        onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Année"
                        className="w-full p-2 border rounded"
                        value={newCar.year}
                        onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Plaque d'immatriculation"
                        className="w-full p-2 border rounded"
                        value={newCar.licensePlate}
                        onChange={(e) => setNewCar({...newCar, licensePlate: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Prix journalier"
                        className="w-full p-2 border rounded"
                        value={newCar.dailyRate}
                        onChange={(e) => setNewCar({...newCar, dailyRate: parseFloat(e.target.value)})}
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Ajouter la voiture
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