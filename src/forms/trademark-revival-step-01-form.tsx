"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { State, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { setStep01Data } from "@/store/slices/form-slice";

import { TrademarkRevivalStep01FormType } from "@/types/forms-type";
import { TrademarkRevivalStep01FormSchema } from "@/schemas/trademark-revival-step-01-form-schema";

import { SendLeadNotificationEmail } from "@/services/email-service";

import { Form } from "@/components/ui/form";
import CustomSystemField from "@/components/common/custom-system-field";
import CustomInput from "@/components/common/custom-input";
import { CustomDropdown01 } from "@/components/common/custom-dropdowns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { SetStepCompletionCookie } from "@/utils/cookie-utils";
import { SerialNumberGenerator } from "@/utils/serial-number-generator";

import { LoaderCircle } from "lucide-react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function TrademarkRevivalStep01Form() {
  const [system01, setSystem01] = useState("");
  const [system02, setSystem02] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // STATES AND CITIES - (UNITED STATES)
  const states = useMemo(
    () =>
      State.getStatesOfCountry("US").map((state) => ({
        label: state.name,
        value: state.isoCode,
      })),
    []
  );
  const cities = useMemo(
    () =>
      City.getAllCities()
        .filter((city) => city.countryCode === "US")
        .map((city) => ({
          label: city.name,
          value: city.name,
        })),
    []
  );

  const form = useForm({
    resolver: zodResolver(TrademarkRevivalStep01FormSchema),
    defaultValues: {
      formId: SerialNumberGenerator({
        prefix: "REG",
        length: 10,
        includeTimestamp: true,
      }),
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      zipCode: "",
      emailAddress: "",
      phoneNumber: "",
      landlineNumber: "",
      prefferedContactTime: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: TrademarkRevivalStep01FormType) => {
    if (system01 || system02) {
      console.warn("Better Luck Next Time!");
      return;
    }

    setLoading(true);

    try {
      dispatch(setStep01Data(data));
      SetStepCompletionCookie(1, data.formId);

      try {
        await SendLeadNotificationEmail(data);
      } catch (emailError) {
        console.error("Error sending lead email:", emailError);
      }

      toast.success("Step 1 Completed", {
        description:
          "Your information has been successfully saved. Proceed to the next step to continue your trademark revival.",
        icon: <FaCircleCheck className="text-green-600" size={24} />,
      });
      router.push("/trademark-revival/step-02");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Submission Failed", {
          description: `There was an issue processing your request: ${error.message}`,
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      } else {
        toast.error("Unexpected Error", {
          description:
            "Something went wrong on our end. Please try again or contact support if the issue persists.",
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="md:mt-8 mt-4 max-md:mb-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* SYSTEM FIELD 01 */}
          <CustomSystemField
            name="system01"
            value={system01}
            onChange={setSystem01}
          />

          {/* FIRST AND LAST NAME FIELD */}
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <CustomInput
              control={control}
              name="firstName"
              label="First Name"
              placeholder="e.g., Jonathan"
            />

            <CustomInput
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="e.g., Smith"
            />
          </div>

          {/* STATE AND CITY FIELD */}
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <CustomDropdown01
              control={control}
              name="state"
              label="State"
              options={states}
              placeholder="Select your state of residence"
              isVirtualized={false}
            />

            <CustomDropdown01
              control={control}
              name="city"
              label="City"
              options={cities}
              placeholder="Select your city"
              isVirtualized={true}
            />
          </div>

          {/* ADDRESS FIELD */}
          <CustomInput
            control={control}
            name="address"
            label="Address"
            placeholder="e.g., 1234 Elm Street, Suite 400"
          />

          {/* ZIP CODE AND EMAIL ADDRESS FIELD */}
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <CustomInput
              control={control}
              name="zipCode"
              label="Zip Code"
              placeholder="e.g., 90210"
            />

            <CustomInput
              control={control}
              name="emailAddress"
              label="Email Address"
              placeholder="e.g., jonathan.smith@example.com"
            />
          </div>

          {/* PHONE NUMBER AND LANDLINE FIELD */}
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <CustomInput
              control={control}
              name="phoneNumber"
              label="Phone Number"
              placeholder="e.g., (123) 456-7890"
            />

            <CustomInput
              control={control}
              name="landlineNumber"
              label="Landline Number"
              placeholder="e.g., (123) 555-1234 (optional)"
            />
          </div>

          {/* PREFFERED CONTACT TIME FIELD */}
          <CustomInput
            control={control}
            name="prefferedContactTime"
            label="Preffered Contact Time (must be during business hours.)"
            placeholder="e.g., Monday, 10:00 AM - 12:00 PM"
          />

          <Separator className="mt-4" />

          {/* SYSTEM FIELD 02 */}
          <CustomSystemField
            name="system02"
            value={system02}
            onChange={setSystem02}
          />

          {/* SUBMIT BUTTON */}
          <div className="w-full flex items-center md:justify-between md:flex-row flex-col max-md:gap-4 max-md:mb-4">
            <div>Google Captcha</div>

            <Button
              className="md:w-[200px] w-full h-[55px] px-8 font-bold font-lato hover:bg-primary-hover text-base rounded-[0.5rem]"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <p>Submiting</p> <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                "Next Step"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default TrademarkRevivalStep01Form;
