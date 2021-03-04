function add_listener(){
  window.roamAlphaAPI.data.addPullWatch(
  "[{:block/_refs [:block/string :block/uid]}]", 
  '[:node/title "PAGE_TO_LISTEN_FOR"]', 
    function a(before, after) {
        function sendNotification(body_text, block_url) {
            function httpGetAsync(theUrl) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange == function() {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
                        console.log(xmlHttp.responseText)
                };
                xmlHttp.open("GET", theUrl, !0);
                xmlHttp.send(null)
            };
            var j_d = JOIN_DEVICE_NAMES;
            var j_t = 'New%20Mention%20in%20Roam';
            var j_tx = body_text;
            var j_a = JOIN_API_KEY;
            var j_bu = 'https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?';
            var j_i_o = 'https://i.imgur.com/vgHSnQk.png';
            j_u = block_url;
            join_api_url = j_bu.concat('deviceNames=', j_d, '&text=', j_tx, '&title=', j_t, '&smallicon=', j_i_o, '&url=', j_u, '&apikey=', j_a);
            console.log(join_api_url);
            httpGetAsync(join_api_url)
        };

      block_uid = after[":block/_refs"][after[":block/_refs"].length - 1][":block/uid"];
      block_string = after[":block/_refs"][after[":block/_refs"].length - 1][":block/string"];

      block_url = 'https://roamresearch.com/#/app/YOUR_DB_NAME/page/' + block_uid;
      sendNotification(block_string, block_url);
      console.log(after);
      console.log(block_url);
    })
}