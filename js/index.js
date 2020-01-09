const API_ROOT = 'http://localhost:3000/projects';
let projectList = document.getElementById('project-lists-main');

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
    },
  });
}

function projectListData(res) {
  let list = '';
  res.forEach(item => {
    list += `<tr><td>${item.name}</td><td><div class='description'>${item.description}</div></td>
    <td>${item.endTime}</td><td>${item.status}</td>
    <td><button class='btn'>删除</button></td></tr>`;
  });
  projectList.innerHTML = list;
}


