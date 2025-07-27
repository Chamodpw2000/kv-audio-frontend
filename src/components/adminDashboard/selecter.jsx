import React, { useEffect, useState } from 'react';
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import axios from 'axios';



const Selecter = ({ selections, setSelections }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function fetchItemCodes() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {

                    return;
                }
                
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/analytics/itemcodes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                

                setProducts(response.data || []);
            } catch (error) {
                console.error("Error fetching item codes:", error);
                setProducts([]);
            }
        }

        fetchItemCodes();

    }, [])

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
                        {products && Array.isArray(products) && products
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
