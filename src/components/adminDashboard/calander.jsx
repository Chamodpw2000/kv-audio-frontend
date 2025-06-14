import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export function Calander({ selections, setSelections }) {
    const [dateRange, setDateRange] = useState({
        from: new Date(2025, 5, 12),
        to: new Date(2025, 5, 18)
    });

    const handleReset = () => {
        // Reset both local state and parent state
        setDateRange({ from: null, to: null });
        setSelections((prev) => ({ 
            ...prev, 
            dateRange: { from: null, to: null } 
        }));
    };

    return (
        <div className="space-y-4 flex items-center justify-center flex-col w-full">
            <Calendar
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => {
                    if (range && range.from && range.to) {
                        setDateRange({
                            from: range.from,
                            to: range.to
                        });
                        setSelections((prev) => ({
                            ...prev,
                            dateRange: {
                                from: range.from,
                                to: range.to
                            }
                        }));
                    } else {
                        setDateRange({ from: null, to: null });
                        setSelections((prev) => ({
                            ...prev,
                            dateRange: { from: null, to: null }
                        }));
                    }
                }}
                numberOfMonths={2}
                className="rounded-lg border shadow-sm"
            />
            <div className='w-full flex items-center justify-center'>
                <Button onClick={handleReset}>Reset</Button>
            </div>
            {dateRange.from && dateRange.to && (
                <p className="text-sm text-muted-foreground text-center py-5">
                    Selected:{" "}
                    <span className="font-medium">
                        {dateRange.from.toDateString()} to {dateRange.to.toDateString()}
                    </span>
                </p>
            )}
        </div>
    );
}

export default Calander;
