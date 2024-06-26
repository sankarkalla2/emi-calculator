"use client";
import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Percent, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { FaCar } from "react-icons/fa";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  AnimationOptions,
  ChartOptions,
  Plugin,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LoanCalculator = () => {
  const [pricipleAmount, setPrinipleAmount] = useState("500000");
  const [interest, setInterest] = useState("9");
  const [tenture, setTenture] = useState("10");
  const [tentureType, setTentureType] = useState<"Yr" | "Mo">("Yr");
  const [emi, setEmi] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalAmount, setTotalAmout] = useState("");
  const [emiSchedule, setEmiSchedule] = useState<
    Array<{
      year: number;
      principalPaid: number;
      interestPaid: number;
      totalPayment: number;
      balance: number;
      loanPaidPercentage: number;
    }>
  >([]);

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

  const textCenterPlugin: Plugin<"doughnut"> = {
    id: "textCenterPlugin",
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;

      ctx.save();
      ctx.font = "bold 12px Arial";

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `Total: ${parseFloat(totalAmount).toFixed(2)}`,
        width / 2,
        height / 2 + 30
      );

      ctx.restore();
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
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let remainingPrincipal = P;
    const schedule = [];
    for (let i = 0; i < n; i++) {
      const interestForMonth = remainingPrincipal * r;
      const principalForMonth = emiValue - interestForMonth;
      remainingPrincipal -= principalForMonth;

      const year = currentYear + Math.floor((currentMonth + i) / 12);
      const month = months[(currentMonth + i) % 12];

      const totalPaymentForMonth = interestForMonth + principalForMonth;
      const loanPaidPercentage = ((P - remainingPrincipal) / P) * 100;


      schedule.push({
        year,
        month,
        principalPaid: principalForMonth,
        interestPaid: interestForMonth,
        totalPayment: totalPaymentForMonth,
        balance: remainingPrincipal,
        loanPaidPercentage,
      });
    }
    setEmiSchedule(schedule);
  }, [pricipleAmount, interest, tenture]);

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
            <Card className="lg:grid lg:grid-cols-10 flex flex-col">
              <div className="col-span-6">
                <CardHeader className="gap-0 py-0 pt-5">
                  <div className="flex flex-row items-center justify-between">
                    <CardDescription className="text-sm font-semibold text-muted-foreground pb-0">
                      Home Loan Amout
                    </CardDescription>
                    <div className="border-b-2 flex items-center">
                      <span>
                        <BiRupee className="h-5 w-5 mr-0" />
                      </span>
                      <Input
                        className="w-[150px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
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
                    {/* <input type="range" min={0} max="100" value="40" className="range range-xs h-[0.3rem] [--range-shdw:blue]" />  */}
                  </div>
                </CardHeader>
                <CardHeader className="gap-0 py-3">
                  <div className="flex flex-row items-center justify-between">
                    <CardDescription className="text-sm text-muted-foreground font-bold">
                      Interest Rate
                    </CardDescription>
                    <div className=" flex items-center">
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
                    <CardDescription className="text-sm font-semibold text-muted-foreground">
                      Loan Tenture
                    </CardDescription>
                    <div className="flex items-center">
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
                  <div className="text-[#6200ea] font-bold flex items-center">
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
                          <div className="text-muted-foreground">
                            Total Interest
                          </div>
                        </div>
                        <span className="text-sm font-semibold">
                          {totalInterest}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="vechile">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="pt-10">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Priciple Piad</th>
              <th className="py-2 px-4 border-b">Interest Paid</th>
              <th className="py-2 px-4 border-b">Total Payment</th>
              <th className="py-2 px-4 border-b">Balance</th>
              <th className="py-2 px-4 border-b">Loan Paid</th>
            </tr>
          </thead>
          <tbody>
            {emiSchedule.map((schedule) => (
              <tr key={schedule.year}>
                <td className="py-2 px-4 border-b text-center">
                  {schedule.year}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {schedule.principalPaid.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {schedule.interestPaid.toFixed(2)}
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
      </section>
    </main>
  );
};

export default LoanCalculator;
