import { Header } from "../Header"
import { MovieWrapper } from "../MovieWrapper"
import "./style.css"
export const PageWrapper = () => {
    return (
        <>
            <section className="PageWrapper">
                <div className="wrapper">
                    <Header />
                    <MovieWrapper />
                </div>
            </section>
        </>
    )
}