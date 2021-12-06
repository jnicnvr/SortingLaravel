<div class="modal fade" id="import">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Upload CSV</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">            
           
        </div>
        <div class="modal-footer justify-content-between">
            <form method="POST" action="{{ route('upload_file') }}" enctype="multipart/form-data" target="iframe" >
                @csrf
                <input type="file" class="" id="file" value="Choose File" name="file"/>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" onclick="importcsv()">Upload</button>
            </form>
            <iframe style="display: none;" name = "iframe"></iframe>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->

  