<?php

namespace App\Http\Controllers;

use App\Models\Roullote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class RoulloteController extends Controller
{   


    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('roullotes.index', ["roullotes" => Roullote::all()->sortByDesc('id')]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('roullotes.create'); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $this->validateInputs($request);
        
        if ($validator->fails()) {
            return redirect()->route('roullotes.create')->withErrors($validator->errors());
        }

        $roullote = new Roullote;
        $roullote->name = $request->get('name');
        $roullote->address = $request->get('address');
        $roullote->phone = $request->get('phone');
        $roullote->foto = $this->saveFoto($request, uniqid('foto_')); // Matos: averiguar a foto
        $roullote->save();

        return redirect()->route('roullotes.index')->with('message', 'Roullote inserido com sucesso');    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Roullote  $roullote
     * @return \Illuminate\Http\Response
     */
    public function show(Roullote $roullote)
    {
        return view('roullotes.view', ['roullote' => $roullote]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Roullote  $roullote
     * @return \Illuminate\Http\Response
     */
    public function edit(Roullote $roullote)
    {
        // if(Auth::user()->can('edit_roullotes', $roullote)) {
        //     return view('roullotes.edit', ['roullote' => $roullote]);
        // }
        // return redirect()->route('roullotes.index');
       
        return view('roullotes.edit', ['roullote' => $roullote]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Roullote  $roullote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Roullote $roullote)
    {
        $validator = $this->validateInputs($request);
        
        if ($validator->fails()) {
            return redirect()->route('roullotes.edit', $roullote->id)->withErrors($validator->errors());
        }

        $roullote->name = $request->get('name');
        $roullote->address = $request->get('address');
        $roullote->phone = $request->get('phone');
        $roullote->foto = $this->saveFoto($request, uniqid('foto_'));
        $roullote->save();

        return redirect()->route('roullotes.index')->with('message', 'Roullote atualizado com sucesso');  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Roullote  $roullote
     * @return \Illuminate\Http\Response
     */
    public function destroy(Roullote $roullote)
    {
        $roullote->delete();

        return redirect()->route('roullotes.index')->with('message', 'Roullote apagado com sucesso');
    }

    // Matos: input validation
    private function validateInputs(Request $request)
    {
        $rules = array(
            'name' => 'required',
            'address' => 'required',
            'phone' => 'required|numeric',
            'foto' => 'mimes:jpeg,png|max:1014'
        );

        return Validator::make($request->all(), $rules);
    }


    // Matos: saveFoto
    private function saveFoto($request, $name): ?string
    {
        if ($request->hasFile('foto')) {
            if ($request->file('foto')->isValid()) {
                $file = $request->file('foto');
                $extension = $file->extension();
                $file->storeAs('public', $name.".".$extension);
                return asset("storage/".$name.".".$extension);
            }
            throw new Exception('Uploaded file not a valid image');
        }
        return null;
    }
}
