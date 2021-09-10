import "./App.css";
import { useState } from "react";

function App() {
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthYear, setBirthYear] = useState(1995);
  const [lifeExpectancy, setLifeExpectancy] = useState(100);
  const [monthlyIncome, setMonthlyIncome] = useState(125000);
  const [savingsToInvestment, setSavingsToInvestment] = useState(25000);
  const [annualHike, setAnnualHike] = useState(6);
  const [investments, setInvestments] = useState(100000);
  const [returns, setReturns] = useState(10);
  const [monthlyExpense, setMonthlyExpense] = useState(30000);
  const [annualInflation, setAnnualInflation] = useState(4);

  const getMonthCount = () => {
    let currentDate = new Date();
    return (
      (parseInt(birthYear) +
        parseInt(lifeExpectancy) -
        currentDate.getFullYear()) *
        12 +
      (parseInt(birthMonth) - currentDate.getMonth() - 1)
    );
  };

  const calculate = function () {
    let data = [];
    let monthCount = getMonthCount();
    let curInvestment = parseInt(investments);
    let curMonthlyIncome = parseInt(monthlyIncome);
    let curMonthlyExpense = parseInt(monthlyExpense);
    let yearsWorked = 0;
    for (let i = 0; i < monthCount; i++) {
      let curExpense =
        monthlyExpense *
        Math.pow(1 + annualInflation / 100, Math.floor(i / 12));
      data[i] = {
        ...data[i],
        expense: curExpense,
      };
    }
    for (let i = monthCount - 1; i >= 0; i--) {
      let investmentNeeded =
        curMonthlyExpense /
        Math.pow(1 + returns / 100, Math.floor(i / 12) - yearsWorked);
      curInvestment -= investmentNeeded;
      while (curInvestment < 0) {
        // work for one year
        curInvestment =
          curInvestment * (1 + returns / 100) + curMonthlyIncome * 12;
        curMonthlyIncome = curMonthlyIncome * (1 + annualHike / 100);
        curMonthlyExpense = curMonthlyExpense * (1 + annualInflation / 100);
        yearsWorked++;
      }
    }
    console.log(`You can work for ${yearsWorked}`);
  };
  return (
    <>
      <div>
        <label>Birth Month</label>
        <input
          value={birthMonth}
          onChange={(e) => {
            setBirthMonth(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Birth Year</label>
        <input
          value={birthYear}
          onChange={(e) => {
            setBirthYear(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Life Expectancy</label>
        <input
          value={lifeExpectancy}
          onChange={(e) => {
            setLifeExpectancy(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Monthly Income</label>
        <input
          value={monthlyIncome}
          onChange={(e) => {
            setMonthlyIncome(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Savings from Salary</label>
        <input
          value={savingsToInvestment}
          onChange={(e) => {
            setSavingsToInvestment(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Expected Annual Hike</label>
        <input
          value={annualHike}
          onChange={(e) => {
            setAnnualHike(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Investments</label>
        <input
          value={investments}
          onChange={(e) => {
            setInvestments(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Returns on investments</label>
        <input
          value={returns}
          onChange={(e) => {
            setReturns(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Monthly Expense</label>
        <input
          value={monthlyExpense}
          onChange={(e) => {
            setMonthlyExpense(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Annual Inflation</label>
        <input
          value={annualInflation}
          onChange={(e) => {
            setAnnualInflation(e.target.value);
          }}
        />
      </div>
      <button onClick={calculate}>Calculate</button>
      <div>
        <h4>Months Remaining</h4>
      </div>
    </>
  );
}

export default App;
