import { IoSearch } from "react-icons/io5";
import Form from "next/form";
import StartupCard from "../components/StartupCard";
import { STARTUPS_QUERY } from "../../sanity/lib/queries";
import { sanityFetch , SanityLive } from "../../sanity/lib/live";
import { auth, signOut, signIn } from "../../auth";

export default async function Page({ searchParams }) {

  const session = await auth();

  console.log(session?.id);

  const query = (await searchParams).query;
  const params = {search : query || null};
  const {data : posts} = await sanityFetch({query : STARTUPS_QUERY , params});


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
            <h1 className="mb-5 text-5xl font-bold uppercase ">pitch your start up , connect with entrepreneurs</h1>
            <p className="mb-5 text-lg">
              Submit your Ideas , Vote on Pitches , Get Noticed in Virtual Competitions
            </p>
            <Form action="/" className="join" scroll={false} >
              <input className="input input-secondary w-lg text-neutral-500 join-item" placeholder="Search Startups" name="query" ></input>
              <button className="btn btn-secondary join-item"><IoSearch size={20} /></button>
            </Form>
          </div>
        </div>
      </div>
      <section className="px-6 py-10 max-w-7xl mx-auto" >
      <div className="text-3xl font-semibold text-neutral-600 p-6">
        {query ? <p>Search Results For <span className="text-secondary" >"{query}"</span></p> : "All Startups"}
      </div>
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <StartupCard key={post?._id} post={post} />
          ))
        ) : (
          null
        )}
      </ul>
      </section>
      <SanityLive/>
    </div >
  );
}