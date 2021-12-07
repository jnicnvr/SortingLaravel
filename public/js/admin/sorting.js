const socket = io.connect('http://esms.test:8080');
let table;
socket.on('connect', () => {

    //socket.emit('sortMasterlist');
    //  socket.emit('getMasterlist');

});

socket.on('onReloadMasterlist', () => {
    let filterData = $('#filter').find(":selected").text();
    console.log(filterData);
    socket.emit('getMasterlist',filterData);
})

const isFilteredData = () => {
    let filterData = $('#filter').find(":selected").text();
    console.log(filterData);
    socket.emit('getMasterlist', filterData);
}
socket.on('receivedMasterlist', data => {


    console.log("receivedMasterlist", data);
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

    table = $('#datatable').DataTable({
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false,
        stateSave: true,
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
            {
                title: "Action",
                "data": null,
                "defaultContent": '<button type="button" onClick="removeDataTable()" class="text-white btn-danger btn-xs mx-1">Delete</button>'
            }
        ],
        dom: 'lBfrtip', buttons: ['csv', 'colvis'
            // {
            //     text: 'Import',
            //     action: function (e, dt, node, config) {
            //         $('#import').modal('show');
            //     }
            // }
        ]

    });



})


const removeDataTable = () => {
    $('#datatable tbody').on('click', 'button', function () {
        // e.preventDefault();        
        console.log('deleted')
        var data = table.row($(this).parents('tr')).data();
        // swalConfirmation([
        //     data[0],
        //     data[1],
        //     data[2],
        //     data[3],
        //     data[4],
        //     data[5],
        //     data[6],
        //     data[7]
        // ])
        console.log("Swal data", data)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-1',
                cancelButton: 'btn btn-danger mx-1'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(data);
                socket.emit('deleteRecord', data);
                $(this).closest('tr').remove();

                //   console.log(data)
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Record deleted successfully!',
                    'success'
                )
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })

    });
}

const swalConfirmation = data => {
    console.log("Swal data", data)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success mx-1',
            cancelButton: 'btn btn-danger mx-1'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, accept it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(data);
            socket.emit('deleteRecord', data);
            //   console.log(data)
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Record deleted successfully!',
                'success'
            )
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}


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


