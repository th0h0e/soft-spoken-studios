import nodemailer from "nodemailer";

export interface SendContactEmailOptions {
  message: string;
  recipientEmail?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a contact form email using nodemailer
 * @param options - The email options including message content
 * @returns Promise resolving to EmailResult
 */
export async function sendContactEmail(
  options: SendContactEmailOptions
): Promise<EmailResult> {
  try {
    const { message, recipientEmail = "info@softspokenstudios.com" } = options;

    // Validate message
    if (!message || !message.trim()) {
      throw new Error("Message is required");
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: "New Contact Form Message - Soft Spoken Studios",
      html: `
        <h2>New Contact Form Submission</h2>
        <p>A new message has been received from the Soft Spoken Studios website.</p>

        <h3>Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: Arial, sans-serif; line-height: 1.6;">
          ${message.replace(/\n/g, "<br>")}
        </div>

        <hr>
        <p style="color: #666; font-size: 12px;">
          This message was sent from the contact form at softspokenstudios.com
        </p>
      `,
      // Also include plain text version
      text: `
New Contact Form Submission

Message:
${message}

---
This message was sent from the contact form at softspokenstudios.com
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email sending error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
