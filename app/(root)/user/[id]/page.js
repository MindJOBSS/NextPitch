import { auth } from "../../../../auth";
import { client } from "../../../../sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "../../../../sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "../../../components/UserStartups";
import { Suspense } from "react";

export const experimental_ppr = true;

const Page = async ({ params }) => {
  const query = await params;
  const id = query.id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <section className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-secondary border border-base-300 rounded-lg shadow-md p-6 flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-secondary-content uppercase text-center truncate">
          {user.name}
        </h3>

        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="rounded-full shadow-lg mt-4"
        />

        <p className="text-xl font-bold text-secondary-content mt-5 text-center">
          @{user.username}
        </p>
        <p className="text-base text-secondary-content mt-2 text-center">
          {user.bio}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        <p className="text-2xl font-semibold text-neutral-800">
          {session?.id === id ? "Your" : "All"} Startups
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<span className="loading loading-dots loading-md"></span>}>
            <UserStartups id={id} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default Page;
