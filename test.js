// test-email.mjs
import { Resend } from "resend";

const resend = new Resend("re_iou9BmyN_DE47k54RZKx6oMPfXvXVeLnH"); // paste your full key here

const { data, error } = await resend.emails.send({
  from: "VM Tech Edu <notifications@vmconsulting.com.ng>",
  to: "ydkdan6@gmail.com",
  subject: "Test email",
  html: "<p>Domain verified and working!</p>",
});

console.log("data:", data);
console.log("error:", error);