function sprint(input) {
    let n = Number(input.shift());
    let sprintCollection ={};
    let commandParser = {
        'Add New': addSprint,
        'Remove Task': removeSprint,
        'Change Status': changeStatus,
    };
    let ToDo = 0;
    let InProgress = 0;
    let CodeReview = 0;
    let Done = 0;


    for (let index = 0; index < n; index++) {
        const [assignee, taskId, title, status, estimatedPoints] = input.shift().split(':');
        if (sprintCollection.hasOwnProperty(assignee)){
            sprintCollection[assignee].push({taskId, title, status, estimatedPoints});
        } else {
            sprintCollection[assignee] = [];
            sprintCollection[assignee].push({taskId, title, status, estimatedPoints});
        }
    }

    for (let inputLine of input) {
        let commandTokens = inputLine.split(':');
        let command = commandTokens[0];
        commandParser[command](...commandTokens.slice(1));
      }

    for (const key in sprintCollection) {
        for (let i=0; i<sprintCollection[key].length;i++) {
            if (sprintCollection[key][i]['status'] === 'ToDo') {
                ToDo += Number(sprintCollection[key][i]['estimatedPoints']);
            }
            if (sprintCollection[key][i]['status'] === 'In Progress') {
                InProgress += Number(sprintCollection[key][i]['estimatedPoints']);
            }
            if (sprintCollection[key][i]['status'] === 'Code Review') {
                CodeReview += Number(sprintCollection[key][i]['estimatedPoints']);
            }
            if (sprintCollection[key][i]['status'] === 'Done') {
                Done += Number(sprintCollection[key][i]['estimatedPoints']);
            }
        }
    }

    console.log(`ToDo: ${ToDo}pts`);
    console.log(`In Progress: ${InProgress}pts`);
    console.log(`Code Review: ${CodeReview}pts`);
    console.log(`Done Points: ${Done}pts`);
    
    if (Done >= (ToDo + InProgress + CodeReview)) {
        console.log(`Sprint was successful!`);
    } else {
        console.log(`Sprint was unsuccessful...`);
    }

    function addSprint(assignee, taskId, title, status, estimatedPoints) {
        if (sprintCollection.hasOwnProperty(assignee)) {
            sprintCollection[assignee].push({taskId, title, status, estimatedPoints});
        } else {
          console.log(`Assignee ${assignee} does not exist on the board!`);
        }
    }

    function changeStatus(assignee, taskId, newStatus) {
        if (sprintCollection.hasOwnProperty(assignee)) {
            let statusChanged = 0;
            for (let i=0; i<sprintCollection[assignee].length; i++) {
                if (sprintCollection[assignee][i]['taskId'] === taskId) {
                    sprintCollection[assignee][i]['status'] = newStatus;
                    statusChanged = 1;
                }
            }
            if (statusChanged === 0) {
                console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
            }
        } else {
          console.log(`Assignee ${assignee} does not exist on the board!`);
        }
    }

    function removeSprint(assignee, index) {
        if (sprintCollection.hasOwnProperty(assignee)) {
            let statusRemoved = 0;
            if (sprintCollection[assignee].length > index && index >= 0) {
                sprintCollection[assignee].splice(index, 1);
                statusRemoved = 1;
            }
            if (statusRemoved === 0) {
                console.log(`Index is out of range!`);
            }
        } else {
          console.log(`Assignee ${assignee} does not exist on the board!`);
        }
    }
}


sprint([
        '5',
        'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
        'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
        'Peter:BOP-1211:POC:Code Review:5',
        'Georgi:BOP-1212:Investigation Task:Done:2',
        'Mariya:BOP-1213:New Account Page:In Progress:13',
        'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
        'Change Status:Peter:BOP-1290:ToDo',
        'Remove Task:Mariya:1',
        'Remove Task:Joro:1',
    ]
);
sprint(  [
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]
);
