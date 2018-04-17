document.addEventListener('DOMContentLoaded', function(){
  var ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
  var el = document.getElementById('counter');
  ws.onmessage = (function(data){
    el.innerHTML = data.data;
  });
});
