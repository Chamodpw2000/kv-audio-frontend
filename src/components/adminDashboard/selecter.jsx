import React, { useState } from 'react';
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"

const products = [
    "Apple", "Banana", "Blueberry", "Grapes", "Pineapple", "Strawberry",
    "Watermelon", "Orange", "Kiwi", "Mango", "Peach", "Pear", "Plum",
    "Raspberry", "Blackberry", "Coconut", "Papaya"
];

const Selecter = ({ selections, setSelections }) => {

    const [selected, setSelected] = useState('');
    const [input, setInput] = useState('');

    const handleSelect = (product) => {
        setSelected(product);
        setInput(product);

        // Check if item already exists
        if (selections.items.includes(product)) {
            return; // Don't add duplicates
        }

        // Check limit before adding
        if (selections.items.length >= 6) {
            toast.error('You can only select up to 6 items.');
            return;
        }

        // Update selections
        setSelections((prev) => ({
            ...prev,
            items: [...prev.items, product]
        }));

        console.log('Selected items:', [...selections.items, product]);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center space-y-4">
            <Command>
                <CommandInput
                    placeholder="Search for a Product.."
                    value={input}
                    onValueChange={setInput}
                />
                <CommandList>
                    <CommandEmpty>No Product found...</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {products
                            .filter((product) => product.toLowerCase().includes(input.toLowerCase()))
                            .map((product) => (
                                <CommandItem
                                    key={product}
                                    onSelect={() => handleSelect(product)}
                                >
                                    {product}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </Command>

            {selections.items.length > 0 && (
                <p className="text-sm text-muted-foreground">
                    You selected: {selections.items.map((item, index) => (
                        <span key={index} className="font-medium">{item}{index < selections.items.length - 1 ? ', ' : ''}</span>
                    ))}
                </p>
            )}
            <div className='w-full flex items-center justify-center'>
                <Button onClick={() => { setSelections((prev) => ({ ...prev, items: [] })) }}>Reset</Button>

            </div>

        </div>
    );
};

export default Selecter;
