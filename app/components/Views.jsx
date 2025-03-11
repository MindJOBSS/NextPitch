import { STARTUP_VIEWS_QUERY } from "../../sanity/lib/queries";
import { client } from "../../sanity/lib/client";
import { writeClient } from "../../sanity/lib/write-client";
import { after } from "next/server";

const Views = async ({ id }) => {

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );

  return (
    <div className="toast toast-bottom toast-end" >
      <div className="badge badge-outline badge-info badge-lg font-extrabold" >
        <div className="status status-md status-info" ></div>
        views: {totalViews}
      </div>
    </div>
  )
}

export default Views