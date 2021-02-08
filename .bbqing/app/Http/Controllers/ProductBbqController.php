<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Client\Response;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Exception;

class ProductBbqController extends Controller
{

    private $api_endpoint = "http://localhost:3001/bbq/";

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
        
        $response = Http::get($this->api_endpoint);
        
        $response->json();
        $bbq = [];

        if($response->successful()){
            $response_array = json_decode($response, true);
            foreach($response_array as $key => $array){
                array_push($bbq, $array);
            }
        }

        // dd($bbq);

        return view('productbbq.index', ["bbq" => $bbq]);
    }
}
