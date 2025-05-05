import { PackageTypeEnum } from "@/enums/package-type-enum";

export const FormPackageContent = [
  {
    id: 1,
    packageType: "Basic Package",
    packageValue: PackageTypeEnum.BASIC,
    packageDescription:
      "Essential trademark filing for startups with 7-day processing.",
    packageAmount: 49,
    details: [
      "Comprehensive trademark search",
      "7-day application processing",
      "Application prepared by specialists",
      "100% satisfaction guarantee",
    ],
    detailsNotOffered: [
      "Office action support",
      "Additional filings management",
    ],
  },

  {
    id: 2,
    packageType: "Standard Package",
    packageValue: PackageTypeEnum.STANDARD,
    packageDescription:
      "Enhanced trademark filing with 3-day processing and paralegal review.",
    packageAmount: 149,
    details: [
      "Comprehensive federal and state trademark search",
      "3-day application processing",
      "Application reviewed by licensed paralegal",
      "100% satisfaction guarantee",
      "Office action support",
    ],
    detailsNotOffered: ["Additional filings management"],
  },

  {
    id: 3,
    packageType: "Premium Package",
    packageValue: PackageTypeEnum.PREMIUM,
    packageDescription:
      "Complete trademark protection with expedited filing and full support.",
    packageAmount: 249,
    details: [
      "Comprehensive federal and state trademark search",
      "24-48 hours application processing",
      "Full support from U.S. licensed paralegals",
      "100% satisfaction guarantee",
      "Office action support",
      "Additional filings management",
    ],
  },
];
