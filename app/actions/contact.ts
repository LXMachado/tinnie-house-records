"use server"

import { z } from "zod"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type ContactFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Validate form data
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real implementation, you would send an email or store in a database
    // For now, we'll just simulate a successful submission

    // Return success state
    return {
      success: true,
    }
  } catch (error) {
    // Handle any errors
    return {
      errors: {
        _form: ["Failed to send message. Please try again later."],
      },
      success: false,
    }
  }
}

