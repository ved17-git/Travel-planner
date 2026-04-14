"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav";

export default function Settings() {
  const [profile, setProfile] = useState({ firstName: "John", lastName: "Doe", email: "john@example.com" });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const setP = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile((prev) => ({ ...prev, [k]: e.target.value }));
  const setPw = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswords((prev) => ({ ...prev, [k]: e.target.value }));

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    // TODO: PATCH /api/auth/me
    await new Promise((r) => setTimeout(r, 600));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    // TODO: PATCH /api/auth/password
    await new Promise((r) => setTimeout(r, 600));
    setPasswordSaving(false);
    setPasswordSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile section */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40">
              <h2 className="font-semibold text-sm">Profile Information</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your name and email address</p>
            </div>

            <form onSubmit={handleProfileSave} className="p-6 space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{profile.firstName} {profile.lastName}</p>
                  <p className="text-xs text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">First name</label>
                  <input
                    value={profile.firstName}
                    onChange={setP("firstName")}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Last name</label>
                  <input
                    value={profile.lastName}
                    onChange={setP("lastName")}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={setP("email")}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="h-9 px-5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {profileSaving ? "Saving..." : "Save Changes"}
                </button>
                {profileSaved && (
                  <span className="text-sm text-green-500 font-medium">✓ Saved</span>
                )}
              </div>
            </form>
          </div>

          {/* Password section */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40">
              <h2 className="font-semibold text-sm">Change Password</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Use a strong password to keep your account secure</p>
            </div>

            <form onSubmit={handlePasswordSave} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Current password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.current}
                  onChange={setPw("current")}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">New password</label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={passwords.newPass}
                  onChange={setPw("newPass")}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Confirm new password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={setPw("confirm")}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="h-9 px-5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>
                {passwordSaved && (
                  <span className="text-sm text-green-500 font-medium">✓ Password updated</span>
                )}
              </div>
            </form>
          </div>

          {/* Preferences section */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border/40">
              <h2 className="font-semibold text-sm">Preferences</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Customize your planning experience</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Email notifications", desc: "Get notified when your itinerary is ready" },
                { label: "Trip reminders", desc: "Receive reminders before your trips" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <button
                    type="button"
                    className="w-10 h-6 bg-primary rounded-full relative transition-colors"
                    aria-label={label}
                  >
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl border border-destructive/30 bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-destructive/20">
              <h2 className="font-semibold text-sm text-destructive">Danger Zone</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Permanent actions that cannot be undone</p>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-xs text-muted-foreground">Permanently remove your account and all trip data</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="h-9 px-4 border border-destructive/40 text-destructive text-sm font-medium rounded-lg hover:bg-destructive/5 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* Sign out */}
          <div className="flex items-center justify-between py-2">
            <p className="text-sm text-muted-foreground">Signed in as {profile.email}</p>
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out →
            </Link>
          </div>
        </div>
      </main>

      {/* Delete confirm dialog */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-base mb-2">Delete your account?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              All your trips, itineraries, and data will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-10 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                className="flex-1 h-10 bg-destructive text-destructive-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}