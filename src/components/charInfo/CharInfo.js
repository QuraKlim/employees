import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import { PropTypes } from 'prop-types';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return
        }
        this.setState({
            loading: true
        })
        this.marvelService
            .getCharecter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false})
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true})
    }

    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View comics={this.props.comics} char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = (props) => {
    const {name, description, thumbnail, homepage, wiki} = props.char;
    const comics = props.comics;

    let imgStyle = {objectFit: "cover"};
    if (thumbnail.indexOf('not_available') > 1) {
        imgStyle = {objectFit: "contain"}
    }

    return(
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Sorry, there is no comics with this character(s)'}
                {
                    comics.map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                <a target="_blank" rel="noreferrer" href={item.url}>{item.name}</a>
                            </li>
                        )
                    })
                }
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;