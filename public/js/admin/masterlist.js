const socket = io.connect('http://esms.test:8080');

socket.on('connect', () => {
    socket.emit('getFilteredMasterlist');
});

socket.on('receivedFilteredMasterlist', data => {
    console.table(data);
    // getData(data)
  
    const dataSet = [];
    if ($.fn.dataTable.isDataTable('#datatable')) {
        $('#datatable').DataTable().destroy();
        $('#datatable').empty();
    }
    if (!data) { }
    else {
        for (let i = 0; i < data.length; i++) {
            dataSet[i] = [
                data[i].id,
                data[i].fname,
                data[i].mname,
                data[i].lname,
                data[i].suffix,
                data[i].contact_no,
                data[i].precinct_no,
                data[i].address,
            ]
        }
        // console.log("myDataSET", getData(data))
    }

    const table = $('#datatable').DataTable({
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false,
      
        destroy: true,
        data: dataSet,
        columns: [
            { title: "ID" },
            { title: "First Name" },
            { title: "Middle Name" },
            { title: "Last Name" },
            { title: "Suffix" },
            { title: "Contact Number" },
            { title: "Precinct Number" },
            { title: "Address" },
        ],
        dom: 'lBfrtip', buttons: ['csv', 'colvis',
            {
                text: 'Import',
                action: function (e, dt, node, config) {
                    $('#import').modal('show');
                }
            }
        ]
    });
})

const importcsv = () => {
    var data = document.getElementById('file').value;
    const path = extractFilename(data);
    if (!path) { }
    else {
        $('#import').modal('hide');
        Swal.fire({
            title: "Uploading...",
            text: "Please wait",
            //  imageUrl: "../../img/spinner.gif",
            timer: 3000,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then(function () {
            socket.emit('onUploadCsv', path);            
            document.getElementById('file').value = "";
        });
    }
}


const extractFilename = path => {
    const pathArray = path.split("\\");
    //console.log('pathArray',pathArray);
    const lastIndex = pathArray.length - 1;
    //console.log('lastIndex',lastIndex);
    return pathArray[lastIndex];
};