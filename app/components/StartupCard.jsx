import { formatDate } from "../lib/utils";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const StartupCard = ({ post }) => {

    const {
        _createdAt,
        views,
        author,
        title,
        category,
        _id,
        image,
        description,
    } = post;

    return (

        <li className="max-w-sm bg-base-200 border-2 border-neutral py-6 px-5 rounded-2xl shadow-200 hover:border-info transition-all duration-200 hover:shadow-300 hover:bg-base-100 group">
            <div className="flex justify-between items-center">
                <p className="font-medium text-md   px-2 py-2 badge badge-info">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <FaEye className="text-secondary" size={24} />
                    <span className="font-medium text-md badge badge-outline badge-secondary">{views}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="font-medium text-lg text-neutral-800 line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="font-semibold text-xl text-neutral-800 line-clamp-1">{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img
                                src={author?.image}
                                alt={author?.name}
                            />
                        </div>
                    </div>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="font-normal text-md line-clamp-2 my-3 text-black-100 break-all">
                    {description}
                </p>
                <img src={image} alt="placeholder" className="w-full h-[164px] rounded-[10px] object-cover" />
            </Link>

            <div className="flex justify-between items-center gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="font-medium text-lg uppercase text-neutral-800">{category}</p>
                </Link>
                <button
                    className="rounded-full bg-black-200 font-medium text-[16px] text-neutral-content px-5 py-3 btn btn-active btn-neutral"
                >
                    <Link href={`/startup/${_id}`}>Details</Link>
                </button>
            </div>
        </li>
    );


}

export default StartupCard