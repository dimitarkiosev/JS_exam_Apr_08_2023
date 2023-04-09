window.addEventListener('load', solve);

function solve() {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const labelInput = document.getElementById('label');
    const pointsInput = document.getElementById('points');
    const assigneeInput = document.getElementById('assignee');
    const taskIdInput = document.getElementById('task-id');
    const taskSection = document.getElementById('tasks-section');
    const totalPoints = document.getElementById('total-sprint-points');

    const createBtn = document.getElementById('create-task-btn');
    const deleteBtn = document.getElementById('delete-task-btn');
    
    createBtn.addEventListener('click', addTask);
    deleteBtn.addEventListener('click', deleteTask);
    
    let task = 1;
    let pointsTotal = 0;
    let taskAll = {}
    totalPoints.innerText = `Total Points ${pointsTotal}pts`;

    function addTask(event) {
        if (event) {
            event.preventDefault();
        }

        let title = titleInput.value;
        let description = descriptionInput.value;
        let label = labelInput.value;
        let points = pointsInput.value;
        let assignee = assigneeInput.value;
        
        let taskId = `task-${task}`;
        taskAll[taskId] = {title, description, label, points, assignee};

        if (title !== '' && description !== '' && label !== '' && points !== '' && assignee !== '') {

            const article = createElement('article', '', taskSection, taskId, ['task-card'])
            const divFeature = createElement('div', '', article, '', ['task-card-label']);

            if (label === 'Feature') {
                divFeature.innerHTML = `Feature &#8865;`;
                divFeature.classList.add('feature');
            } else if (label === 'Low Priority Bug') {
                divFeature.innerHTML = `Low Priority Bug &#9737;`;
                divFeature.classList.add('low-priority');
            } else if (label === 'High Priority Bug') {
                divFeature.innerHTML = `High Priority Bug &#9888;`;
                divFeature.classList.add('high-priority');
            }
            createElement('h3', title, article, '', ['task-card-title']);
            createElement('p', description, article, '', ['task-card-description']);
            createElement('div', `Estimated at ${points} pts`, article, '', ['task-card-points']);
            createElement('div', `Assigned to: ${assignee}`, article, '', ['task-card-assignee']);
            const btnContainer = createElement('div', '', article, '', ['task-card-actions']);
            const deleteTaskBtn = createElement('button', 'Delete', btnContainer);
            deleteTaskBtn.addEventListener('click', loadDeleteTask);

            titleInput.value = '';
            descriptionInput.value = '';
            labelInput.value = '';
            pointsInput.value = '';
            assigneeInput.value = '';
            
            task += 1;
            pointsTotal += Number(points);
            totalPoints.innerText = `Total Points ${pointsTotal}pts`;
        }

        console.log(taskAll);
    }

    function loadDeleteTask() {
        const loadId = this.parentNode.parentNode.id;
        
        titleInput.value = taskAll[loadId]['title'];
        descriptionInput.value = taskAll[loadId]['description'];
        labelInput.value = taskAll[loadId]['label'];
        pointsInput.value = taskAll[loadId]['points'];
        assigneeInput.value = taskAll[loadId]['assignee'];
        
        titleInput.disabled = true;
        descriptionInput.disabled = true;
        labelInput.disabled = true;
        pointsInput.disabled = true;
        assigneeInput.disabled = true;

        taskIdInput.value = loadId.split('-')[1];

        createBtn.setAttribute('disabled', true);
        deleteBtn.removeAttribute('disabled');
    }

    function deleteTask(event) {
        if (event) {
            event.preventDefault();
        }

        id = 'task-' + taskIdInput.value;
        pointsTotal -= Number(pointsInput.value);
        totalPoints.innerText = `Total Points ${pointsTotal}pts`;
        taskIdInput.value = '';

        const deleteArticle = document.getElementById(id)
        deleteArticle.remove();

        titleInput.removeAttribute('disabled');
        descriptionInput.removeAttribute('disabled');
        labelInput.removeAttribute('disabled');
        pointsInput.removeAttribute('disabled');
        assigneeInput.removeAttribute('disabled');
        titleInput.value = '';
        descriptionInput.value = '';
        labelInput.value = '';
        pointsInput.value = '';
        assigneeInput.value = '';

        deleteBtn.setAttribute('disabled', true);
        createBtn.removeAttribute('disabled');
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

