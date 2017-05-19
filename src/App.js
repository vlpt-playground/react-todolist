import React, { Component } from 'react';
import shortId from 'shortid';
import TodoInsert from './components/TodoInsert';
import TodoItemList from './components/TodoItemList';
import TodoReset from './components/TodoReset';
import './App.css';

// 고유번호와 완료값을 가진 Todo 객체를 만든다
function createItem(name) {
    return {
        id: shortId.generate(),
        name,
        finished: false
    }
}

// 기본 Todo 목록 설정
const defaultTodos = [
    '리액트 시작하기',
    '컴포넌트 이해하기',
    'props/state 사용하기',
    'LifeCycle API'
].map(createItem); // 각 원소들을 createItem 함수를 실행해서 변환해준다


class App extends Component {

    state = {
        todoItems: defaultTodos
    }



    constructor(props) {
        super(props);
        const todos = localStorage.getItem('todos');
        if(todos) {
            this.state = {
                todoItems: JSON.parse(todos)
            };
        }
    }

    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('todos', JSON.stringify(this.state.todoItems));
    }
    
    // Todo 추가
    handleInsert = (name) => {
        this.setState({
            todoItems: [
                ...this.state.todoItems,
                createItem(name)
            ]
        })

        // ... : spread 문법은 기존 배열복사해서 넣어줍니다
        // todoItems: this.state.todoItems.concat(createItem(name)) 을 해도 됩니다.
    }

    // Todo 완료값 토글
    handleToggle = (id) => {
        // 레퍼런스를 사전 생성해줍니다.
        const { todoItems } = this.state;
        const index = todoItems.findIndex(item => item.id === id);
        const item = todoItems[index];

        this.setState({
            todoItems: [
                // slice(a, b) 함수는 a 번째부터 부터 b 전까지의 원소들을 추춣해줍니다
                ...todoItems.slice(0, index),
                {
                    ...item,
                    // 기존의 아이템 값에 finished 값을 덮어 씌워 줍니다
                    finished: !item.finished
                },
                ...todoItems.slice(index+1, todoItems.length)
            ]
        });
    }

    // Todo 삭제
    handleRemove = (id) => {
        // 레퍼런스를 사전 생성해줍니다.
        const { todoItems } = this.state;
        const index = todoItems.findIndex(item => item.id === id);

        this.setState({
            todoItems: [
                // slice(a, b) 함수는 a 번째부터 부터 b 전까지의 원소들을 추춣해줍니다
                ...todoItems.slice(0, index),
                ...todoItems.slice(index+1, todoItems.length)
            ]
        });
    }

    // 초기화
    handleReset = () => {
        this.setState({
            todoItems: defaultTodos
        });
    }

    render() {
        // 추후 편의를 위하여 레퍼런스를 만들어줍니다
        const { 
            handleInsert,
            handleRemove,
            handleToggle,
            handleReset
        } = this;

        const { todoItems } = this.state;
        
        return (
            <div className="App">
                <h1>TODO LIST</h1>
                <TodoReset onReset={handleReset}/>
                <TodoInsert onInsert={handleInsert}/>
                <TodoItemList items={todoItems} onToggle={handleToggle} onRemove={handleRemove}/>
            </div>
        );
    }
}

export default App;