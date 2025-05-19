import { useState } from 'react';
import axionInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UploadTask = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axionInstance.post('/task/upload-tasks', formData);
      setMessage(res.data.message);
      navigate('/admin/dashboard'); // Redirect to dashboard after successful upload
    } catch (err) {
      setMessage(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          Distribute Tasks to Agents
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Upload a CSV  (.csv) containing a list of tasks. The system will validate the data and distribute it equally among the available agents.
        </p>

        <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
          <li><strong>Accepted formats:</strong> CSV</li>
          <li><strong>Required columns:</strong> FirstName, Phone, Notes</li>
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Task File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm   text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Upload & Distribute Tasks
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm font-medium text-green-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadTask;
