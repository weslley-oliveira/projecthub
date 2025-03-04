import { NextResponse } from "next/server";
import { mockCustomers, addCustomer, updateCustomer, deleteCustomer } from "@/app/data/customers/mockCustomers";

// GET /api/customers
export async function GET() {
  try {
    return NextResponse.json(mockCustomers);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}

// POST /api/customers
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCustomer = addCustomer(body);
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}

// PUT /api/customers
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...customerData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do cliente é obrigatório" },
        { status: 400 }
      );
    }

    const updatedCustomer = updateCustomer(id, customerData);
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

// DELETE /api/customers
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do cliente é obrigatório" },
        { status: 400 }
      );
    }

    const success = deleteCustomer(id);
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