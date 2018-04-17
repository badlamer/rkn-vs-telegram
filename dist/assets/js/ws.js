document.addEventListener('DOMContentLoaded', function(){
  var ws = new WebSocket("wss://" + window.location.host + ":8080");
  var el = document.getElementById('counter');
  ws.onmessage = (function(data){
    el.innerHTML = data.data;
  });
});
