import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="http://www.yuraklim.ru">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="http://www.yuraklim.ru">Characters</a></li>
                    /
                    <li><a href="http://www.yuraklim.ru">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;