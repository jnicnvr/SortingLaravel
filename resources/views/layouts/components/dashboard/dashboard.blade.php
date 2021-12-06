<h2>Dashboard</h2>
<div class="row">
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
            <div class="inner">
                <h3 id="total">0</h3>

                <p>Total Records</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <!-- <div class="col-lg-3 col-6">
        <div class="small-box bg-success">
            <div class="inner">
                <h3 id="duplicated">0</h3>

                <p>Duplicated Records</p>
            </div>
            <div class="icon">
                <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div> -->
    <!-- ./col -->
</div>
<!-- /.row -->


@push('scripts')
<script src="http://localhost:8080/socket.io/socket.io.js"></script>
<script src="/js/admin/dashboard.js"></script>
@endpush