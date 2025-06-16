import React, { useState, useEffect } from 'react';
import './index.css';

//Rus

//БЕЗ ПОДСКАЗОК:
//Создайте интерфейс для конвертации валют с загрузкой данных валют из API Frankfurter в state, динамическим отображением options в select, обработкой выбранных валют, ввода суммы, расчётом конвертации через асинхронную функцию с try/catch/finally, отображением результата в UI, проверкой, что сумма больше 0, и состояниями для загрузки и ошибок.

//C ПОДСКАЗКАМИ:
/*
// 1 - Получите массив всех валют из API Frankfurter и запишите его в state.
// 2 - Используя map, динамически создайте options внутри select.
// 3 - Получите значения выбранных валют из обоих select и запишите их в state fromCurrency и toCurrency.
// 4 - Создайте state для записи amount из input. Запишите данные из input в этот state.
// 5 - Создайте вторую асинхронную функцию для получения значения конвертации двух валют. Запишите результат конвертации в новый state - convertedAmount. Покажите результат в интерфейсе.
// 6 - Добавьте в обе функции блоки try/catch/finally. Создайте state для loading (true/false) и error ("Сообщение ошибки").
// 7 - Внедрите логику отображения загрузки и ошибок в интерфейсе.
// 8 - Добавьте проверку, чтобы amount был больше 0.
*/
// /https://api.frankfurter.dev/v1/latest?symbols=CHF,GBP

const API_URL = 'https://api.frankfurter.app/';

function App() {
  const [currenceis, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllCurrency() {
      try {
        const res = await fetch(`${API_URL}latest`);
        const data = await res.json();
        setCurrencies(Object.keys(data.rates));
      } catch (err) {
        setError(`OMG, you have error: ${err}`);
      }
    }
    getAllCurrency();
  }, []);

  async function handleConvert() {
    if (!amount || amount <= 0) {
      setError('Amount must be more then 0');
      return;
    }

    setError(null);

    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
      );
      const data = await res.json();
      console.log(data);
      setConvertedAmount(data.rates[toCurrency]);
    } catch (err) {
      setError(`You have erorr: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setConvertedAmount(null);
  }, [amount, fromCurrency, toCurrency]);
  

  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
            className="input-field"
          />
          <select
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value)}
            className="dropdown"
          >
            {currenceis.map(currency => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="arrow">→</span>
          <select
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value)}
            className="dropdown"
          >
            {currenceis.map(currency => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>
        {isLoading && <p className="loading">Converting...</p>}
        {convertedAmount !== null && !isLoading && (
          <p className="result">
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
