import nodemailer from 'nodemailer'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Only allow POST requests
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    const body = await readBody(event)
    const { message } = body

    // Basic validation
    if (!message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required'
      })
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD // Gmail app password
      }
    })

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@softspokenstudios.com',
      subject: 'New Contact Form Message - Soft Spoken Studios',
      html: `
        <h2>New Contact Form Submission</h2>
        <p>A new message has been received from the Soft Spoken Studios website.</p>

        <h3>Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: Arial, sans-serif; line-height: 1.6;">
          ${message.replace(/\n/g, '<br>')}
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
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: 'Email sent successfully'
    }
  } catch (error) {
    console.error('Email sending error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email'
    })
  }
})