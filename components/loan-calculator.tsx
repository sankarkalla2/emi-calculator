"use client"
import { Home, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FaCar } from "react-icons/fa";
import Homeloan from "./home-loan";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Link from "next/link";
import ImportantLinks from "./important-links";
const EMIFORMULA = "E = P . r . (1 + r ) ^ n / ((1 + r)^n - 1 )";

const LoanCalculator = () => {
  return (
    <main>
      <section>
        <h1 className="text-2xl lg:text-3xl font-semibold pt-20 pb-10">
          Loan Calculator
        </h1>
        <Tabs defaultValue="home" className="space-y-5">
          <TabsList className="grid w-[450px] grid-cols-3">
            <TabsTrigger
              value="home"
              className="flex items-center justify-center sm:text-xs"
            >
              <Home className="h-5 w-5 mr-1 text-[#6200ea]" /> Home Loan
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center">
              <Users className="h-5 w-5 mr-1 text-[#ff3d00]" />
              Personal Loan
            </TabsTrigger>
            <TabsTrigger value="vechile" className="flex items-center">
              <FaCar className="text-[#00695c] w-5 h-5 mr-1" />
              Vechile Loan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="w-full">
            <Homeloan loanType="Home Loan" />
          </TabsContent>
          <TabsContent value="personal">
            <Homeloan loanType="Personal Loan" />
          </TabsContent>
          <TabsContent value="vechile">
            <Homeloan loanType="Vechile Loan" />
          </TabsContent>
        </Tabs>
      </section>
      <section>
        <div className="mt-10">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            What is EMI?
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Equated Monthly Installment - EMI for short - is the amount payable
            every month to the bank or any other financial institution until the
            loan amount is fully paid off. It consists of the interest on loan
            as well as part of the principal amount to be repaid. The sum of
            principal amount and interest is divided by the tenure, i.e., number
            of months, in which the loan has to be repaid. This amount has to be
            paid monthly. The interest component of the EMI would be larger
            during the initial months and gradually reduce with each payment.
            The exact percentage allocated towards payment of the principal
            depends on the interest rate. Even though your monthly EMI payment
            won't change, the proportion of principal and interest components
            will change with time. With each successive payment, you'll pay more
            towards the principal and less in interest.
          </p>
          <div className="mt-4">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Here&apos;s the formula to calculate EMI:
            </p>
            <h2 className="text-4xl">
              <div>
                <BlockMath math={EMIFORMULA} />
              </div>
            </h2>
            <div className="space-y-2 leading-7">
              <p>where</p>
              <p>
                <b>E</b> is EMI
              </p>
              <p>
                <b>r</b> is rate of interest calculated on monthly basis. (i.e.,
                r = Rate of Annual interest/12/100. If rate of interest is 10.5%
                per annum, then r = 10.5/12/100=0.00875)
              </p>
              <p>
                <b>n</b> is loan term / tenure / duration in number of months
              </p>
            </div>
          </div>

          <blockquote className="mt-6 border-l-2 pl-6 italic">
            For example, if you borrow ₹10,00,000 from the bank at 10.5% annual
            interest for a period of 10 years (i.e., 120 months), then EMI =
            ₹10,00,000 * 0.00875 * (1 + 0.00875)120 / ((1 + 0.00875)120 - 1) =
            ₹13,493. i.e., you will have to pay ₹13,493 for 120 months to repay
            the entire loan amount. The total amount payable will be ₹13,493 *
            120 = ₹16,19,220 that includes ₹6,19,220 as interest toward the
            loan.
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Computing EMI for different combinations of principal loan amount,
            interest rates and loan term using the above EMI formula by hand or
            MS Excel is time consuming, complex and error prone. Our EMI
            calculator automates this calculation for you and gives you the
            result in a split second along with visual charts displaying payment
            schedule and the break-up of total payment.
          </p>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            How to Use EMI Calculator?
          </h2>

          <p className="leading-7 [&:not(:first-child)]:mt-6">
            With colourful charts and instant results, our EMI Calculator is
            easy to use, intuitive to understand and is quick to perform. You
            can calculate EMI for home loan, car loan, personal loan, education
            loan or any other fully amortizing loan using this calculator.
          </p>
          <div className="mt-5">
            <p>Enter the following information in the EMI Calculator:</p>
            <ul className="my3 ml-6 list-disc [&>li]:mt-2">
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
            </ul>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Use the slider to adjust the values in the EMI calculator form. If
              you need to enter more precise values, you can type the values
              directly in the relevant boxes provided above. As soon as the
              values are changed using the slider (or hit the 'tab' key after
              entering the values directly in the input fields), EMI calculator
              will re-calculate your monthly payment (EMI) amount.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              A pie chart depicting the break-up of total payment (i.e., total
              principal vs. total interest payable) is also displayed. It
              displays the percentage of total interest versus principal amount
              in the sum total of all payments made against the loan. The
              payment schedule table showing payments made every month / year
              for the entire loan duration is displayed along with a chart
              showing interest and principal components paid each year. A
              portion of each payment is for the interest while the remaining
              amount is applied towards the principal balance. During initial
              loan period, a large portion of each payment is devoted to
              interest. With passage of time, larger portions pay down the
              principal. The payment schedule also shows the intermediate
              outstanding balance for each year which will be carried over to
              the next year.
            </p>
            <p>
              Want to make part prepayments to shorten your home loan schedule
              and reduce your total interest outgo? Use our{" "}
              <Link href={"#"} className="hover:underline text-blue-500">
                {" "}
                Home Loan EMI Calculator with Prepayments
              </Link>
              . If you wish to calculate how much loan you can afford OR
              determine advertised vs actual loan interest rate (along with loan
              APR) on a purchase, use our loan calculator.
            </p>
          </div>
          <div>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Floating Rate EMI Calculation
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We suggest that you calculate floating / variable rate EMI by
              taking into consideration two opposite scenarios, i.e., optimistic
              (deflationary) and pessimistic (inflationary) scenario. Loan
              amount and loan tenure, two components required to calculate the
              EMI are under your control; i.e., you are going to decide how much
              loan you have to borrow and how long your loan tenure should be.
              But interest rate is decided by the banks & HFCs based on rates
              and policies set by RBI. As a borrower, you should consider the
              two extreme possibilities of increase and decrease in the rate of
              interest and calculate your EMI under these two conditions. Such
              calculation will help you decide how much EMI is affordable, how
              long your loan tenure should be and how much you should borrow.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Optimistic (deflationary) scenario: Assume that the rate of
              interest comes down by 1% - 3% from the present rate. Consider
              this situation and calculate your EMI. In this situation, your EMI
              will come down or you may opt to shorten the loan tenure. Ex: If
              you avail home loan to purchase a house as an investment, then
              optimistic scenario enables you to compare this with other
              investment opportunities.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Pessimistic (inflationary) scenario: In the same way, assume that
              the rate of interest is hiked by 1% - 3%. Is it possible for you
              to continue to pay the EMI without much struggle? Even a 2%
              increase in rate of interest can result in significant rise in
              your monthly payment for the entire loan tenure.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Such calculation helps you to plan for such future possibilities.
              When you take a loan, you are making a financial commitment for
              next few months, years or decades. So consider the best as well as
              worst cases...and be ready for both. In short, hope for the best
              but be prepared for the worst!
            </p>
          </div>
          <div>
            <ImportantLinks />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoanCalculator;
