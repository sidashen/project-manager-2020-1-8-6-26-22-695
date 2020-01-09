const API_ROOT = 'http://localhost:3000/projects';
let projectList = document.getElementById('project-lists-main');
let projectAllCount = document.getElementsByClassName('all-project')[0];
let projectActiveCount = document.getElementsByClassName('active-project')[0];
let projectPendingCount = document.getElementsByClassName('pending-project')[0];
let projectClosedCount = document.getElementsByClassName('closed-project')[0];

(function handleProductList() {
  getListData();
})();

function getListData() {
  $.ajax({
    url: API_ROOT,
    type: 'get',
    dataType: 'jsonp',  
    crossDomain: true,
    success: function (res) {
      projectListData(res);
      const projectStatus = document.getElementsByClassName('single-status');
      const projectStatusArr = setFontColor(projectStatus);
      setCount(projectStatusArr);
    },
  });
}

function projectListData(res) {
  let list = '';
  res.forEach(item => {
    list += `<tr><td>${item.name}</td><td><div id='description'>${item.description}</div></td>
    <td>${item.endTime}</td><td class='single-status'>${item.status}</td>
    <td><button class='btn'>删除</button></td></tr>`;
  });
  projectList.innerHTML = list;
}

function setFontColor(projectStatus) {
  projectStatusArr = Array.from(projectStatus);
  projectStatusArr.map(item => {
    if (item.innerHTML === 'ACTIVE') {
      item.style.color = '#666666';
    } else if (item.innerHTML === 'PENDING') {
      item.style.color = '#ee706d';
    } else if (item.innerHTML === 'CLOSED') {
      item.style.color = '#f7da47';
    }
  });
  return projectStatusArr;
}

function setCount(projectStatusArr) {
  let allCount = 0;
  let activeCount = 0;
  let pendingCount = 0;
  let closedCount = 0;

  projectStatusArr.forEach(item => {
    allCount ++;
  if (item.innerHTML === 'ACTIVE') {
    activeCount ++;
  } else if (item.innerHTML === 'PENDING') {
    pendingCount ++;
  } else if (item.innerHTML === 'CLOSED') {
    closedCount ++;
  }
  });
  projectAllCount.innerHTML = Number(allCount);
  projectActiveCount.innerHTML = Number(activeCount);
  projectPendingCount.innerHTML = Number(pendingCount);
  projectClosedCount.innerHTML = Number(closedCount);
}

