<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPerfil
{
    public function handle(Request $request, Closure $next, string ...$perfis): Response
    {
        $user = $request->user();

        if (!$user || !$user->ativo) {
            auth()->logout();
            return redirect()->route('login')->with('error', 'Usuário inativo.');
        }

        if (!empty($perfis) && !in_array($user->perfil->value, $perfis)) {
            abort(403, 'Acesso não autorizado.');
        }

        return $next($request);
    }
}
