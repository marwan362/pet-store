import { useState } from "react";
import { Pet } from "../api/petstore";

interface PetFormProps {
  pet: Pet;
  onSubmit: (updatedPet: Pet) => void;
  onCancel: () => void;
}

const PetForm = ({ pet, onSubmit, onCancel }: PetFormProps) => {
  const [formData, setFormData] = useState<Pet>({ ...pet });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Pet Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {formData.category && (
          <div>
            <label
              htmlFor="category.name"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              name="category.name"
              id="category.name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.category.name || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  category: {
                    id: prev.category?.id || 0,
                    name: e.target.value,
                  },
                }));
              }}
            />
          </div>
        )}

        {formData.tags && formData.tags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mt-1 space-y-2">
              {formData.tags.map((tag, index) => (
                <input
                  key={index}
                  type="text"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={tag.name || ""}
                  onChange={(e) => {
                    const newTags = [...formData.tags!];
                    newTags[index] = {
                      ...newTags[index],
                      name: e.target.value,
                    };
                    setFormData((prev) => ({
                      ...prev,
                      tags: newTags,
                    }));
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default PetForm;
