import React, { useState } from 'react';

export default function CustomerForm() {
    const initialState = {
        firstName: '',
        lastName: '',
        licenseNumber: '',
        licenseExpiryDate: '',
        dateOfBirth: ''
    };

    const [newCustomer, setNewCustomer] = useState(initialState);

    const handleReset = () => {
        setNewCustomer(initialState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer)
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            setNewCustomer(initialState);
            alert('Client ajouté avec succès !');
        } catch (error) {
            alert('Erreur : ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Enregistrer un nouveau client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Prénom</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newCustomer.firstName}
                        onChange={(e) => setNewCustomer({...newCustomer, firstName: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Nom</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newCustomer.lastName}
                        onChange={(e) => setNewCustomer({...newCustomer, lastName: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Date de naissance</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newCustomer.dateOfBirth}
                        onChange={(e) => setNewCustomer({...newCustomer, dateOfBirth: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Numéro de permis</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newCustomer.licenseNumber}
                        onChange={(e) => setNewCustomer({...newCustomer, licenseNumber: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Date d'expiration du permis</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newCustomer.licenseExpiryDate}
                        onChange={(e) => setNewCustomer({...newCustomer, licenseExpiryDate: e.target.value})}
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Enregistrer le client
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