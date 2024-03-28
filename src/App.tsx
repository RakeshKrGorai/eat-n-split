import { useState } from "react";
import "./index.css";
import { friendType } from "./type";

const initialFriends = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, Click }: { children: string; Click: () => void }) {
  return (
    <button className="button" onClick={Click}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleShowAddFriend() {
    setOpenAddFriend((show) => !show);
  }

  function handleAddFriend(friend: friendType) {
    setFriends((friends) => [...friends, friend]);
    setSelected(null);
    setOpenAddFriend(false);
  }

  function handleSelection(friend) {
    setSelected((cur) => (cur?.id === friend.id ? null : friend));
    setOpenAddFriend(false);
  }

  function handleSplitBill(value: number) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selected.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelected(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          isSelected={selected}
        />
        {openAddFriend && <AddFriend onAddFriend={handleAddFriend} />}
        <Button Click={handleShowAddFriend}>
          {openAddFriend === false ? `Add Friend` : `Close`}
        </Button>
      </div>
      {selected && (
        <SplitBill selected={selected} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

function FriendsList({
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

function Friends({
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

function AddFriend({
  onAddFriend,
}: {
  onAddFriend: (friend: friendType) => void;
}) {
  function handleAdd() {
    console.log("Hi from Add friend");
  }
  console.log("Hi");

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🌄 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button Click={handleAdd}>Add</Button>
    </form>
  );
}

function SplitBill({
  selected,
  onSplitBill,
}: {
  selected: friendType;
  onSplitBill: (value: number) => void;
}) {
  function handleSplit() {
    console.log("hey from split bill");
  }

  const [bill, setBill] = useState("");
  const [userBill, setUserBill] = useState("");
  const [isPaying, setIsPaying] = useState("user");
  const friendBill = Number(bill) - Number(userBill);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!bill || !userBill) return;
    onSplitBill(isPaying === "user" ? friendBill : -userBill);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selected.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      ></input>
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={userBill}
        onChange={(e) => setUserBill(e.target.value)}
      ></input>
      <label>👫 {selected.name}'s expense</label>
      <input type="text" disabled value={friendBill}></input>
      <label>🤑 Who is paying the bill</label>
      <select value={isPaying} onChange={(e) => setIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selected.name}</option>
      </select>
      <Button Click={handleSplit}>Split Bill</Button>
    </form>
  );
}
