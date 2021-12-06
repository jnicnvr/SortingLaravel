@push('styles')
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/select/1.3.3/css/select.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.bootstrap4.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/datetime/1.0.3/css/dataTables.dateTime.min.css">
@endpush
<div class="p-2">
    <div class="card border border-gray-500">
        <div class="card-header pb-0 border-b-5 border-gray-500">
            <div class="card-title">
                <i class="icon fas fa-check pr-2 text-white"></i>
                <label for="RideStat" class="card-text text-md">{{__('Data Sorting')}}</label>
                <!-- <button>{{__('Add Rider')}}</button> -->
            </div>
        </div>
        <div class="card-body">

            <div class="row mb-4">
                <div class="col-4">
                    <label for="cars">Filter :</label>
                    <select class="form-control select2" name="filter" id="filter" onchange="isFilteredData()">
                        <option value="fname">First Name</option>
                        <option value="lname">Last Name</option>
                        <option value="contact_no">Contact Number</option>
                        <option value="address">Address</option>
                    </select>
                </div>
                <div class="col-8">
                    <!-- <div class="form-group">
                        <label class ="" for="cars">Duplicated First Name :</label>
                    </div>                    -->
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-sm table-striped table-bordered w-full nowrap" id="datatable"></table>
            </div>
        </div>
    </div>
</div>


@push('scripts')
<script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.bootstrap4.min.js"></script>
<script src="https://cdn.datatables.net/select/1.3.3/js/dataTables.select.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.colVis.min.js"></script>
<script src="https://cdn.datatables.net/datetime/1.0.3/js/dataTables.dateTime.min.js"></script>
<script src="http://localhost:8080/socket.io/socket.io.js"></script>
<script src="/js/admin/sorting.js"></script>
@endpush