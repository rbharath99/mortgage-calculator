import { describe, it, expect } from 'vitest';

function calculateMortgage(loanAmount: number, interestRate: number, loanTerm: number) {
    const monthlyInterestRate = interestRate / 100 / 12;
    const loanTermInMonths = loanTerm * 12;
    const monthlyPaymentAmount =
        (loanAmount * monthlyInterestRate) /
        (1 -
            1 /
            Math.pow(
                1 + monthlyInterestRate,
                loanTermInMonths,
            ));
    const totalPaymentAmount = monthlyPaymentAmount * loanTermInMonths;
    const totalInterest = totalPaymentAmount - loanAmount;
    return { monthlyPaymentAmount, totalPaymentAmount, totalInterest };
}

describe('Loan Calculator', () => {
    it('should correctly calculate monthly and total payments', () => {
        const loanAmount = 100000;
        const interestRate = 3;
        const loanTerm = 30;

        const { monthlyPaymentAmount, totalPaymentAmount, totalInterest } = calculateMortgage(loanAmount, interestRate, loanTerm);

        expect(monthlyPaymentAmount).toBeCloseTo(421.60, 2);
        expect(totalPaymentAmount).toBeCloseTo(151777.45, 2);
        expect(totalInterest).toBeCloseTo(51777.45, 2);
    });
});