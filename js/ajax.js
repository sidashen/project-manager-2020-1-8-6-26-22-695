function myAjax(url, type, data, callback) {
  $.ajax({
  url: url,
  type: type,
  data: data,
  crossDomain: true,
  success: callback
  });
};