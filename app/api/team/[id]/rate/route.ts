import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Rate } from '@/app/types/common';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('rates')
      .select('*')
      .eq('team_member_id', id)
      .single();

    // Se o erro for PGRST116 (nenhum resultado encontrado), retorna null
    if (error?.code === 'PGRST116') {
      return NextResponse.json(null);
    }

    // Para outros tipos de erro, mantém o tratamento de erro
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch member rates', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member rates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    console.log('Corpo da requisição recebido:', body);
    
    const { rates } = body;

    if (!rates) {
      return NextResponse.json(
        { error: 'Rate data is required' },
        { status: 400 }
      );
    }

    // Validação básica da estrutura do rate
    if (!rates.weekdays || !rates.saturday || !rates.sunday) {
      return NextResponse.json(
        { error: 'Invalid rate structure. Must include weekdays, saturday, and sunday' },
        { status: 400 }
      );
    }

    // Primeiro, verifica se já existe um rate para este membro
    const { data: existingRate, error: fetchError } = await supabase
      .from('rates')
      .select('*')
      .eq('team_member_id', id)
      .single();

    console.log('Rate existente:', existingRate);
    console.log('Erro na busca:', fetchError);

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Supabase error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to check existing rate', details: fetchError.message },
        { status: 500 }
      );
    }

    // Prepara os dados para inserção/atualização
    const rateData = {
      team_member_id: id,
      rates: rates
    };

    console.log('Dados preparados para salvar:', rateData);

    let result;
    if (existingRate) {
      // Se existe, atualiza
      result = await supabase
        .from('rates')
        .update(rateData)
        .eq('team_member_id', id)
        .select()
        .single();
    } else {
      // Se não existe, cria novo
      result = await supabase
        .from('rates')
        .insert([rateData])
        .select()
        .single();
    }

    console.log('Resultado da operação:', result);

    if (result.error) {
      console.error('Supabase error:', result.error);
      return NextResponse.json(
        { error: 'Failed to update rates', details: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Failed to update rates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('rates')
      .delete()
      .eq('team_member_id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete rates', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Failed to delete rates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 