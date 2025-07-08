import React from "react";
import { X, AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ open, onClose, onConfirm, onloading, title = "Are you sure?", message = "This action cannot be undone." }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-96 max-w-[90%] p-6 space-y-4 animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-600">{message}</p>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={()=>{
              onConfirm();
              onClose();
            }} 
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
          >
           {onloading ? "Loading..." : " Yes, Confirm" }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
