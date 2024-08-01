import Link from "next/link";

export default function PageNotFound(){
    return <div className="flex items-center flex-col h-screen justify-center">
        Oops the page can not be found
        <br/>
        <Link className="underline" href={'/'}>Go home</Link>
    </div>
}