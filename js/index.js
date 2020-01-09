const API_ROOT = 'http://localhost:3000/projects';
let projectList = document.getElementById('project-lists-main');
let id;

(function handleProductList() {
  getProjectListData();
})();

function getProjectListData() {
  $.ajax({
    url: API_ROOT,
    type: 'get',
    crossDomain: true,
    success: function (res) {
      projectListData(res);
      const projectStatus = document.getElementsByClassName('single-status');
      setData(projectStatus);
    },
  });
}

function deleteProjectData(id, event) {
  $.ajax({
    url: `${API_ROOT}/${id}`,
    type: 'delete',
    crossDomain: true,
    success: function(res) {
      deleteProject(id, event);
      const projectStatus = document.getElementsByClassName('single-status');
      setData(projectStatus);
    },  // 请求成功后调用此方法
    // fail: function(error) {
    //   console.log('请求失败了哟');
    // }    // 请求失败或出错后调用此方法
  });
}

function projectListData(res) {
  let list = '';
  res.forEach(item => {
    list += `<tr id='${item.id}'><td>${item.name}</td><td><div id='description'>${item.description}</div></td>
    <td>${item.endTime}</td><td class='single-status'>${item.status}</td>
    <td><button class='btn'>删除</button></td></tr>`;
  });
  projectList.innerHTML = list;
}

function setData(projectStatus) {
  projectStatusArr = Array.from(projectStatus);
  let allCount = 0;
  let activeCount = 0;
  let pendingCount = 0;
  let closedCount = 0;

  projectStatusArr.map(item => {
    allCount ++;
    if (item.innerHTML === 'ACTIVE') {
      item.style.color = '#666666';
      activeCount ++;
    } else if (item.innerHTML === 'PENDING') {
      item.style.color = '#ee706d';
      pendingCount ++;
    } else if (item.innerHTML === 'CLOSED') {
      item.style.color = '#f7da47';
      closedCount ++;
    }
  });

  let activePercent = Number(activeCount / allCount).toFixed(2) * 100;
  let pendingPercent = Number(pendingCount / allCount).toFixed(2) * 100;
  let closedPercent = Number(closedCount / allCount).toFixed(2) * 100;

  $(".all-project").html(Number(allCount));
  $('.active-project').html(Number(activeCount));
  $('.pending-project').html(Number(pendingCount));
  $('.closed-project').html(Number(closedCount));
  $('.active-percent').html(`${activePercent}%`);
  $('.pending-percent').html(`${pendingPercent}%`);
  $('.closed-percent').html(`${closedPercent}%`);
}

function confirm(event) {
  let doc = document.documentElement;
  relHeight = (doc.clientHeight > doc.scrollHeight) ? doc.clientHeight : doc.scrollHeight;
  $('#mask').height(`${relHeight}px`);
  $('#mask').css('display','flex');
  id = event.target.parentNode.parentNode.getAttribute('id');
}

function deleteProject(id) {
  projectList.removeChild(document.getElementById(id));
  $('#mask').css('display','none');
  // let item = $userList.querySelector(`li[data-id='${id}']`);
  // $userList.removeChild(item);
}

$('body').click(event => {
  const target = event.target.innerHTML;
  if (target === '删除') {
    confirm(event);
  };
  if (target === '取消') {
    event.target.parentNode.parentNode.style.display = 'none';
  }
  if (target === '确认') {  
    deleteProjectData(id);
  }
});

$('.icon-guanbi').click(event => {
  event.target.parentNode.parentNode.style.display = 'none';
});



        