"use client"

import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/user-dash-store-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, 
         CommandEmpty, 
         CommandGroup, 
         CommandInput, 
         CommandItem, 
         CommandList, 
         CommandSeparator 
        } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
};

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    console.log("Formatted Items:", formattedItems); // Add this console log statement

    const currentStore = formattedItems.find((store) => store.value === params.storeId);

    console.log("Current Store:", currentStore); // Add this console log statement

    console.log("Params:", params); // Add this console log statement

    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 oppacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className={cn(
                                        "text-sm cursor-default select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50]",)}
                                >  
                                    <StoreIcon className="mr-2 h-5 w-5"/>
                                    {store.label}
                                    <Check
                                        className={cn(
                                        "ml-auto h-4 w-4 cursor-default data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                        store.value === currentStore?.value ? "oppacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            )) }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.onOpen();
                                }}
                                className={cn(
                                    "text-sm cursor-default select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",)}
                            >
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};