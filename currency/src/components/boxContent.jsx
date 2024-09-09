import Select from "./select";
import Amount from "./amount";
import { useEffect, useState } from "react";
export default function BoxContent() {
    return (
        <>
            <div className="flex justify-between">
                <Select title={"From"} />
                <Select title={"To"} />
            </div>
            <Amount/>
        </>
    );
}