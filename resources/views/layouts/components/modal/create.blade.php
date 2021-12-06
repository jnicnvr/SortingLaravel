<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <!-- general form elements -->
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add New Data</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form method="POST" action="{{ route('addNewList') }}">
                    @csrf
                    <div class="card-body">
                        <div class="form-group">
                            <label for="fname">First Name</label>
                            <input type="text" class="form-control" id="fname" name="fname"
                                placeholder="Enter First Name">
                        </div>
                        <div class="form-group">
                            <label for="mname">Middle Name</label>
                            <input type="text" class="form-control" id="mname" name="mname"
                                placeholder="Enter Middle Name">
                        </div>
                        <div class="form-group">
                            <label for="lname">Last Name</label>
                            <input type="text" class="form-control" id="lname" name="lname"
                                placeholder="Enter Last Name">
                        </div>
                        <div class="form-group">
                            <label for="suffix">Suffix</label>
                            <input type="text" class="form-control" id="suffix" name="suffix"
                                placeholder="Enter Suffix">
                        </div>
                        <div class="form-group">
                            <label for="contact_no">Contact Number</label>
                            <input type="tel" class="form-control" id="contact_no" name="contact_no"
                                placeholder="Enter Contact Number">
                        </div>
                        <div class="form-group">
                            <label for="precinct_no">Precinct Number</label>
                            <input type="number" class="form-control" id="precinct_no" name="precinct_no"
                                placeholder="Enter Precinct Number">
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" name="address"
                                placeholder="Enter Address">
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
            <!-- /.card -->
            <!-- general form elements -->
        </div>
    </div>
</div>