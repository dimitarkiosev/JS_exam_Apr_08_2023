
function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    const loadBtn = document.getElementById('load-board-btn');
    const createBtn = document.getElementById('create-task-btn');
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('description');

    const todoContainer = document.querySelector('#todo-section > ul');
    const inProgresContainer = document.querySelector('#in-progress-section > ul');
    const codeReviewContainer = document.querySelector('#code-review-section > ul');
    const doneContainer = document.querySelector('#done-section > ul');

    loadBtn.addEventListener('click', loadTasks);
    createBtn.addEventListener('click', addTask);

    function loadTasks(event) {
        if (event) {
            event.preventDefault()
        }
        todoContainer.innerHTML = '';
        inProgresContainer.innerHTML = '';
        codeReviewContainer.innerHTML = '';
        doneContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((tasksRes) => 
            {
                let container = '';
                let textBtn = '';
                tasks = Object.values(tasksRes);
                for (let i=0; i<tasks.length; i++) {
                    let {title, description, status, _id} = tasks[i];
                    if (status === 'ToDo') {
                        container = todoContainer;
                        textBtn = 'Move to In Progress';
                    } else if (status === 'In Progress') {
                        container = inProgresContainer;
                        textBtn = 'Move to Code Review';
                    } else if (status === 'Code Review') {
                        container = codeReviewContainer;
                        textBtn = 'Move to Done';
                    } else if (status === 'Done') {
                        container = doneContainer;
                        textBtn = 'Close';
                    }
                    const liContainer = createElement('li', '', container, _id, ['task']);
                    createElement('h3', title, liContainer);
                    createElement('p', description, liContainer);
                    const liBtn = createElement('button', textBtn, liContainer);
                    liBtn.addEventListener('click',moveDeleteTask);
                }
                console.log(tasks);
            })
            .catch((err) => console.error(err))
    }

    function addTask(event) {
        const title = titleInput.value;
        const description = descInput.value;
        const status = 'ToDo';

        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "description": description,
                "status": status
            })
        }
        
        if (title !== '' && description !== '' && status !== '') {
            fetch(BASE_URL, httpHeaders)
                .then(() => {
                    loadTasks();
                    titleInput.value = '';
                    descInput.value = '';
                })
                .catch((err) => console.error(err))
        }
    }

    function moveDeleteTask(event) {
        if (event) {
            event.preventDefault()
        }

        const taskContainer = this.parentNode;
        const idChange = taskContainer.id;
        const titleChange = taskContainer.getElementsByTagName('h3')[0].innerText;
        const descChange = taskContainer.getElementsByTagName('p')[0].innerText;

        let status = '';
        console.log(this.innerText);

        if (this.innerText === 'Close') {
            const httpHeaders = {
                method: 'DELETE'
            };
            fetch(BASE_URL + idChange, httpHeaders)
                .then(() => loadTasks())
                .catch((err) => console.error(err))
        } else if (this.innerText === 'Move to Done') {
            status = 'Done';
        } else if (this.innerText === 'Move to Code Review') {
            status = 'Code Review';
        } else if (this.innerText === 'Move to In Progress') {
            status = 'In Progress';
        }

        if (status !== '') {
            const httpHeaders = {
                method: 'PATCH',
                body: JSON.stringify({
                    "title": titleChange,
                    "description": descChange,
                    "status": status
                })
            }
        
            fetch(BASE_URL + idChange, httpHeaders)
                .then(() => {
                    loadTasks();
                })
                .catch((err) => console.error(err))
        }


    }

    function deleteTask() {

    }

    function createElement(type, content, parentNode, id, classes, attributes) {
        const htmlElement = document.createElement(type);
        if (content && type !== 'input') {
            htmlElement.textContent = content;
        }
        if (content && type === 'input') {
            htmlElement.value = content;
        }
        if (id) {
            htmlElement.id = id;
        }
        // ['list', 'item',...]
        if (classes) {
            htmlElement.classList.add(...classes);
        }
        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }
        //{ src: 'link to iamge', href: 'link to site', type: 'checkbox'}
        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key]);
            }
        }
        return htmlElement;
    }
}

attachEvents();
