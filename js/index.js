const API_ROOT = 'http://localhost:3000/projects';
let projectList = document.getElementById('project-lists-main');
let id;

getProjectListData();

function getProjectListData() {
  $.ajax({
    url: API_ROOT,
    type: 'get',
    crossDomain: true,
    success: function (res) {
      projectListData(res);
      const projectStatus = document.getElementsByClassName('single-status');
      setData(projectStatus);
    }
  });
}

function deleteProjectData(id) {
  $.ajax({
    url: `${API_ROOT}/${id}`,
    type: 'delete',
    crossDomain: true,
    success: function(res) {
      deleteProject(id);
      const projectStatus = document.getElementsByClassName('single-status');
      setData(projectStatus);
    }
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
    if ('ACTIVE' === item.innerHTML) {
      item.style.color = '#666666';
      activeCount ++;
    } else if ('PENDING' === item.innerHTML) {
      item.style.color = '#ee706d';
      pendingCount ++;
    } else if ('CLOSED' === item.innerHTML) {
      item.style.color = '#f7da47';
      closedCount ++;
    }
  });

  let activePercent = Math.floor((activeCount / allCount)* 100);
  let pendingPercent = Math.floor((pendingCount / allCount) * 100);
  let closedPercent = Math.floor((closedCount / allCount).toFixed(2) * 100);

  $(".all-project").html(Number(allCount));
  $('.active-project').html(Number(activeCount));
  $('.pending-project').html(Number(pendingCount));
  $('.closed-project').html(Number(closedCount));

  if (0 === allCount) {
    $('.active-percent').html(`0%`);
    $('.pending-percent').html(`0%`);
    $('.closed-percent').html(`0%`);
  } else {
    $('.active-percent').html(`${activePercent}%`);
    $('.pending-percent').html(`${pendingPercent}%`);
    $('.closed-percent').html(`${closedPercent}%`);
  }
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
}

$('body').click(event => {
  let {classList} = event.target;

  if (classList.contains('btn')) {
    confirm(event);
  }
  if (classList.contains('cancle-btn')) {
    event.target.parentNode.parentNode.style.display = 'none';
  }
  if (classList.contains('confirm-btn')) {
    deleteProjectData(id);
  }
  if (classList.contains('icon-guanbi')) {
    event.target.parentNode.parentNode.style.display = 'none';
  }
});




        