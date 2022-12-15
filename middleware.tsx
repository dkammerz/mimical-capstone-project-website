import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  //Get the host from headers
  const host = req.headers.get("host");
  //Remove the port from the host name, e.g. "localhost:3000" -> "localhost"
  const hostname = host?.split(":")[0];

  let url = req.url;
  const verify = req.cookies.get("connect.sid");

  if (!verify && !(url === "http://localhost:3000/login")) {
    if (url.includes("/_next")) {
      url.match;
      return NextResponse.next();
    } else {
      return NextResponse.redirect("http://localhost:3000/login");
    }
  }

  if (verify && url === "http://localhost:3000/login") {
    if (url.includes("/_next")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect("http://localhost:3000/");
    }
  }
}
