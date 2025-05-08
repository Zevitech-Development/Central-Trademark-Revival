"use client";

import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State } from "country-state-city";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { setStep02Data } from "@/store/slices/form-slice";

import { TrademarkRevivalStep02FormSchema } from "@/schemas/trademark-revival-step-02-form-schema";
import { ProtectionTypeEnum } from "@/enums/protection-type-enum";
import { TrademarkRevivalStep02FormType } from "@/types/forms-type";
import { RootState } from "@/types/store-types";

import { SendStep2CompletionEmail } from "@/services/email-service";

import {
  CustomDropdown01,
  CustomDropdown02,
} from "@/components/common/custom-dropdowns";
import CustomSystemField from "@/components/common/custom-system-field";
import CustomSelection from "@/components/common/custom-selection";
import CustomCalendar from "@/components/common/custom-calendar";
import CustomTextarea from "@/components/common/custom-textarea";
import CustomUpload from "@/components/common/custom-upload";
import CustomInput from "@/components/common/custom-input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { SetStepCompletionCookie } from "@/utils/cookie-utils";

import FormImg01 from "../../public/images/form-img-01.png";
import FormImg02 from "../../public/images/form-img-02.png";
import FormImg03 from "../../public/images/form-img-03.png";
import FormImg04 from "../../public/images/form-img-04.png";
import { LoaderCircle } from "lucide-react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function TrademarkRevivalStep02Form() {
  const [system01, setSystem01] = useState("");
  const [system02, setSystem02] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const formId = useSelector((state: RootState) => state.form.formId);
  const step01Data = useSelector((state: RootState) => state.form.step01Data);

  // COUNTRIES AND STATES (UNITED STATES)
  const countries = useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        label: country.name,
        value: country.name,
      })),
    []
  );
  const states = useMemo(
    () =>
      State.getStatesOfCountry("US").map((state) => ({
        label: state.name,
        value: state.name,
      })),
    []
  );

  const form = useForm({
    resolver: zodResolver(TrademarkRevivalStep02FormSchema),
    defaultValues: {
      protectionType: ProtectionTypeEnum.NAME,
      protectionName: "",
      protectionLogo: "",
      protectionLogoColorScheme: "",
      protectionLogoLiteralElements: "",
      protectionSlogan: "",

      isTrademarkInUse: false,
      trademarkFirstUseDate: undefined,
      trademarkFirstUseInCommerceDate: undefined,
      trademarkInUseOwnershipDetails: "",

      isIndividuallyOwnedTrademark: true,
      isUSBasedOrganization: true,
      organizationName: "",
      organizationType: "",
      organizationFormationCountry: "",
      organizationFormationState: "",
      organizationPosition: "",

      businessClassification: "",
    },
  });

  const { handleSubmit, control, setValue, watch } = form;

  const protectionType = watch("protectionType");
  const isTrademarkInUse = watch("isTrademarkInUse");
  const isIndividuallyOwnedTrademark = watch("isIndividuallyOwnedTrademark");
  const isUSBasedOrganization = watch("isUSBasedOrganization");

  const handleLogoUpload = (url: string) => {
    setLogoUrl(url);
    setValue("protectionLogo", url);
  };

  const onSubmit = async (data: TrademarkRevivalStep02FormType) => {
    if (system01 || system02) {
      console.warn("Better Luck Next Time!");
      return;
    }

    if (!formId || !step01Data) {
      toast.error("Missing Form ID", {
        description:
          "We couldn't find a valid Form ID. Please complete Step 1 before proceeding.",
        icon: <FaCircleXmark className="text-red-600" size={24} />,
      });
      router.push("/trademark-revival/step-01");
      return;
    }

    setLoading(true);

    try {
      dispatch(setStep02Data(data));
      SetStepCompletionCookie(2, formId);

      try {
        await SendStep2CompletionEmail(step01Data, data, logoUrl || undefined);
      } catch (emailError) {
        console.error("Error sending follow-up email:", emailError);
      }

      toast.success("Step 2 Completed", {
        description:
          "Your information has been successfully saved. Proceed to the next step to continue your trademark revival.",
        icon: <FaCircleCheck className="text-green-600" size={24} />,
      });
      router.push("/trademark-revival/step-03");
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

          {/* PROTECTION TYPE FIELD */}
          <CustomSelection
            control={control}
            name="protectionType"
            label="Select what you are trying to protect"
            options={[
              {
                label: "Name",
                value: ProtectionTypeEnum.NAME,
                image: FormImg01,
              },
              {
                label: "Logo",
                value: ProtectionTypeEnum.LOGO,
                image: FormImg02,
              },
              {
                label: "Slogan",
                value: ProtectionTypeEnum.SLOGAN,
                image: FormImg03,
              },
              {
                label: "All of them",
                value: ProtectionTypeEnum.ALL,
                image: FormImg04,
              },
            ]}
          />

          {protectionType === ProtectionTypeEnum.NAME ? (
            // PROTECTION NAME FIELD
            <CustomInput
              control={control}
              name="protectionName"
              label="Enter the name you want to protect"
              placeholder="e.g., Nike, Apple"
            />
          ) : protectionType === ProtectionTypeEnum.LOGO ? (
            <>
              <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* PROTECTION LOGO COLOR SCHEME FIELD */}
                <CustomInput
                  control={control}
                  name="protectionLogoColorScheme"
                  label="What are the protetion logo color scheme?"
                  placeholder="e.g., Red and White, Blue and Gray"
                />

                {/* PROTECTION LOGO LITERAL ELEMENTS FIELD */}
                <CustomInput
                  control={control}
                  name="protectionLogoLiteralElements"
                  label="What are the protetion logo literal elements?"
                  placeholder="e.g., Nike, Apple."
                />
              </div>

              {/* PROTECTION LOGO UPLOAD BUTTON */}
              <CustomUpload
                control={control}
                name="protectionLogo"
                label="Upload Your Logo"
                onUploadSuccess={handleLogoUpload}
              />
            </>
          ) : protectionType === ProtectionTypeEnum.SLOGAN ? (
            // PROTECTION SLOGAN FIELD
            <CustomInput
              control={control}
              name="protectionSlogan"
              label="Enter the slogan you want to protect"
              placeholder="e.g., Just Do It, Think Different"
            />
          ) : (
            <>
              {/* ALL OF THEM */}
              <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* PROTECTION NAME FIELD */}
                <CustomInput
                  control={control}
                  name="protectionName"
                  label="Enter the name you want to protect"
                  placeholder="e.g., Nike, Apple."
                />

                {/* PROTECTION SLOGAN FIELD */}
                <CustomInput
                  control={control}
                  name="protectionSlogan"
                  label="Enter the slogan you want to protect"
                  placeholder="e.g., Just do it, Think Different."
                />
              </div>

              <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* PROTECTION LOGO COLOR SCHEME FIELD */}
                <CustomInput
                  control={control}
                  name="protectionLogoColorScheme"
                  label="What are the protetion logo color scheme?"
                  placeholder="e.g., Red, Blue, White."
                />

                {/* PROTECTION LOGO LITERAL ELEMENTS FIELD */}
                <CustomInput
                  control={control}
                  name="protectionLogoLiteralElements"
                  label="What are the protetion logo literal elements?"
                  placeholder="e.g., Nike, Apple."
                />
              </div>

              {/* PROTECTION LOGO UPLOAD BUTTON */}
              <CustomUpload
                control={control}
                name="protectionLogo"
                label="Upload Your Logo"
                onUploadSuccess={handleLogoUpload}
              />
            </>
          )}

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* TRADEMARK IN USE FIELD */}
            <CustomDropdown02
              control={control}
              name="isTrademarkInUse"
              label="Are you currently using this trademark anywhere?"
              options={[
                { label: "Yes, it is being used", value: true },
                { label: "No, it is not being used anywhere", value: false },
              ]}
            />

            {/* TRADEMARK FIRST USE DATE FIELD */}
            <CustomCalendar
              control={control}
              name="trademarkFirstUseDate"
              label="Select trademark first use anywhere date"
              disabled={!isTrademarkInUse}
              setValue={setValue}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* TRADEMARK FIRST USE IN COMMERCE DATE FIELD */}
            <CustomCalendar
              control={control}
              name="trademarkFirstUseInCommerceDate"
              label="Select trademark first use in commerce date"
              disabled={!isTrademarkInUse}
              setValue={setValue}
            />

            {/* TRADEMARK IN USE OWNERSHIP DETAILS FIELD */}
            <CustomInput
              control={control}
              name="trademarkInUseOwnershipDetails"
              label="Enter the ownership details of the trademark in use"
              placeholder="e.g., John Doe, Apple Inc."
              disabled={!isTrademarkInUse}
            />
          </div>

          {/* INDIVIDUALLY OWNED TRADEMARK FIELD */}
          <CustomDropdown02
            control={control}
            name="isIndividuallyOwnedTrademark"
            label="Will the trademark be owned by an individual or an entity such as a corporation or LLC?"
            options={[
              { label: "Yes, it will be owned by an individual.", value: true },
              {
                label:
                  "No, it will be owned by an entity such as a corporation or LLC.",
                value: false,
              },
            ]}
          />

          {!isIndividuallyOwnedTrademark && (
            <>
              {/* IS US-BASED ORGANIZATION FIELD */}
              <CustomDropdown02
                control={control}
                name="isUSBasedOrganization"
                label="Is the owning origanization/corporation based in the United States?"
                options={[
                  {
                    label: "Yes, the origanization/corporation is US-based.",
                    value: true,
                  },
                  {
                    label: "No, the origanization/corporation is not US-based.",
                    value: false,
                  },
                ]}
              />

              <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* ORGANIZATION NAME FIELD */}
                <CustomInput
                  control={control}
                  name="organizationName"
                  label="Enter the name of the origanization/corporation"
                  placeholder="e.g., Apple Inc."
                />

                {/* ORGANIZATION TYPE FIELD */}
                <CustomDropdown01
                  control={control}
                  name="organizationType"
                  label="Origanization/Corporation Type"
                  options={[
                    { name: "LLC", value: "llc" },
                    { name: "C Corporation", value: "c-corporation" },
                    { name: "S Corporation", value: "s-corporation" },
                    { name: "Non Profit", value: "non-profit" },
                    { name: "Partnership", value: "partnership" },
                    {
                      name: "Solo Proprietorship",
                      value: "solo-proprietorship",
                    },
                    { name: "Trust", value: "trust" },
                    { name: "Other", value: "other" },
                  ].map((option) => ({
                    label: option.name,
                    value: option.name,
                  }))}
                  placeholder="Select your origanization/corporation type"
                  isVirtualized={false}
                />
              </div>

              <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                {isUSBasedOrganization ? (
                  <>
                    {/* ORGANIZATION FORMATION STATE FIELD */}
                    <CustomDropdown01
                      control={control}
                      name="organizationFormationState"
                      label="Origanization/Corporation Formation State"
                      options={states}
                      placeholder="Select your origanization/corporation formation state"
                      isVirtualized={false}
                    />
                  </>
                ) : (
                  <>
                    {/* ORGANIZATION FORMATION COUNTRY FIELD */}
                    <CustomDropdown01
                      control={control}
                      name="organizationFormationCountry"
                      label="Origanization/Corporation Formation Country"
                      options={countries}
                      placeholder="Select your origanization/corporation formation country"
                      isVirtualized={false}
                    />
                  </>
                )}

                {/* ORGANIZATION POSITION FIELD */}
                <CustomInput
                  control={control}
                  name="organizationPosition"
                  label="Enter the position held by the individual"
                  placeholder="e.g., CEO, CFO, Product Manager."
                />
              </div>
            </>
          )}

          {/* BUSINESS CLASSIFICATION FIELD */}
          <CustomTextarea
            control={control}
            name="businessClassification"
            label="Enter the business description"
            placeholder="e.g., clothing, coffee shops, restaurants, retail stores..."
            rows={16}
          />

          <Separator className="mt-4" />

          {/* SYSTEM FIELD 02 */}
          <CustomSystemField
            name="system02"
            value={system02}
            onChange={setSystem02}
          />

          <div className="w-full flex items-center md:justify-end max-md:mb-4">
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

export default TrademarkRevivalStep02Form;
