import React, { useState } from 'react';
import agentValidate from '../validation/agentValidation';
import useAgentStore from '../zustand/agentStore';

const AddAgentForm = ({ setIsModalOpen }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const {createNewAgent} = useAgentStore()
  const handleAddAgent = async(e) => {
    e.preventDefault();
    try {
      const err = agentValidate(form);
        console.log(err);
      
      if (Object.keys(err).length > 0) {
          setErrors(err);
          return;
        }
        console.log(err);
      await createNewAgent(form)
      setForm({ name: "", email: "", mobile: "", password: "" });
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      setErrors(error.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex justify-center items-center z-50 p-4">
      <form
        onSubmit={handleAddAgent}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 sm:p-8 mx-2 sm:mx-0"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-indigo-700 text-center">
          Add New Agent
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              autoComplete="off"
              placeholder="Enter agent name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              autoComplete="off"
              placeholder="agent@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="mobile">
              Mobile (with country code)
            </label>
            <input
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
              type="tel"
              placeholder="+1234567890"
              autoComplete="off"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setErrors({});
                setForm({ name: "", email: "", mobile: "", password: "" });
              }}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition w-full sm:w-auto"
            >
              Add Agent
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAgentForm;
