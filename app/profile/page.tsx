"use client";

import CheckboxForm from "@/components/CheckboxForm";
import FileUploadForm from "@/components/FileUploadForm";
import Formtow from "@/components/Formtow";
import IntegrationForm from "@/components/IntegrationForm";
import InvoiceForm from "@/components/InvoiceForm";
import ProjectForm from "@/components/ProjectForm";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // When after loading success and have session, show profile
  return (
    status === "authenticated" &&
    session.user && (
      <div className="">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <div className="">
              <div className="flex  w-screen items-start pt-12 md:pt-0 md:items-center justify-center">
                <div className="w-full max-w-3xl overflow-hidden rounded-2xl flex flex-col gap-12">
                <p>
                Welcome, <b>{session.user.email}!</b>
                Welcome, <b>{session.user.role}!</b>
              </p>
              <Button onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </Button>
                  <div className="flex flex-col  items-center justify-center gap-2 px-4 text-center sm:px-16">
                    <ProjectForm />
                    <CheckboxForm />
                    <IntegrationForm/>
                    <Formtow/>
                    <FileUploadForm/>
                    <InvoiceForm/>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    )
  );
}
