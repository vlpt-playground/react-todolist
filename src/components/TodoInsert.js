import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoInsert.css';


class TodoInsert extends Component {

    // propTypes 정의
    static propTypes = {
        onInsert: PropTypes.func
    }

    // 기본 props 정의
    static defaultProps = {
        onInsert: () => console.warn('onInsert not defined')
    }

    // 초기 state 정의
    state = {
        input: ''
    }

    handleChange = (e) => {
        // 이벤트에 전달된 값을 input 으로 설정
        this.setState({
            input: e.target.value
        });
    }

    handleClick = () => {
        // props 로 전달받은 onInsert 메소드 실행
        this.props.onInsert(this.state.input);
        this.setState({
            input: ''
        });
    }

    handleKeyPress = (e) => {
        // 엔터가 눌리면 handleClick 실행
        if(e.key === 'Enter') this.handleClick();
    }

    render() {

        const { input } = this.state;
        const { handleChange, handleClick, handleKeyPress } = this;

        return (
            <div className="TodoInsert">
                <input 
                    value={input}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleClick}>추가</button>
            </div>
        );
    }
}

export default TodoInsert;