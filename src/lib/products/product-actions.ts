"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { products } from "@/db/schema";
import { db } from "@/db";
import { success } from "zod";
import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type FormErrors = Partial<Record<string, string[]>>;

export type FormState = {
  success: boolean;
  errors: FormErrors;
  message: string;
};

export async function addProductAction(
  previousState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  try {
    const { userId } = await auth();
    const user = await currentUser();
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
      console.log(
        "Validation errors:",
        validatedData.error.flatten().fieldErrors,
      );
      const zodErrors = validatedData.error.flatten().fieldErrors;
      return {
        success: false,
        errors: zodErrors,
        message: "Please correct the errors in the form.",
      };
    }

    const data = validatedData.data;

    const { name, slug, tagline, description, websiteUrl, tags } = data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      submittedBy: user?.emailAddresses[0]?.emailAddress || "unknown",
      status: "pending",
      createdAt: new Date(),
      userId: userId,
    });

    console.log("Received form data:", data);
    return {
      success: true,
      errors: {},
      message:
        "Product submitted successfully! It will be reviewed by our team shortly.",
    };
  } catch (error) {
    console.error("❌ Error submitting product:", error);
    return {
      success: false,
      errors: {},
      message: "There was an error submitting your product. Please try again.",
    };
  }

  return {
    success: true,
    errors: {},
    message: "Product submitted successfully!",
  };
}

export async function upvoteProductAction(productId:number) {

  try{

    const {userId} = await auth();
    const user = await currentUser();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to submit upvote a product.",
      };
    }
    await db.update(products).set({
      voteCount: sql`GREATEST(0, vote_count + 1)`
    }).where(eq(products.id, productId));
    revalidatePath("/");
    
    return {
      success:true,
      message:"Product upvoted successfully",
    }

  }
  catch(error){
    console.log(error)
    return{
      success:false,
      message:"failed to upvote a product",
      votecount:0
    }
  }

}
export async function downvoteProductAction(productId:number) {

  try{

    const {userId} = await auth();
    const user = await currentUser();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to submit downvote a product.",
      };
    }
    await db.update(products).set({
      voteCount: sql`GREATEST(0, vote_count - 1)`
    }).where(eq(products.id, productId));
    revalidatePath("/");
    
    return {
      success:true,
      message:"Product downvoted successfully",
    }

  }
  catch(error){
    console.log(error)
    return{
      success:false,
      message:"failed to downvote a product",
      votecount:0
    }
  }

}
