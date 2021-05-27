import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coins from "./Coins";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSearch = coins.filter((coins) =>
    coins.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            placeholder="Search"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredSearch.map((coins) => {
        return (
          <Coins
            key={coins.id}
            name={coins.name}
            image={coins.image}
            symbol={coins.symbol}
            marketCap={coins.market_cap}
            price={coins.current_price}
            priceChange={coins.price_change_percentage_24h}
            volume={coins.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
