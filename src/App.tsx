import { useState } from "react";
import "./index.css";

import { friendType } from "./type";
import { initialFriends } from "./initialFriends";

import Button from "./Button";
import SplitBill from "./SplitBill";
import FriendsList from "./FriendList";
import AddFriend from "./AddFriend";

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
