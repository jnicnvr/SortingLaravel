const socket = io.connect('http://esms.test:8080');

socket.on('connect', () => {
    socket.emit('getDeletedRecord');
});

socket.on('receivedDeletedRecords', data => {
    console.log("receivedDeletedRecords",data);
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
            // {
            //     title: "Action",
            //     "data": null,
            //     "defaultContent": '<button type="button" onClick="swalConfirmation()" class="text-white btn-danger btn-xs mx-1">Decline</button>'

            //     // '<button type="button" onClick="swalConfirmation()" class="text-white btn-success btn-xs mx-1">Accept</button>' +
            // }
        ],
        dom: 'lBfrtip', buttons: [ 'csv', 'colvis'
            // {
            //     text: 'Import',
            //     action: function (e, dt, node, config) {
            //         $('#import').modal('show');
            //     }
            // }
        ]
    });

    $('#datatable tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        // swalConfirmation([            
        //     data[1],
        //     data[2],
        //     data[3],
        //     data[4],
        //     data[5],
        //     data[6]
        // ])
    });
})
