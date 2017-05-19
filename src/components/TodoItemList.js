import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoItemList.css';

const TodoItemList = ({ items, onToggle, onRemove }) => {


    // TodoItem 컴포넌트들의 배열로 변환해줍니다
    const itemList = items.map(
        (item/*, index*/) => ( // 첫번째 인자는 배열의 원소, 두번째 인자는 순서번호가 전달됩니다.
            <TodoItem
                key={item.id}
                id={item.id}
                name={item.name}
                finished={item.finished}
                onToggle={onToggle}
                onRemove={onRemove}
            />
        )
    )

    return (
        <div className="TodoItemList">
            {itemList}
        </div>
    );
};


TodoItemList.propTypes = {
    items: PropTypes.array,
    onToggle: PropTypes.func,
    onRemove: PropTypes.func
}
TodoItemList.defaultProps = {
    items: [],
    onToggle: () => console.log('onToggle not defined'),
    onRemove: () => console.log('onRemove not defined')
}


export default TodoItemList;