export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Basic validation
    if (!body.message?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message is required",
      });
    }

    // Check if message contains email or phone number
    const message = body.message;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+\d{1,3}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}/;

    const hasEmail = emailRegex.test(message);
    const hasPhone = phoneRegex.test(message);

    if (!hasEmail && !hasPhone) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Please include your email or phone number in your message so we can get back to you",
      });
    }

    // Send email using the email utility
    const emailResult = await sendContactEmail({
      message: body.message
    });

    if (!emailResult.success) {
      throw createError({
        statusCode: 500,
        statusMessage: emailResult.error || "Failed to send email",
      });
    }

    return {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    };
  } catch (error: unknown) {
    console.error("Contact form error:", error);

    // Return user-friendly error message
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong. Please try again later.",
    });
  }
});
