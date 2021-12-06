const socket = io.connect('http://esms.test:8080');

socket.on('connect', () => {
    socket.emit('getRecordSummary');
});

socket.on('receivedRecordSummary', ([data]) => {
    console.log(data);
    if(!data){console.log('Found no data')}else{
        $('#total').text(data.total);
        // $('#duplicated').text(data.duplicated);
    }
})