import { NextResponse } from "next/server";
import { getCustomerById, updateCustomer, deleteCustomer } from "@/app/data/customers/mockCustomers";

// GET /api/customers/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = getCustomerById(params.id);
    if (!customer) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar detalhes do cliente" },
      { status: 500 }
    );
  }
}

// PUT /api/customers/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedCustomer = updateCustomer(params.id, body);
    
    if (!updatedCustomer) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar cliente" },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteCustomer(params.id);
    if (!success) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir cliente" },
      { status: 500 }
    );
  }
} 