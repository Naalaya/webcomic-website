import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ImPen } from "react-icons/im";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import ComicMenu from "@/app/comic/[comic-page]/_components/ComicMenu";
import ComicPageButton from "@/app/comic/[comic-page]/_components/ComicPageButtons";
import CommentInput from "@/components/CommentInput";
import CommentContainer from "@/components/CommentContainer";
import initialUser from "@/lib/initial-user";
import ComicTags from "./_components/ComicTags";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const getComic = async (comicID: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(`${urlPage}/api/comic/${comicID}`, {
    cache: "no-cache",
  });
  if (data.status === 404) notFound();
  return data.json();
};

export default async function comicPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const path = params["comic-page"];
  const comicFetch = getComic(path);
  const profileFetch = initialUser();
  const [comic, profile] = await Promise.all([comicFetch, profileFetch]);
  // const currentEvent = await getCurrentEvents(path, profile?.id);
  // const profile = await initialUser();
  // const comic = await getComic(path, profile?.id);
  const query = searchParams["commentID"];
  // console.log(comic);

  return (
    // <Suspense>
    <div className="px-12 sm:px-42 py-5">
      <div className="gap-10 flex pb-8">
        <div className="rounded border-amber-400 border-4 w-60 hidden md:inline">
          <Image
            src={comic.comicImageLink}
            width={150}
            height={150}
            style={{
              width: "100%",
              height: "100%",
            }}
            alt="Picture of comic"
          />
        </div>
        <div className="text-left text-lg">
          <h1 className="font-bold">{comic.comicName}</h1>
          <ul className="leading-10">
            <li>
              {" "}
              <FaUserTie className="inline" /> Tác giả: {comic.authorName}
            </li>
            <li>
              {" "}
              <RiCalendarCheckFill className="inline" /> Tình trạng:{" "}
              {comic.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
            </li>
            <li>
              {" "}
              <FaHeart className="inline" /> Lượt theo dõi:{" "}
              {comic._count.events}
            </li>
            <li>
              {" "}
              <FaRegEye className="inline" /> Lượt xem: {comic._count.viewCount}
            </li>
            <li>
              {" "}
              <IoPricetags className="inline" /> Tags:{" "}
              {comic.comicTypes.length > 0 && (
                <ComicTags data={comic.comicTypes} />
              )}
            </li>
          </ul>
          <div className="flex gap-5 mt-6">
            <Link
              hidden={comic.comicChapters.length < 1}
              href={"/comic/" + comic.id + "/" + "1"}
            >
              <Button className="font-bold" color="warning">
                Đọc từ đầu
              </Button>{" "}
            </Link>
            <Suspense>
              <ComicPageButton profileFetch={profile!} comicId={path} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center text-lg ">
        <ImPen className="inline" />
        <p className="font-bold"> Giới thiệu</p>
      </div>
      <div>
        <p className="text-left text-lg pb-8 ">{comic.comicDescription}</p>
      </div>
      <div className="flex gap-3 items-center text-lg">
        <FaRegListAlt />
        <p className="font-bold">Danh sách chương</p>
      </div>
      <div className="overflow-auto h-44">
        <ComicMenu data={comic.comicChapters.reverse()} path={path} />
      </div>
      <div className="flex gap-3 items-center text-lg">
        <FaRegCommentDots />
        <p className="font-bold">Bình luận</p>
      </div>
      <CommentInput user={profile} comicsID={path} />
      <Suspense>
        <CommentContainer
          comicID={path}
          user={profile}
          query={query as string | undefined}
        />
      </Suspense>
    </div>
    // </Suspense>
  );
}
