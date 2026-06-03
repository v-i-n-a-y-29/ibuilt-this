import SectionHeader from "@/components/common/section-header";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { SparkleIcon  , Sparkle, Sparkles} from "lucide-react";

export default function Submit() {
  return (
    <div className="wrapper py-20"> 
        <SectionHeader title="Submit Your Project" description="Share your project with the community by submitting it to our platform. Fill out the form below to get started and your product will be reviewed!" icon={Sparkles} />
        {/* Submission form goes here */}
        <ProductSubmitForm />

    </div>
    )
}