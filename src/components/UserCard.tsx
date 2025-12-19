import type { User } from "../types/User";

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
};

export function UserCard({ user, onClick }: UserCardProps) {
  const { name, username, email, address } = user;
  return (
    <div
      onClick={ () => onClick(user)}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">@{username}</p>
      </div>

      <div className="space-y-2 text-gray-600">
        <p className="flex items-center gap-2 text-sm">
          📧 <span className="hover:text-blue-600 hover:underline">{email}</span>
        </p>
        <p className="flex items-center gap-2 text-sm">
          🏙️ {address.city}
        </p>
      </div>
    </div>
  )
}