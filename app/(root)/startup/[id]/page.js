import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "../../../../sanity/lib/queries";
import { formatDate } from "../../../../app/lib/utils";
import markdownit from "markdown-it";
import { Suspense } from "react";
import Views from "../../../../app/components/Views";

export const experimental_ppr = true;

const md = markdownit()

const page = async ({ params }) => {

  const params_id = await params;
  const id = params_id.id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

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
            <p className="mb-5 text-lg">{formatDate(post?._createdAt)}</p>
            <h1 className="mb-5 text-5xl font-bold uppercase ">{post.title}</h1>
            <p className="mb-5 text-lg">{post.description}</p>
          </div>
        </div>
      </div>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full shadow-md"
              />

              <div>
                <p className="text-lg font-medium text-neutral-800">{post.author.name}</p>
                <p className="text-md font-medium text-neutral-500">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="text-md font-medium badge badge-secondary px-4 py-2 rounded-full">
              {post.category}
            </p>
          </div>

          <h3 className="text-2xl font-bold text-neutral-800">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-sans break-words"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-gray-500 text-sm font-normal">No details provided</p>
          )}

          <hr className="border-t border-dotted border-gray-400 max-w-4xl my-10 mx-auto" />

        </div>

      </section>

      <Suspense>
          <Views id={id}/>
      </Suspense>



    </div>
  )
}

export default page