import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function DashboardView() {
    const [activeTab, setActiveTab] = useState('rentals');
    const [rentals, setRentals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [rentalsRes, customersRes, carsRes] = await Promise.all([
                fetch('http://localhost:8080/api/rentals'),
                fetch('http://localhost:8080/api/customers'),
                fetch('http://localhost:8080/api/cars')
            ]);
            const [rentalsData, customersData, carsData] = await Promise.all([
                rentalsRes.json(),
                customersRes.json(),
                carsRes.json()
            ]);
            setRentals(rentalsData);
            setCustomers(customersData);
            setCars(carsData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteCar = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            try {
                await fetch(`http://localhost:8080/api/cars/${id}`, {
                    method: 'DELETE'
                });
                fetchData();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const deleteCustomer = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            try {
                await fetch(`http://localhost:8080/api/customers/${id}`, {
                    method: 'DELETE'
                });
                fetchData();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const deleteRental = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette location ?')) {
            try {
                await fetch(`http://localhost:8080/api/rentals/${id}`, {
                    method: 'DELETE'
                });
                fetchData();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            <div className="flex border-b">
            <button
                className={`flex-1 py-3 ${activeTab === 'rentals' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(activeTab === 'rentals' ? null : 'rentals')}
            >
                Locations
            </button>
            <button
                className={`flex-1 py-3 ${activeTab === 'customers' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(activeTab === 'customers' ? null : 'customers')}
            >
                Clients
            </button>
            <button
                className={`flex-1 py-3 ${activeTab === 'cars' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(activeTab === 'cars' ? null : 'cars')}
            >
                Voitures
            </button>
            <button
                className={`flex-1 py-3 ${activeTab === 'calendar' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(activeTab === 'calendar' ? null : 'calendar')}
            >
                Calendrier
            </button>
            </div>

            <div className="p-6">
                {activeTab === 'rentals' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Locations en cours</h2>
                        {rentals.map(rental => (
                            <div key={rental.id} className="border rounded-lg p-4 hover:shadow-md relative">
                                <button 
                                    onClick={() => deleteRental(rental.id)}
                                    className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <span className="text-gray-600">Client:</span>
                                        <p className="font-semibold">{rental.customer.firstName} {rental.customer.lastName}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Véhicule:</span>
                                        <p className="font-semibold">{rental.car.brand} {rental.car.model}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Période:</span>
                                        <p className="font-semibold">{rental.startDate} au {rental.endDate}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Total:</span>
                                        <p className="font-semibold text-green-600">{rental.totalPrice}€</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'customers' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Liste des clients</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {customers.map(customer => (
                                <div key={customer.id} className="border rounded-lg p-4 relative">
                                    <button 
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                    <h3 className="font-semibold">{customer.firstName} {customer.lastName}</h3>
                                    <p>Permis: {customer.licenseNumber}</p>
                                    <p>Expiration: {customer.licenseExpiryDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'cars' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Liste des véhicules</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cars.map(car => (
                                <div key={car.id} className="border rounded-lg p-4 relative">
                                    <button 
                                        onClick={() => deleteCar(car.id)}
                                        className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                    <h3 className="font-semibold">{car.brand} {car.model}</h3>
                                    <p>Année: {car.year}</p>
                                    <p>Plaque: {car.licensePlate}</p>
                                    <p>Prix/jour: {car.dailyRate}€</p>
                                    <p className={car.available ? 'text-green-600' : 'text-red-600'}>
                                        {car.available ? 'Disponible' : 'Non disponible'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'calendar' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Calendrier des locations</h2>
                        <div className="mt-4">
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                events={rentals.map(rental => ({
                                    title: `${rental.car.brand} ${rental.car.model} - ${rental.customer.lastName}`,
                                    start: rental.startDate,
                                    end: rental.endDate,
                                    backgroundColor: rental.status === 'IN_PROGRESS' ? '#2563eb' : '#9ca3af'
                                }))}
                                height="auto"
                                locale="fr"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,dayGridWeek'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}