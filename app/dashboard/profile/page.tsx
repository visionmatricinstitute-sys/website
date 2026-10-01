import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, KeyRound } from "lucide-react"
import { updateProfile, changePassword } from "./actions"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle()

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black font-sans text-foreground">Profile</h1>
        <p className="text-muted-foreground font-serif mt-1">Manage your account details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Your Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Name</Label>
              <Input id="fullName" name="fullName" required defaultValue={profile?.full_name ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email ?? ""} disabled />
              <p className="text-xs text-muted-foreground font-serif">
                Contact us if you need to change the email on your account.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={profile?.phone ?? ""} placeholder="+91 " />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={changePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" name="newPassword" type="password" required minLength={8} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
            </div>
            <Button type="submit" variant="outline" className="w-full gap-1.5 bg-transparent">
              <KeyRound className="h-4 w-4" /> Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
