import { friendType } from "./type";
import Friends from "./Friends.tsx";

export default function FriendsList({
  friends,
  onSelection,
  isSelected,
}: {
  friends: friendType[];
  onSelection: (friend: friendType) => void;
  isSelected: friendType;
}) {
  return (
    <ul>
      {friends.map((friends: friendType) => (
        <Friends
          friend={friends}
          key={friends.id}
          onSelection={onSelection}
          isSelected={isSelected}
        />
      ))}
    </ul>
  );
}
