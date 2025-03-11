"use client";
import { IoIosSend } from "react-icons/io";
import MDEditor from "@uiw/react-md-editor";
import React, { useState, useActionState } from "react";
import { createPitch } from "../lib/action";
import { useRouter } from "next/navigation";

const StartupForm = () => {

    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link"),
                pitch,
            };

            const result = await createPitch(prevState, formData, pitch);
            if (result.status == "SUCCESS") {
                router.push(`/startup/${result._id}`);
              }


        } catch (error) {
            return { ...prevState, error: "Validation failed", status: "ERROR" };
        } 
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" })


    return (
        <div>
            <form action={formAction} className="max-w-2xl mx-auto bg-base-100 my-10 space-y-8 px-6 py-8 border border-base-300 rounded-lg shadow-md">
                <div>
                    <label htmlFor="title" className="block text-lg font-bold text-neutral-800 uppercase">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="w-full input input-neutral px-4 py-3 text-base text-neutral-800 mt-2"
                        required
                        placeholder="Startup Title"
                    />

                </div>

                <div>
                    <label htmlFor="description" className="block text-lg font-bold text-neutral-800 uppercase">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full p-4 text-base text-neutral-800 mt-2 textarea textarea-neutral"
                        required
                        placeholder="Startup Description"
                    />

                </div>

                <div>
                    <label htmlFor="category" className="block text-lg font-bold text-neutral-800 uppercase">
                        Category
                    </label>
                    <input
                        id="category"
                        name="category"
                        className="w-full input input-neutral px-4 py-3 text-base text-neutral-800 mt-2"
                        required
                        placeholder="Startup Category (Tech, Health, Education...)"
                    />

                </div>

                <div>
                    <label htmlFor="link" className="block text-lg font-bold text-neutral-800 uppercase">
                        Image URL
                    </label>
                    <input
                        id="link"
                        name="link"
                        className="w-full input input-neutral px-4 py-3 text-base text-neutral-800 mt-2"
                        required
                        placeholder="Startup Image URL"
                    />

                </div>

                <div data-color-mode="light">
                    <label htmlFor="pitch" className="block text-lg font-bold text-gray-800 uppercase">
                        Pitch
                    </label>
                    <MDEditor
                        value={pitch}
                        onChange={(value) => setPitch(value)}
                        id="pitch"
                        preview="edit"
                        height={300}
                        style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #d1d5db" }}
                        textareaProps={{
                            placeholder: "Briefly describe your idea and what problem it solves",
                            className: "w-full p-4 text-base text-gray-800 focus:outline-none",
                        }}
                        previewOptions={{
                            disallowedElements: ["style"],
                        }}
                    />

                </div>
                <button className="btn btn-secondary btn-active w-full px-6 py-3 rounded-lg shadow-md hover:bg-secondary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isPending} >
                    {isPending ? "Submitting..." : "Submit Your Pitch"}
                    <IoIosSend size={20} />
                </button>
            </form>

        </div>

    )
}

export default StartupForm