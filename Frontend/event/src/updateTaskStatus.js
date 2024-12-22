
import React from 'react';
import axios from 'axios';

const UpdateTaskStatus = ({ taskId, currentStatus, onStatusUpdated }) => {
    const handleUpdate = async () => {
        console.log('Button clicked to update status'); 
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        try {
          const response = await axios.patch(
            `http://localhost:5000/api/tasks/${taskId}/status`,
            { status: newStatus }
          );
          console.log('Task updated:', response.data);
          onStatusUpdated();
        } catch (error) {
          console.error('Error updating task status:', error);
        }
      };
       

  return (
    <button onClick={handleUpdate}>
      Mark as {currentStatus === 'Pending' ? 'Completed' : 'Pending'}
    </button>
  );
};

export default UpdateTaskStatus;
