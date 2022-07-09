<?php

namespace App\Http\Controllers\API;

use App\Models\Celebrity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CelebrityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Celebrity::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'description' => 'required|string|min:2',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        } else {
            $celebrity = new Celebrity;
            $celebrity->firstname = $request->firstname;
            $celebrity->lastname = $request->lastname;
            $celebrity->description = $request->description;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time() . '.' . $image->getClientOriginalExtension();
                $image->move('uploads/celebrity', $name);
                $celebrity->image = 'uploads/celebrity/' . $name;
            }

            $celebrity->save();


            return response()->json([
                'status' => 200,
                'message' => 'Profile\'s Celebrity created successfully',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $celebrity = Celebrity::find($id);
        if ($celebrity) {
            return response()->json([
                'status' => 200,
                'data' => $celebrity,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Celebrity not found',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'description' => 'required|string|min:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        } else {
            $celebrity = Celebrity::find($id);
            if ($celebrity) {
                $celebrity->firstname = $request->firstname;
                $celebrity->lastname = $request->lastname;
                $celebrity->description = $request->description;

                if ($request->hasFile('image')) {
                    $path = $celebrity->image;
                    if (file_exists($path)) {
                        unlink($path);
                    }
                    $image = $request->file('image');
                    $name = time() . '.' . $image->getClientOriginalExtension();
                    $image->move('uploads/celebrity', $name);
                    $celebrity->image = 'uploads/celebrity/' . $name;
                }

                $celebrity->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Profile\'s Celebrity updated successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Celebrity not found',
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $celebrity = Celebrity::find($id);
        if ($celebrity) {
            $path = $celebrity->image;
            if (file_exists($path)) {
                unlink($path);
            }
            $celebrity->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Profile\'s Celebrity deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Celebrity not found',
            ]);
        }
    }
}
