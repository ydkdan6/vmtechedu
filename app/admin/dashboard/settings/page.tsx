"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [settings, setSettings] = useState<{
    notification_email: string;
    email_notifications_enabled: boolean;
  }>({
    notification_email: "",
    email_notifications_enabled: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("admin_settings")
      .select("*");

    if (error) {
      console.error("Error fetching settings:", error);
      setIsLoading(false);
      return;
    }

    if (data) {
      const settingsMap = data.reduce((acc, s) => {
        acc[s.key] = s.value;
        return acc;
      }, {} as Record<string, string>);

      setSettings({
        notification_email: settingsMap.notification_email || "",
        email_notifications_enabled: settingsMap.email_notifications_enabled === "true",
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();

    try {
      // Update notification email
      const { error: emailError } = await supabase
        .from("admin_settings")
        .update({ value: settings.notification_email, updated_at: new Date().toISOString() })
        .eq("key", "notification_email");

      if (emailError) throw emailError;

      // Update email notifications enabled
      const { error: enabledError } = await supabase
        .from("admin_settings")
        .update({ 
          value: settings.email_notifications_enabled.toString(),
          updated_at: new Date().toISOString()
        })
        .eq("key", "email_notifications_enabled");

      if (enabledError) throw enabledError;

      setMessage({ type: "success", text: "Settings saved successfully!" });
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ type: "error", text: "Failed to save settings. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your admin dashboard settings and notification preferences.
        </p>
      </div>

      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Configure email notifications for new submissions. You will receive an email
            whenever there is a new course enrollment, tutor application, or school request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email alerts for new submissions
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.email_notifications_enabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, email_notifications_enabled: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-email">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Notification Email Address
              </div>
            </Label>
            <Input
              id="notification-email"
              type="email"
              placeholder="admin@example.com"
              value={settings.notification_email}
              onChange={(e) =>
                setSettings({ ...settings, notification_email: e.target.value })
              }
              disabled={!settings.email_notifications_enabled}
            />
            <p className="text-sm text-muted-foreground">
              All notification emails will be sent to this address. Make sure to use a valid email.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="text-sm font-medium">Notification Types</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Course Enrollments - When a student enrolls in a course</li>
              <li>• Tutor Applications - When someone applies to become a tutor</li>
              <li>• School Requests - When a school requests partnership</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Settings
        </Button>
      </div>
    </div>
  );
}
