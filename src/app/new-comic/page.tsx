// "use client";
import React, { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import PaginationControls from "@/components/PaginationControl";
const getData = async (page, offset) => {
  const data = await fetch(
    `http://localhost:3000/api/comic?page=${page}&offset=${offset}`
  );
  const dataJson = await data.json();
  return dataJson;
};

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const perPage = 40;
  const { totalComicsCount, comics } = await getData(page, perPage);
  return (
    <div className="container p-auto pt-4 text-center m-auto ">
      <Suspense fallback={<p>Loading feed...</p>}>
        <Container data={comics} />
      </Suspense>

      <PaginationControls count={totalComicsCount} perPage={perPage} />
    </div>
  );
}

// export default page
