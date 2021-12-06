<?php

namespace App\Http\Controllers;

use App\Models\Leader;
use Illuminate\Http\Request;

class LeadersController extends Controller
{
  
    public function index()
    {
        return view('admin.sorting.index');
    }

    public function deleted_record()
    {        
        return view('admin.softdelete.index');
    }
    public function masterlist()
    {        
        return view('admin.masterlist.index');
    }
    public function upload_file(){

        if($_FILES['file']['size']>0){
            if($_FILES['file']['size']<=5000000000){
                if(move_uploaded_file($_FILES['file']['tmp_name'],public_path('img')."/".$_FILES['file']['name'])){
                    $publicpath = public_path('img')."/".$_FILES['file']['name'];
                    $this->data['publicpath']= $publicpath;
                    ?>                   
                    <?php
                }
            }
        }
    }
    
    public function addNewList(Leader $leader, Request $request)
    {
        request()->validate([
            'fname' => 'required',
            'mname' => 'required',
            'lname' => 'required',
            'contact_no' => 'required',
            'precinct_no' => 'required',
            'address' => 'required'
        ]);

        Leader::create([
            'fname' => request('fname'),
            'mname' => request('mname'),
            'lname' => request('lname'),
            'suffix' => request('suffix'),
            'contact_no' => request('contact_no'),
            'precinct_no' => request('precinct_no'),
            'address' => request('address')
        ]);

        return redirect('/masterlist');
    }

    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

  
    public function edit($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        //
    }

   
    public function destroy($id)
    {
        //
    }
}
