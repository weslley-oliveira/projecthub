import { NextResponse } from "next/server";
import { getCustomerById, updateCustomer } from "@/app/data/customers/mockCustomers";
import { Rate } from "@/app/data/customers/mockCustomers";

// PUT /api/customers/[id]/rate
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { rate } = body as { rate: Rate };

    const customer = getCustomerById(params.id);
    if (!customer) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    const updatedCustomer = updateCustomer(params.id, { rate });
    if (!updatedCustomer) {
      return NextResponse.json(
        { error: "Erro ao atualizar taxas do cliente" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar taxas do cliente" },
      { status: 500 }
    );
  }
} 