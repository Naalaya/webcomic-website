import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import ComicTag from "@/components/ComicTag";

const getData = async (page: any, offset: any, ctid: any) => {
  const query = {
    page: page,
    offset: offset,
    categoryIds: ctid,
  };
  const urlPage = process.env.NEXT_URL;
  let url = `${urlPage}/api/comic?`;
  Object.entries(query).forEach(([key, value], index) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  const data = await fetch(url, { cache: "no-store" });
  return data.json();
};
const getCategory = async () => {
  const urlPage = process.env.NEXT_URL;
  const responseComicTypes = await fetch(`${urlPage}/api/comicTypes`);
  return responseComicTypes.json();
};

export default async function SearchType({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  const categoryIDs = searchParams["categoryIds"];
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const { totalComicsCount, comics } = await getData(page, 40, categoryIDs);
  const category = await getCategory();
  console.log(category);
  return (
    <div className="container mx-auto">
      {/* <ComicTag data={category}/> */}
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={40} />
    </div>
  );
}
