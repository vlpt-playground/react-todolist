import React from 'react';
import './TodoReset.css';

const TodoReset = ({onReset}) => {
    return (
        <button onClick={onReset} className="TodoReset">
            초기화
        </button>
    );  
};

export default TodoReset;