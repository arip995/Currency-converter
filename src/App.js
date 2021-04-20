import React,{useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
const BASE_URL ='http://api.exchangeratesapi.io/v1/latest?access_key=a762bce2adcbfdd1d358b8083e9ebffd'


function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency ,setFromCurrency] = useState();
  const [toCurrency ,setToCurrency] = useState();
  const [exchangeRate ,setExchangeRate] = useState();
  const [amount ,setAmount] = useState(1);
  const [amountInFromCurrency ,setAmountInFromCurrency] = useState(true);
  let toAmount,fromAmount;
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount =amount*exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount/exchangeRate
  }
useEffect(() =>{
  fetch(BASE_URL)
  .then(res =>res.json())
  .then(data=>{
    const currency = Object.keys(data.rates)[1];
    const rateCurrency = Object.keys(data.rates)[0];
    setCurrencyOptions([data.base,...Object.keys(data.rates)]);
    setFromCurrency(rateCurrency);
    setToCurrency(currency);
    setExchangeRate(data.rates[rateCurrency]);
  })
},[])

useEffect(()=>{
  console.log("hii")
  if(fromCurrency!=null && toCurrency!=null){
    fetch(`${BASE_URL}&from=${fromCurrency}&to=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
      .catch(err => console.log(err))
    
  }
},[fromCurrency,toCurrency, fromAmount, toAmount])

function handleFromChangeAmount(e){
  setAmount(e.target.value);
  setAmountInFromCurrency(true);
}
function handleToChangeAmount(e){
  setAmount(e.target.value);
  setAmountInFromCurrency(false);
}

  return (
    <>
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      onChangeCurrency={e=> setFromCurrency(e.target.value)}
      amount={fromAmount}
      onChangeAmount={handleFromChangeAmount}

      />
      <div className="equals">
        =
      </div>
      <CurrencyRow
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e=> setToCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToChangeAmount}
      />
    </div>
    </>
  );
}

export default App;
