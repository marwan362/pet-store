import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById, updatePet, Pet } from "../api/petstore";
import PetForm from "../components/PetForm";

const PetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchPet = useCallback(async () => {
    if (!id) {
      setError("No pet ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(""); // Reset error state before new fetch
      const data = await getPetById(parseInt(id));
      setPet(data);
    } catch (err) {
      setError("Failed to fetch pet details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  const handleUpdate = useCallback(async (updatedPet: Pet) => {
    try {
      setLoading(true);
      setError(""); // Reset error state before update
      const data = await updatePet(updatedPet);
      setPet(data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update pet");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back to list
      </button>

      <div className="bg-white shadow-md rounded-lg p-6">
        {isEditing ? (
          <PetForm
            pet={pet}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
          />
        ) : (
          <PetDetails pet={pet} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

interface PetDetailsProps {
  pet: Pet;
  onEdit: () => void;
}

const PetDetails = ({ pet, onEdit }: PetDetailsProps) => (
  <>
    <div className="flex justify-between items-start mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Edit
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">ID:</span> {pet.id}
          </p>
          <p>
            <span className="font-medium">Status:</span> {pet.status}
          </p>
          {pet.category && (
            <p>
              <span className="font-medium">Category:</span> {pet.category.name}
            </p>
          )}
          {pet.tags && pet.tags.length > 0 && (
            <p>
              <span className="font-medium">Tags:</span>{" "}
              {pet.tags.map((tag) => tag.name).join(", ")}
            </p>
          )}
        </div>
      </div>

      {pet.photoUrls && pet.photoUrls.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Photos</h3>
          <div className="grid grid-cols-2 gap-2">
            {pet.photoUrls.map((url, index) => (
              <img
                key={url} // Using URL as key instead of index
                src={url}
                alt={`${pet.name} - Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  </>
);

export default PetDetailPage;
