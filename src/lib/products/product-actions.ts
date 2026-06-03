"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { products } from "@/db/schema";
import { db } from "@/db";

type FormState = {
  success: boolean;
  error?: Record<string, string[]>;
  message: string;
};

export async function addProductAction(
  previousState: FormState | undefined,
  formData: FormData,
) {


  try {
    const { userId } = await auth();
    const user  = await currentUser();
    if (!userId) {
      return {
        success: false,
        errors: {},
        message: "You must be logged in to submit a product.",
      };
    }


    //data extraction and validation logic goes here
    const rawFormData = Object.fromEntries(formData.entries());
    
    //validate the data
    const validatedData = productSchema.safeParse(rawFormData);
    if (!validatedData.success) {
        console.log("Validation errors:", validatedData.error.flatten().fieldErrors);
      const zodErrors = validatedData.error.flatten().fieldErrors;
      return {
        success: false,
        errors: zodErrors,
        message: "Please correct the errors in the form.",
      };
    }

    const data = validatedData.data;

    const {name, slug, tagline, description, websiteUrl , tags} = data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    await db.insert(products).values({
        name,
        slug,
        tagline,
        description,
        websiteUrl,
        tags : tagsArray,
        submittedBy: user?.emailAddresses[0]?.emailAddress || "unknown",
        status: "pending",
        createdAt: new Date(),
        userId: userId
    })
    
    console.log("Received form data:", data);
    return {
        success: true,
        errors: {},
        message: "Product submitted successfully! It will be reviewed by our team shortly.",
    }

  } 
  catch (error) 
  {
    return {
      success: false,
      errors: error,
      message: "There was an error submitting your product. Please try again.",
    };
  }

  return {
    success: true,
    errors: {},
    message: "Product submitted successfully!",
  };
}
