import { friendType } from "./type";
import Button from "./Button";

export default function Friends({
  friend,
  onSelection,
  isSelected,
}: {
  friend: friendType;
  onSelection: (friend: friendType) => void;
  isSelected: friendType;
}) {
  const Selected = isSelected?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and your friend are even</p>}
      <Button Click={() => onSelection(friend)}>
        {Selected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
