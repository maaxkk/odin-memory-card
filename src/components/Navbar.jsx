
import '../styles/Navbar.css'
function Navbar({score, bestScore}) {

    return (
        <nav className={'navbar'}>
            <h1 className={'navbar--title'}>Memory card game</h1>
            <div className={'navbar--container'}>
                <p className={'navbar--score'}>Score: {score}</p>
                <p className={'navbar--bestscore'}>Best score: {bestScore}</p>
            </div>
        </nav>
    )
}


export {Navbar}