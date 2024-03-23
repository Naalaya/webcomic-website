import Image from 'next/image'

import { FaUserTie } from "react-icons/fa";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ImPen } from "react-icons/im";
import { PrismaClient } from '@prisma/client'
import { FaRegListAlt } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import ComicMenu from '@/components/ComicMenu'


// async function getComic(params: any) {
//     const comic = await prisma.comics.findUniqueOrThrow({
//         where: {
//             id: params
//         },
//         select: {
//             id: true,
//             comicName: true,
//             comicImageLink: true,
//             isCompleted: true,
//             authorName: true,
//             comicDescription: true,
//             comicChapters: {
//                 select: {
//                     id: true,
//                     chapterNumber: true,
//                 }
//             },
//         },
//     })
//     return comic
// }

const getComic = async (comicID : any) => {
    const data = await fetch(
      `http://localhost:3000/api/comicpage?comicID=${comicID}`
    );
    return data.json();
  };

export default async function comicPage({params})  {
    const path = params['comic-page']
    console.log(path)
    const [count, comic] = await getComic(path);

    return (
        <div className='px-12 sm:px-42 py-5'>
            <div className="gap-5 flex pb-8">
                <div className=' flex rounded border-amber-400 border-4'>
                    <Image 
                        src={comic.comicImageLink}
                        width={150}
                        height={150}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        alt="Picture of comic"
                        className=''
                    />
                </div>
                <div className='text-left text-lg'>
                    <h1 className='font-bold'>{comic.comicName}</h1>
                    <ul className='leading-10'>
                        <li> <FaUserTie className='inline'/> Tác giả: {comic.authorName}</li>
                        <li> <RiCalendarCheckFill className='inline'/> Tình trạng: {comic.isCompleted}</li>
                    </ul>
                </div>
            </div>
            <div className='flex gap-3 items-center text-lg '>
                <ImPen className='inline'/>
                <p className='font-bold'> Giới thiệu</p>
            </div>
            <div>
                <p className='text-left text-lg pb-8 '>{comic.comicDescription}</p>
            </div>
            <div className='flex gap-3 items-center text-lg'>
                <FaRegListAlt/>
                <p className='font-bold'>Danh sách chương</p>
            </div>
            <div className='overflow-auto h-44'>
                <ComicMenu data={comic.comicChapters} path={path}/>
            </div>
            <div className='flex gap-3 items-center text-lg'>
                <FaRegCommentDots/>
                <p className='font-bold'>Bình luận</p>
            </div>
        </div>     
    );
};