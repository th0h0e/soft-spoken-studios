export const useContactForm = () => {
  // Contact form state
  const contactForm = ref({
    message: ''
  })

  const isSubmitting = ref(false)
  const submitMessage = ref('')
  const submitSuccess = ref(false)

  // Validation functions
  const validateMessage = (message: string) => {
    // Check if message contains email or phone number
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const phoneRegex = /(\+\d{1,3}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}/

    const hasEmail = emailRegex.test(message)
    const hasPhone = phoneRegex.test(message)

    return { hasEmail, hasPhone, hasContact: hasEmail || hasPhone }
  }

  // Submit contact form
  const submitContactForm = async () => {
    // Basic validation
    if (!contactForm.value.message.trim()) {
      submitMessage.value = 'Please provide a message'
      submitSuccess.value = false
      return
    }

    // Validate contact info in message
    const validation = validateMessage(contactForm.value.message)

    if (!validation.hasContact) {
      submitMessage.value = 'Please include your email or phone number in your message so we can get back to you'
      submitSuccess.value = false
      return
    }

    isSubmitting.value = true
    submitMessage.value = ''

    try {
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: contactForm.value
      })

      submitSuccess.value = true
      submitMessage.value = response.message

      // Reset form on success
      contactForm.value = {
        message: ''
      }
    } catch (error: any) {
      submitSuccess.value = false
      submitMessage.value = error.data?.message || 'Something went wrong. Please try again.'
    } finally {
      isSubmitting.value = false
    }
  }

  // Reset form
  const resetForm = () => {
    contactForm.value = { message: '' }
    submitMessage.value = ''
    submitSuccess.value = false
    isSubmitting.value = false
  }

  return {
    // State
    contactForm,
    isSubmitting,
    submitMessage,
    submitSuccess,

    // Methods
    submitContactForm,
    resetForm,
    validateMessage
  }
}