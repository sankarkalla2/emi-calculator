import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppWindow, Calculator } from "lucide-react";
import Link from "next/link";
import { BiCalculator } from "react-icons/bi";
import { FaAndroid } from "react-icons/fa";

export default function ImportantLinks() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 px-8">
      <Card className="w-full md:w-[400px]">
        <Link href={"#"}>
          <CardHeader className="pb-2 flex items-center justify-center">
            <CardDescription className="bg-purple-600 p-2 rounded-full text-white">
              <BiCalculator className="h-16 w-16" />
            </CardDescription>
            <CardTitle className="text-xl">HOME LOAN CALCULATOR</CardTitle>
          </CardHeader>
        </Link>
        <CardContent className="flex items-center justify-center">
          <div className="text-xs text-muted-foreground">
            Home Loan EMI Calculator with Prepayments, Taxes & Insurance
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <Card className="w-full md:w-[400px] py-2">
        <Link
          href={
            "https://play.google.com/store/apps/details?id=net.emicalculator"
          }
          target="_blank"
        >
          <CardHeader className="pb-2 flex items-center justify-center">
            <CardDescription className="bg-purple-600 p-2 rounded-full text-white">
              <FaAndroid className="h-16 w-16" />
            </CardDescription>
            <CardTitle className="text-xl">ANDROID APP</CardTitle>
          </CardHeader>
        </Link>
        <CardContent className="flex items-center justify-center">
          <div className="text-xs text-muted-foreground">
            Download our Free Android App from Google Play Store
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card className="w-full md:w-[400px]">
        <Link href={"#"}>
          <CardHeader className="pb-2 flex items-center justify-center">
            <CardDescription className="bg-purple-600 p-2 rounded-full text-white">
              <BiCalculator className="h-16 w-16" />
            </CardDescription>
            <CardTitle className="text-xl">HOME LOAN CALCULATOR</CardTitle>
          </CardHeader>
        </Link>
        <CardContent className="flex items-center justify-center">
          <div className="text-xs text-muted-foreground">
            Loan Calculator — Calculate EMI, Affordability, Tenure & Interest
            Rate
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
