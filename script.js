const numberOfPerfectStatus = 1000;
let neededPoints = [ 0, 0 ];
let perfectStatus = [ 1, 1, 1, 1, 1, 1 ];
let perfectStatuses = [];
let statusLimits;

(() => {
    buildNeededPoints();

    // document.querySelectorAll('.from,.to').forEach(fromTag => {
    //     fromTag.addEventListener('input', e => changeInput(e.target));
    // });

    document.getElementById('reset-btn').addEventListener('click', reset);
    document.getElementById('submit-btn').addEventListener('click', submit);
})();

function buildNeededPoints() {
    let sum = 0;
    let neededPoint = 1;
    for (let i = 2; i <= 130; i += 1) {
        if (i <= 100) {
            if (i % 10 == 2) {
                neededPoint += 1;
            }
        } else {
            neededPoint = 16 + (parseInt((i - 101) / 5)) * 4;
        }
        neededPoints.push(sum += neededPoint);
    }
}

function changeInput(e) {
    const fromTag = e.parentNode.querySelectorAll('.from')[0];
    const toTag = e.parentNode.querySelectorAll('.to')[0];

    if (parseInt(fromTag.value) >= parseInt(toTag.value)) {            
        if (e === fromTag) {
            toTag.value = fromTag.value;
        } else {
            fromTag.value = toTag.value;
        }
    }
}

function reset() {
    resetFromTags();
    resetToTags();
}

function resetFromTags() {
    document.querySelectorAll('.from').forEach(fromTag => {
        fromTag.value = fromTag.min;
    });
}

function resetToTags() {
    document.querySelectorAll('.to').forEach(toTag => {
        toTag.value = toTag.max;
    });
}

function submit() {
    document.getElementById('message-wrapper').innerHTML = 'Loading...';

    let innerHTML = '<tr><td>No.</td><td>S</td><td>A</td><td>V</td><td>I</td><td>D</td><td>L</td></tr>';
    document.getElementById('perfect-statuses-table').innerHTML = innerHTML;

    setTimeout(calculate, 100);
}

function calculate() {
    const fromTags = document.querySelectorAll('.from');
    const toTags = document.querySelectorAll('.to');
    statusLimits = Array.from(fromTags).map((f, i) => [ parseInt(f.value), parseInt(toTags[i].value) ]);
    
    perfectStatuses = [];
    dfs(0, 4151);
    
    document.getElementById('message-wrapper').innerHTML = 'Completed';
    showPerfectStatuses();
}

function dfs(statusNo, remainingPoints) {
    const statusLimit = statusLimits[statusNo];
    for (let i = statusLimit[0]; i <= statusLimit[1]; i += 1) {
        if (perfectStatuses.length >= numberOfPerfectStatus) {
            return;
        } else if (statusNo == 5) {
            if (remainingPoints == neededPoints[i]) {
                perfectStatus[statusNo] = i;
                console.log(perfectStatus);
                perfectStatuses.push(Array.from(perfectStatus));
                break;
            }
        } else if (remainingPoints >= neededPoints[i]) {
            perfectStatus[statusNo] = i;
            dfs(statusNo + 1, remainingPoints - neededPoints[i]);
        } else {
            break;
        }
    }
}

function showPerfectStatuses() {
    let table = document.getElementById('perfect-statuses-table');
    let innerHTML = '<tr><td>No.</td><td>S</td><td>A</td><td>V</td><td>I</td><td>D</td><td>L</td></tr>';
    perfectStatuses.forEach((status, i) => {
        innerHTML += `<tr><td>${i + 1}</td>`;
        status.forEach(s => innerHTML += `<td>${s}</td>`);
        innerHTML += `</tr>`;
    });
    table.innerHTML = innerHTML;
}