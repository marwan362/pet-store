import { Pet } from "../api/petstore";

interface PetCardProps {
  pet: Pet;
  onClick: () => void;
}

const PetCard = ({ pet, onClick }: PetCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      {pet.photoUrls && pet.photoUrls.length > 0 ? (
        <img
          src={pet.photoUrls[0]}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {pet.name || "Unnamed Pet"}
          </h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              pet.status === "available"
                ? "bg-green-100 text-green-800"
                : pet.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {pet.status}
          </span>
        </div>
        {pet.category && (
          <p className="text-sm text-gray-600 mt-1">
            Category: {pet.category.name}
          </p>
        )}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-500">ID: {pet.id}</span>
          <button
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
