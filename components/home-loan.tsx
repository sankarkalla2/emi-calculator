"use client";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleEntry {
  totalPrincipalPaid: number;
  totalInterestPaid: number;
  totalPayment: number;
  balance: number;
  loanPaidPercentage: number;
}

interface YearlyScheduleEntry extends ScheduleEntry {
  year: number;
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Percent, Printer, Share2, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { FaCar } from "react-icons/fa";

import { Doughnut, Chart as ChartJSComponent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartOptions,
} from "chart.js";
import { cn } from "@/lib/utils";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

interface HomeLoanProps {
  loanType: "Personal Loan" | "Home Loan" | "Vechile Loan";
}
const Homeloan = ({ loanType }: HomeLoanProps) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Loan calculator",
  });
  const [pricipleAmount, setPrinipleAmount] = useState("500000");
  const [interest, setInterest] = useState("9");
  const [tenture, setTenture] = useState("10");
  const [tentureType, setTentureType] = useState<"Yr" | "Mo">("Yr");
  const [emi, setEmi] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalAmount, setTotalAmout] = useState("");
  const [emiSchedule, setEmiSchedule] = useState<YearlyScheduleEntry[]>([]);

  const color =
    loanType === "Home Loan"
      ? "#6200ea"
      : loanType === "Personal Loan"
      ? "#ff3d00"
      : "#00695c";
  const data = {
    labels: ["Principal", "Total Interest"],
    datasets: [
      {
        label: "Amount in Rs",
        data: [parseFloat(pricipleAmount as string) || 0, totalInterest || 0],
        backgroundColor: ["#42A5F5", "#FFA726"],
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Ensure the position is one of the allowed string literals
      },
      title: {
        display: true,
        text: "Loan Breakdown",
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000, // Duration of the animation in milliseconds
      easing: "easeInOutBounce", // Easing function for the animation
    },
  };

  // Bar and line chart data for EMI schedule
  const barData = {
    labels: emiSchedule.map((schedule) => schedule.year.toString()),
    datasets: [
      {
        type: "bar" as const,
        label: "Total Principal Paid",
        backgroundColor: "#42A5F5",
        data: emiSchedule.map((schedule) => schedule.totalPrincipalPaid),
        stack: "combined",
      },
      {
        type: "bar" as const,
        label: "Total Interest Paid",
        backgroundColor: "#FFA726",
        data: emiSchedule.map((schedule) => schedule.totalInterestPaid),
        stack: "combined",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "EMI Schedule",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Amount (INR)",
        },
      },
    },
  };

  useEffect(() => {
    //calculate loan amount

    const P = parseFloat(pricipleAmount);
    const annulRate = parseFloat(interest);
    const n = tentureType === "Yr" ? parseInt(tenture) * 12 : parseInt(tenture);

    if (isNaN(P) || isNaN(annulRate) || isNaN(n)) {
      alert("please enter valid details");
      return;
    }

    const r = annulRate / (12 * 100); // Convert annual rate to monthly and percentage to decimal

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(emiValue.toFixed(2));

    const totalAmountPayable = emiValue * n;
    setTotalAmout(totalAmountPayable.toString());

    const totalInterestPayable = totalAmountPayable - P;
    setTotalInterest(totalInterestPayable.toFixed(2));

    // Calculate EMI schedule starting from current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // June is month 5 (0-indexed)
    const currentYear = currentDate.getFullYear();

    let remainingPrincipal = P;
    const yearlySchedule: Record<number, ScheduleEntry> = {};

    for (let i = 0; i < n; i++) {
      const interestForMonth = remainingPrincipal * r;
      const principalForMonth = emiValue - interestForMonth;
      remainingPrincipal -= principalForMonth;

      const year = currentYear + Math.floor((currentMonth + i) / 12);

      if (!yearlySchedule[year]) {
        yearlySchedule[year] = {
          totalPrincipalPaid: 0,
          totalInterestPaid: 0,
          totalPayment: 0,
          balance: 0,
          loanPaidPercentage: 0,
        };
      }

      yearlySchedule[year].totalPrincipalPaid += principalForMonth;
      yearlySchedule[year].totalInterestPaid += interestForMonth;
      yearlySchedule[year].totalPayment += emiValue;
      yearlySchedule[year].balance = remainingPrincipal;
      yearlySchedule[year].loanPaidPercentage =
        ((P - remainingPrincipal) / P) * 100;
    }

    const schedule: YearlyScheduleEntry[] = Object.keys(yearlySchedule).map(
      (year) => ({
        year: parseInt(year),
        ...yearlySchedule[parseInt(year)],
      })
    );

    setEmiSchedule(schedule);
  }, [pricipleAmount, interest, tenture]);
  return (
    <div>
      <Card className="lg:grid lg:grid-cols-10 flex flex-col">
        <div className="col-span-6">
          <CardHeader className="gap-0 py-0 pt-5">
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-sm text-muted-foreground pb-0">
                {loanType}
              </p>
              <div
                className={cn(`border-b-2 flex items-center text-[${color}]`)}
              >
                <span>
                  <BiRupee className="h-5 w-5 mr-0" />
                </span>
                <Input
                  className="w-[150px]  font-semibold outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                  type="number"
                  min={5000}
                  defaultValue={50000}
                  placeholder="Enter Your Loan"
                  value={pricipleAmount}
                  onChange={(e) => {
                    setPrinipleAmount(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pt-0">
              <input
                type="range"
                min="0"
                max="20000000"
                value={pricipleAmount}
                onChange={(e) => {
                  setPrinipleAmount(e.target.value);
                }}
                className="h-1 w-full"
              />
            </div>
          </CardHeader>
          <CardHeader className="gap-0 py-3">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground font-semibold">
                Interest Rate
              </p>
              <div
                className={`flex items-center text-[${color}] font-semibold`}
              >
                <span>
                  <Percent className="h-5 w-5 mr-0" />
                </span>
                <Input
                  className="w-[70px] border-0 border-b-2 py-0  outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-xs"
                  type="number"
                  min={1}
                  defaultValue={interest}
                  value={interest}
                  placeholder="Enter"
                  onChange={(e) => {
                    setInterest(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="">
              <input
                type="range"
                min="0"
                max="20"
                className="h-1 w-full"
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
              />
            </div>
          </CardHeader>
          <CardHeader className="py-0">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                Loan Tenture
              </p>
              <div
                className={`flex items-center text-[${color}] font-semibold`}
              >
                <div className="w-[90px]">
                  <Select
                    defaultValue="years"
                    onValueChange={(e: "years" | "months") => {
                      if (tentureType === "Yr" && e === "months") {
                        setTenture(
                          (Number(tenture) * 12).toFixed(1).toString()
                        );
                        setTentureType("Mo");
                      } else if (tentureType == "Mo" && e === "years") {
                        setTenture(
                          (Number(tenture) / 12).toFixed(10).toString()
                        );
                        setTentureType("Yr");
                      }
                    }}
                  >
                    <SelectTrigger className="text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="years">Years</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  className="w-[100px] border-0 border-b-2 py-0  outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-xs"
                  type="number"
                  min={1}
                  defaultValue={tenture}
                  value={tenture}
                  placeholder="Enter Tenture"
                  onChange={(e) => {
                    setTenture(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="">
              <input
                type="range"
                min="0"
                max={tentureType == "Yr" ? "30" : "360"}
                className="h-1 w-full"
                onChange={(e) => {
                  setTenture(e.target.value);
                }}
                value={tenture}
              />
            </div>
          </CardHeader>

          <div className="pt-7 p-5 flex justify-between text-3xl">
            <div className="font-bold">EMI</div>
            <div className={`text-[${color}] font-bold flex items-center`}>
              <BiRupee />
              {emi}
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal col-span-0"></div>
        <div className="md:col-span-2">
          <CardHeader className="flex items-center justify-center">
            <div className="sm:w-full lg:w-[300px]">
              <Doughnut data={data} options={options} />
              <div>
                <div className="px-10 text-xs pt-2 flex items gap-x-5 font-medium justify-center items-center">
                  <div className="flex flex-row items-center gap-x-1">
                    <div className="h-3 w-3 rounded-full border-1 bg-[#42A5F5]"></div>
                    <div className="text-muted-foreground">
                      Principle Amount
                    </div>
                  </div>
                  <span className="text-sm font-semibold">
                    {pricipleAmount}
                  </span>
                </div>

                <div className="px-10 text-xs pt-2 flex items gap-x-5 font-medium justify-center items-center">
                  <div className="flex flex-row items-center gap-x-1">
                    <div className="h-3 w-3 rounded-full border-1 bg-[#FFA726]"></div>
                    <div className="text-muted-foreground">Total Interest</div>
                  </div>
                  <span className="text-sm font-semibold">{totalInterest}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </div>
      </Card>
      <Card className="overflow-x-auto mt-10">
        <div ref={componentRef}>
          <div className="mt-6">
            <ChartJSComponent type="bar" data={barData} options={barOptions} />
          </div>
          <table className="min-w-full table table-xs p-2 mt-10">
            <thead className=" text-muted-foreground">
              <tr className="text-center">
                <th className="py-3">Year</th>
                <th className="py-3">Priciple Piad</th>
                <th className="py-3">Interest Paid</th>
                <th className="py-3">Total Payment</th>
                <th className="py-3">Balance</th>
                <th className="py-3">Loan Paid</th>
              </tr>
            </thead>
            <tbody>
              {emiSchedule.map((schedule) => (
                <tr key={schedule.year}>
                  <td className="py-2 px-4 border-b text-center">
                    {schedule.year}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {schedule.totalPrincipalPaid.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {schedule.totalInterestPaid.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {schedule.totalPayment.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {schedule.balance.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {schedule.loanPaidPercentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex w-full items-center justify-center gap-x-3">
          <Button
            className=""
            variant={"print_home_table"}
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Homeloan;
