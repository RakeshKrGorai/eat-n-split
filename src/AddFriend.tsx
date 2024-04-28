import { useState } from "react";
import { friendType } from "./type";
import Button from "./Button";

export default function AddFriend({
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
