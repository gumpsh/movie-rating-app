import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!amount || isNaN(amount)) return;

      async function callAPI() {
        try {
          setIsLoading(true);
          // add: "proxy": "https://api.frankfurter.app" to package.json for this to work
          const response = await fetch(`/latest?amount=${Number(amount)}&from=${fromCurrency}&to=${toCurrency}`);

          const data = await response.json();
          setOutput(data.rates[toCurrency]);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      }

      if (fromCurrency === toCurrency) return setOutput(amount);
      callAPI();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fromCurrency, toCurrency, amount]);

  function handleInput(e) {
    setAmount(e.target.value);
  }

  return (
    <div>
      <input type="text" value={amount} onChange={handleInput} disabled={loading} />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {toCurrency}
      </p>
    </div>
  );
}
