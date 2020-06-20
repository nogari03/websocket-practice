// websocket &amp; stomp initialize
var sock = new SockJS("/ws-stomp");
var ws = Stomp.over(sock);
// vue.js
var vm = new Vue({
    el: '#app',
    data: {
        roomId: '',
        roomName: '',
        message: '',
        messages: [],
        token: '',
        userCount: 0
    },
    created() {
        this.roomId = localStorage.getItem('wschat.roomId');
        this.roomName = localStorage.getItem('wschat.roomName');
        var _this = this;
        axios.get('/chat/user').then(response => {
            _this.token = response.data.token;
            ws.connect({"token":_this.token}, function(frame) {
                ws.subscribe("/sub/chat/room/"+_this.roomId, function(message) {
                    var recv = JSON.parse(message.body);
                    _this.recvMessage(recv);
                });
            }, function(error) {
                alert("서버 연결에 실패 하였습니다. 다시 접속해 주십시요.");
                location.href="/room";
            });
        });
    },
    methods: {
        sendMessage: function(type) {
            ws.send("/pub/chat/message", {"token":this.token}, JSON.stringify({type:type, roomId:this.roomId, message:this.message}));
            this.message = '';
        },
        recvMessage: function(recv) {
            this.userCount = recv.userCount;
            this.messages.unshift({"type":recv.type,"sender":recv.sender,"message":recv.message})
        }
    }
});