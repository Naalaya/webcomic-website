import comic from '@/app/comic/page'
import Link from 'next/link'


export default function ComicMenu({data, path}){
    console.log(data)
    return (
        data.map((chapter) => (      
            <div className=' overflow-auto'>
                <ol className='leading-8  hover:text-red-300 transition-opacity duration-300'>
                    <li><Link href= {`${path}/${chapter.chapterNumber}`}>Chương {chapter.chapterNumber}</Link></li>
                </ol>
            </div>
            
        ))  
    )

}
