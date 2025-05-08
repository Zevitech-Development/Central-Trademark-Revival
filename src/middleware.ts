import { NextRequest, NextResponse } from "next/server";

const formStepRoutes = [
  {
    route: "/trademark-revival/step-01",
    requiredCookie: null,
  },
  {
    route: "/trademark-revival/step-02",
    requiredCookie: "step01_completed",
  },
  {
    route: "/trademark-revival/step-03",
    requiredCookie: "step02_completed",
  },
  {
    route: "/trademark-revival/step-04",
    requiredCookie: "step03_completed",
  },
  {
    route: "/checkout",
    requiredCookie: "step04_completed",
  },
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const matchedRoute = formStepRoutes.find(
    (route) =>
      pathname === route.route ||
      (route.route === "/checkout" && pathname.startsWith("/checkout/"))
  );

  if (matchedRoute) {
    if (matchedRoute.requiredCookie) {
      const hasRequiredCookie = request.cookies.has(
        matchedRoute.requiredCookie
      );

      if (!hasRequiredCookie) {
        if (request.cookies.has("formId")) {
          const stepNumber = parseInt(
            matchedRoute.requiredCookie?.split("_")[0].replace("step", "") ||
              "1"
          );

          return NextResponse.redirect(
            new URL(`/trademark-revival/step-0${stepNumber}`, request.url)
          );
        } else {
          return NextResponse.redirect(
            new URL("/trademark-revival/step-01", request.url)
          );
        }
      }
    }
  }

  if (pathname.startsWith("/checkout/") && pathname !== "/checkout/thankyou") {
    const formId = pathname.split("/").pop();

    if (!request.cookies.has("step04_completed")) {
      return NextResponse.redirect(
        new URL("/trademark-revival/step-01", request.url)
      );
    }

    const cookieFormId = request.cookies.get("formId")?.value;
    if (formId !== cookieFormId) {
      return NextResponse.redirect(
        new URL("/trademark-revival/step-01", request.url)
      );
    }
  }

  if (pathname === "/checkout/thankyou") {
    if (!request.cookies.has("payment_completed")) {
      return NextResponse.redirect(
        new URL("/trademark-revival/step-01", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/trademark-revival/step-01",
    "/trademark-revival/step-02",
    "/trademark-revival/step-03",
    "/trademark-revival/step-04",
    "/checkout/:path*",
  ],
};
