import type { Metadata } from "next";
import "./globals.css";
import HeaderDashboard from "@/components/Dashboard/TopNav";
import { SidebarDemo } from "@/components/Dashboard/SideBar";
import  { RightSidebar } from "@/components/Dashboard/RightSideBar";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { SessionProvider } from "@/utils/providers/sessionProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ReactQueryProvider>
              <Toaster />
              <div className="flex">
                <SidebarDemo />
                <div className="flex-1 w-full">
                  <div className="p-4">
                    <HeaderDashboard />
                  </div>
                  <div className="flex">
                    <div className="flex-1 overflow-y-auto">
                      {children}
                    </div>
                    <RightSidebar />
                  </div>
                </div>
              </div>
            </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}