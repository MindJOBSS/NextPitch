import StartupForm from "../../../components/StartupForm"
import { auth } from "../../../../auth"
import { redirect } from "next/navigation";


const page = async () => {

    const session = await auth();
    
    if(!session) redirect("/");

    return (
        <div>

            <div
                className="hero min-h-[60vh] bg-top"
                style={{
                    backgroundImage: "url(/heroimage.jpg)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div>
                        <h1 className="mb-5 text-5xl font-bold uppercase ">Submit Your Form</h1>
                    </div>
                </div>
            </div>

            <StartupForm/>

        </div>
    )
}

export default page