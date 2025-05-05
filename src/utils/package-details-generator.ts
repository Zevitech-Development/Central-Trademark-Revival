import { PackageTypeEnum } from "@/enums/package-type-enum";

export const PackageDetailsGenerator = (
  packageType: PackageTypeEnum | string
): { name: string; price: number; description: string } => {
  const packageEnum =
    typeof packageType === "string"
      ? (packageType as PackageTypeEnum)
      : packageType;

  switch (packageEnum) {
    case PackageTypeEnum.BASIC:
      return {
        name: "Basic Package",
        price: 49,
        description:
          "Essential trademark filing for startups with 7-day processing.",
      };
    case PackageTypeEnum.STANDARD:
      return {
        name: "Standard Package",
        price: 149,
        description:
          "Enhanced trademark filing with 3-day processing and paralegal review.",
      };
    case PackageTypeEnum.PREMIUM:
      return {
        name: "Premium Package",
        price: 249,
        description:
          "Complete trademark protection with expedited filing and full support.",
      };
    default:
      return {
        name: "Basic Package",
        price: 49,
        description:
          "Essential trademark filing for startups with 7-day processing.",
      };
  }
};
