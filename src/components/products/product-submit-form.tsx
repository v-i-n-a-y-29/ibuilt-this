'use client'
import { addProductAction } from "@/lib/products/product-actions";
import type { FormState } from "@/lib/products/product-actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { LoaderIcon, Sparkles } from "lucide-react";
import { useActionState } from "react";


const initialState: FormState = {
    success: false,
    errors: {},
    message: ''
}


export default function ProductSubmitForm() {

    const [state, formAction, isPending] = useActionState(addProductAction, initialState);

    const {errors, message, success} = state;
    return (
        <form className="max-w-2xl mx-auto" action={formAction}>
            <div className="mb-6 ">
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                </Label>
                <Input type="text" id="name" name="name" placeholder="My Product" onChange={() => { }} 
                className={errors.name ? "border-red-500" : ""} />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}

                <Label htmlFor="slug" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Slug
                </Label>
                <Input type="text" id="slug" name="slug" placeholder="my-awesome-product" onChange={() => { }} 
                className={errors.slug ? "border-red-500" : ""} />
                {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug}</p>}
                <p className="text-sm text-gray-500 mt-1">
                    URL-friendly version of your product name
                </p>

                <Label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Tagline
                </Label>
                <Input type="text" id="tagline" name="tagline" placeholder="A brief , catchy  description" onChange={() => { }} 
                className={errors.tagline ? "border-red-500" : ""} />
                {errors.tagline && <p className="text-sm text-red-500 mt-1">{errors.tagline}</p>}

                <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Description
                </Label>
                <Textarea id="description" name="description" placeholder="Tell us more about your product..." onChange={() => { }} 
                className={errors.description ? "border-red-500" : ""} />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}

                <Label htmlFor="website" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Website URL
                </Label>
                <Input type="url" id="website" name="websiteUrl" placeholder="https://example.com" onChange={() => { }} 
                className={errors.websiteUrl ? "border-red-500" : ""} />
                {errors.websiteUrl && <p className="text-sm text-red-500 mt-1">{errors.websiteUrl}</p>}

                <Label htmlFor="tags" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Tags
                </Label>
                <Input type="text" id="tags" name="tags" placeholder="AI , Productivity , Saas" onChange={() => { }} 
                className={errors.tags ? "border-red-500" : ""} />
                {errors.tags && <p className="text-sm text-red-500 mt-1">{errors.tags}</p>}
                <p className="text-sm text-gray-500 mt-1">
                    Comma-separated tags to categorize your product
                </p>
            </div>
            <Button type="submit" className="px-4 py-2 bg-primary min-w-full h-10 text-white rounded hover:bg-primary-dark transition cursor-pointer" disabled={isPending}>
                {isPending ? (
                    <LoaderIcon className="animate-spin size-5 text-white" />
                ) : (
                    <>
                        <Sparkles className="size-4 mr-2" />
                        Submit Product
                    </>
                )}
            </Button>
        </form>
    );
}
