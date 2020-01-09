const API_ROOT = 'http://localhost:3000/projects';
let projectList = document.getElementById('project-lists-main');

(function handleProductList(projectStatus) {
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
      setFontColor(projectStatus);
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
}



