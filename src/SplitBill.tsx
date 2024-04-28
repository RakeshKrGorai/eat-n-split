import { useState } from "react";
import { friendType } from "./type";
import Button from "./Button";

export default function SplitBill({
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
