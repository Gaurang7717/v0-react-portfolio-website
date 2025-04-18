"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getProfile, updateProfile } from "@/lib/profile"
import type { Profile } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    avatar_url: "",
  })
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    async function loadProfile() {
      if (!user) return

      try {
        setIsLoading(true)
        const data = await getProfile(user.id)

        if (data) {
          setProfile(data)
          setFormData({
            full_name: data.full_name || "",
            avatar_url: data.avatar_url || "",
          })
        }
      } catch (error) {
        console.error("Failed to load profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSaving(true)
      const updatedProfile = await updateProfile(user.id, formData)
      setProfile(updatedProfile)

      toast({
        title: "Success",
        description: "Profile updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" value={user?.email || ""} disabled />
                  <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="full_name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="avatar_url" className="text-sm font-medium">
                    Avatar URL
                  </label>
                  <Input
                    id="avatar_url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    disabled={isSaving}
                  />
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-muted-foreground capitalize">{profile?.role || "User"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-muted-foreground">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-muted-foreground">
                  {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : "Never"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
