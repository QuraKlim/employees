import React, { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { PropTypes } from 'prop-types';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 82
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharecters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }



    onCharsLoaded = (newChars) => {
        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    refsItems = [];

    setRef = (ref) => {
        this.refsItems.push(ref)
    }

    setCurrentChar = (id) => {
        this.refsItems.forEach(i => i.classList.remove('char__item_selected'));
        console.log(id)
        console.log(this.refsItems)
        this.refsItems[id].classList.add('char__item_selected');
        
    }

    listItems(chars) {
        const items = chars.map((i, counter) => {
            let imgStyle = {objectFit: "cover"};
            if (i.thumbnail.indexOf('not_available') > 1) {
                imgStyle = {objectFit: "contain"}
            }
            return(
                <li className="char__item" 
                    ref={this.setRef} 
                    key={i.id} 
                    onClick={() => {
                        this.props.onCharSelected(i.id);
                        this.setCurrentChar(counter);
                }}>
                    <img src={i.thumbnail} alt={i.name} style={imgStyle}/>
                    <div className="char__name">{i.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {chars, loading, error, newItemLoading, offset} = this.state;
        const elements = this.listItems(chars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null;
        return (

            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;