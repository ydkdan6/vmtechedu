"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface NotificationData {
  type: "enrollment" | "tutor_application" | "school_request";
  title: string;
  message: string;
  referenceId?: string;
  details: Record<string, string>;
}

export async function sendNotification(data: NotificationData) {
  const supabase = await createClient();

  // Create in-app notification
  const { error: notifError } = await supabase.from("notifications").insert({
    type: data.type,
    title: data.title,
    message: data.message,
    reference_id: data.referenceId || null,
  });

  if (notifError) {
    console.error("Failed to create notification:", notifError);
  }

  // Check if email notifications are enabled and get admin email
  const { data: settings } = await supabase
    .from("admin_settings")
    .select("key, value")
    .in("key", ["notification_email", "email_notifications_enabled"]);

  const settingsMap = settings?.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, string>
  );

  const emailEnabled = settingsMap?.email_notifications_enabled === "true";
  const adminEmail = settingsMap?.notification_email;

  if (!emailEnabled || !adminEmail || !process.env.RESEND_API_KEY) {
    return { success: true, emailSent: false };
  }

  // Build email content
  const detailsHtml = Object.entries(data.details)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");

  const typeColors = {
    enrollment: "#3b82f6",
    tutor_application: "#10b981",
    school_request: "#8b5cf6",
  };

  const typeLabels = {
    enrollment: "New Course Enrollment",
    tutor_application: "New Tutor Application",
    school_request: "New School Request",
  };

  try {
    await resend.emails.send({
      from: "VM Tech Edu <notifications@resend.dev>",
      to: adminEmail,
      subject: `[VM Tech Edu] ${typeLabels[data.type]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="background-color: ${typeColors[data.type]}; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">${typeLabels[data.type]}</h1>
              </div>
              <div style="padding: 24px;">
                <h2 style="color: #18181b; margin: 0 0 8px 0; font-size: 18px;">${data.title}</h2>
                <p style="color: #71717a; margin: 0 0 20px 0;">${data.message}</p>
                <div style="background-color: #f4f4f5; border-radius: 6px; padding: 16px;">
                  <h3 style="color: #18181b; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Submission Details</h3>
                  ${detailsHtml}
                </div>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://vmtechedu.vercel.app"}/admin/dashboard" 
                     style="display: inline-block; background-color: ${typeColors[data.type]}; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">
                    View in Dashboard
                  </a>
                </div>
              </div>
              <div style="background-color: #f4f4f5; padding: 16px; text-align: center;">
                <p style="color: #71717a; margin: 0; font-size: 12px;">
                  This is an automated notification from VM Tech Edu. 
                  You can manage notification settings in your admin dashboard.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, emailSent: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: true, emailSent: false };
  }
}
