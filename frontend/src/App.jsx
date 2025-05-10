import { useState } from "react";

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const deploy = async (chain) => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(`http://localhost:8000/deploy/${chain}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.address) {
        setResult(`✅ Contract deployed on ${chain}: ${data.address}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setResult(`❌ Network error`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Universal Smart Contract Deployer</h1>

        <div className="space-y-4">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            onClick={() => deploy("ethereum")}
            disabled={loading}
          >
            🚀 Deploy to Ethereum
          </button>
          <button
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
            onClick={() => deploy("polygon")}
            disabled={loading}
          >
            🌐 Deploy to Polygon
          </button>
        </div>

        {loading && <p className="mt-6 text-sm text-gray-500">Deploying contract...</p>}
        {result && <p className="mt-4 text-green-600 font-mono">{result}</p>}
      </div>
    </div>
  );
}

export default App;
