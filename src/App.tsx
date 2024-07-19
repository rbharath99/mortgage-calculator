import { useState } from 'react'
import './App.css'

function App() {
  const [monthlyPayment, setMonthlyPayment] = useState<string>('')
  const [totalPayment, setTotalPayment] = useState<string>('')
  const [totalInterest, setTotalInterest] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement)

    const loanAmountValue = data.get('loan-amount')
    const loanAmount: number = loanAmountValue ? parseFloat(loanAmountValue.toString()) : NaN;

    const interestRateValue = data.get('interest-rate');
    const monthlyInterestRate: number = interestRateValue ? parseFloat(interestRateValue.toString()) / 100 / 12 : NaN;

    const loanTermValue = data.get('loan-term');
    const loanTermInMonths: number = loanTermValue ? parseFloat(loanTermValue.toString()) * 12 : NaN;

    const monthlyPaymentAmount: number =
      (loanAmount * monthlyInterestRate) /
      (1 -
        1 /
        Math.pow(
          1 + monthlyInterestRate,
          loanTermInMonths,
        ));

    const totalPaymentAmount: number = monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD'
      }
    )

    setMonthlyPayment(currencyFormatter.format(monthlyPaymentAmount))
    setTotalPayment(currencyFormatter.format(totalPaymentAmount))
    setTotalInterest(currencyFormatter.format(totalPaymentAmount - loanAmount))
  }

  return (
    <>
      <div className='mortgaga-calculator'>
        <form onSubmit={(e) => handleSubmit(e)} className='mortgage-calculator-form'>
          <label>Loan Amount:{' '}
            <input
              type="number"
              name="loan-amount"
              defaultValue="100000"
              min="1"
              required
            />
          </label>
          <label>Loan Term (years):{' '}
            <input
              type="number"
              name="loan-term"
              defaultValue="30"
              min="1"
              required
            />
          </label>
          <label>Loan Interest Rate (%):{' '}
            <input
              type="number"
              name="interest-rate"
              defaultValue="3"
              step="0.01"
              min="0.01"
              required
            />
          </label>
          <div>
            <button type="submit">Calculate</button>
          </div>
        </form>
        <div
          aria-live="polite"
          className="mortgage-calculator-results">
          <div>
            Monthly Payment Amount:{' '}
            <strong>{monthlyPayment}</strong>
          </div>
          <div>
            Total Payment Amount:{' '}
            <strong>{totalPayment}</strong>
          </div>
          <div>
            Total Interest Paid:{' '}
            <strong>{totalInterest}</strong>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
