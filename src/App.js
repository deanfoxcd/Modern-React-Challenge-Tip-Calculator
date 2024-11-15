import { useState } from 'react';

export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}

const TipCalculator = () => {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  const handleReset = () => {
    setBill(0);
    setTip(0);
    setFriendTip(0);
  };

  return (
    <div className="App">
      <BillInput bill={bill} setBill={setBill} />
      <TipPercentage tip={tip} setTip={setTip}>
        How did you like the service?
      </TipPercentage>
      <TipPercentage tip={friendTip} setTip={setFriendTip}>
        How did your friend like the service?
      </TipPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} friendTip={friendTip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
};

const BillInput = ({ bill, setBill }) => {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
};

const TipPercentage = ({ tip, setTip, children }) => {
  const options = [
    { desc: 'Dissatisfied (0%)', value: 0 },
    { desc: 'It was okay (5%)', value: 0.05 },
    { desc: 'It was good (10%)', value: 0.1 },
    { desc: 'Absolutely amazing! (20%)', value: 0.2 },
  ];

  return (
    <div>
      <span>{children}</span>
      {/* The options could also have been done manually inside multiple option elements instead of an array */}
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        {options.map((option) => (
          <option key={option.desc} value={option.value}>
            {option.desc}
          </option>
        ))}
      </select>
    </div>
  );
};

const Output = ({ bill, tip, friendTip }) => {
  const totalTip = (tip + friendTip) / 2;
  const totalBill = bill + bill * totalTip;

  return (
    <h3>
      You pay ${bill === 0 ? 0 : totalBill.toFixed(2)} (${bill} + $
      {(bill * totalTip).toFixed(2)})
    </h3>
  );
};

const Reset = ({ onReset }) => {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
