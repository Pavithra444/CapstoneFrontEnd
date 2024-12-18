import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

function TicketDownload({ ticketDetails }) {
  const ticketRef = useRef();

  const generateTicketImage = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      // Convert the canvas to an image (data URL)
      const imageUrl = canvas.toDataURL('image/png');
      
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'ticket.png'; // Set the download file name
      link.click(); // Trigger the download
    });
  };

  return (
    <div>
      {/* The styled ticket */}
      <div ref={ticketRef} style={ticketStyle}>
        <h2>Event Ticket</h2>
        <p><strong>Event Name:</strong> {ticketDetails.eventName}</p>
        <p><strong>Date:</strong> {ticketDetails.date}</p>
        <p><strong>Location:</strong> {ticketDetails.location}</p>
        <p><strong>Description:</strong> {ticketDetails.description}</p>
      </div>

      {/* Button to trigger image download */}
      <button onClick={generateTicketImage}>Download Ticket as Image</button>
    </div>
  );
}

// Basic ticket style for demonstration purposes
const ticketStyle = {
  width: '400px',
  padding: '20px',
  border: '2px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f0f0f0',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  textAlign: 'center',
};

export default TicketDownload;
