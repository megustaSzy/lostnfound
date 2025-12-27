"use client";

import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";

import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileAlert } from "@/components/profile/ProfileAlert";
import { FullscreenLoader } from "@/components/loaders/FullscreenLoader";

export default function ProfilePage() {
  const { user, loading, refreshUser } = useUser();
  const profile = useProfile(user, refreshUser);

  if (loading) {
    return <FullscreenLoader message="Memuat data pengguna..." />;
  }

  if (!user) {
    return <div className="p-10">Anda harus login!</div>;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        role={user.role}
        user={{ name: user.name, email: user.email }}
      />

      <SidebarInset>
        <SiteHeader />

        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
          <ProfileHeader />
          <ProfileAlert message={profile.message} />

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProfileCard user={user} />

            <ProfileForm
              formData={profile.formData}
              handleChange={profile.handleChange}
              handleSave={profile.handleSave}
              saving={profile.saving}
            />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
