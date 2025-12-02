import BookDetail from '../../components/books/BookDetail'
import { useRouter } from 'next/router'
import GlobalContext from "../store/globalContext"
import { useContext } from 'react'

export default function () {
    const globalCtx = useContext(GlobalContext)
    const router = useRouter();

    let returnVal = null
    for (let ii = 0; ii < globalCtx.theGlobalObject.books.length; ii++) {
        let temp = globalCtx.theGlobalObject.books[ii]
        if (temp.bookId.trim() === router.query.bookId.trim()) {
            returnVal = (
                <BookDetail
                    image={temp.image}
                    title={temp.title}
                    description={temp.description}
                    publishDate={temp.publishDate}
                    author={temp.author}
                />
            )
        }
    }
    return
}
