import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//patch route
export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if(!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }
        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return NextResponse.json(store, { status: 200 })

    } catch (error) {
        console.log('STORE_PATCH', error);
    }
}

//delete route
export async function DELETE (
    _req: Request,
    { params }: { params: { storeId: string } } //destructuring params from the request
) {
    try {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if(!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }
        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });

        return NextResponse.json(store, { status: 200 })

    } catch (error) {
        console.log('STORE_DELETE', error);
    }
}

export async function GET (
    _req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const stores = await prismadb.store.findUnique({
            where: {
                id: params.storeId,
            }
        });

        return NextResponse.json(stores, { status: 200 });
    } catch (error) {
        console.log('STORE_GET', error);
    }
}