import React from 'react'

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">{content}</p>

      <div className="flex justify-end gap-3">
        
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
