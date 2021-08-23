<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Atoms;
use Illuminate\Http\Request;

/** Контроллер для поиска связанных статей с Атомом(ключевым словом) и отдачи статьи по ID */
class ApiSearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->get('atom');
        $atoms = Atoms::where('title', '=', $query)->get();
        foreach ($atoms as $atom) {
            return $atom->articles->toJson();
        }
    }

    public function searchByID(Request $request, $id)
    {
        return Articles::find($id);
    }
}
