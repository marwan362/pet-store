import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getPetsByStatus } from "../api/petstore";
import { Pet } from "../api/petstore";
import PetCard from "../components/PetCard";
import SearchBar from "../components/SearchBar";

const PetListPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "available" | "pending" | "sold"
  >("available");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(""); // Reset error state before new fetch
      const data = await getPetsByStatus(statusFilter);
      setPets(data);
    } catch (err) {
      setError("Failed to fetch pets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const filteredPets = useMemo(
    () =>
      searchTerm
        ? pets.filter((pet) =>
            pet.name?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : pets,
    [pets, searchTerm]
  );

  const handlePetClick = useCallback(
    (id: number) => {
      navigate(`/pets/${id}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Petstore Dashboard
      </h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pets found matching your search.
          </div>
        ) : (
          filteredPets.map((pet, index) => (
            <PetCard
              key={`${pet.id}+${index}`}
              pet={pet}
              onClick={() => handlePetClick(pet.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PetListPage;
