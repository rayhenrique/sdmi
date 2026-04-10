<?php

namespace App\Http\Controllers;

use App\Enums\TipoAtendimento;
use App\Models\Atendimento;
use App\Models\Caso;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AtendimentoController extends Controller
{
    public function store(Request $request, Caso $caso): RedirectResponse
    {
        $validated = $request->validate([
            'tipo_atendimento' => 'required|string',
            'data_atendimento' => 'required|date',
            'relato' => 'required|string|min:10',
            'evolucao' => 'nullable|string',
            'encaminhamento_realizado' => 'nullable|string',
            'observacoes' => 'nullable|string',
            'status_pos_atendimento' => 'nullable|string',
        ]);

        $validated['caso_id'] = $caso->id;
        $validated['profissional_id'] = auth()->id();

        Atendimento::create($validated);

        // Update case status if provided
        if (!empty($validated['status_pos_atendimento'])) {
            $caso->update(['status' => $validated['status_pos_atendimento']]);
        }

        return redirect()->route('casos.show', $caso)
            ->with('success', 'Atendimento registrado com sucesso.');
    }
}
