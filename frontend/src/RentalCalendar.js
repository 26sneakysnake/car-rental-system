import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function RentalCalendar({ rentals }) {
    // Transformer les locations en événements pour le calendrier
    const events = rentals.map(rental => ({
        title: `${rental.car.brand} ${rental.car.model} - ${rental.customer.lastName}`,
        start: rental.startDate,
        end: rental.endDate,
        backgroundColor: rental.status === 'IN_PROGRESS' ? '#2563eb' : '#9ca3af'
    }));

    return (
        <div className="mt-4">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
                locale="fr"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek'
                }}
            />
        </div>
    );
}