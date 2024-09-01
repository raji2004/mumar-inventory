'use client';

import { Button } from "./ui/button";
import * as XLSX from 'xlsx';
import { Product,Supplier} from "@/lib/type"

export const DownloadFile =  ({products}:{products:Product[]}) => {
    const downloadExcel = () => {   
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    
        // Generate buffer
        XLSX.writeFile(workbook, 'products.xlsx'); // Filename for the download
    };
    return  <Button onClick={downloadExcel} className=" bg-white text-black border hover:text-white ">Download All</Button>
}
export const DownloadSuplier =  ({supplier}:{supplier:Supplier[]}) => {
    const downloadExcel = () => {   
        const worksheet = XLSX.utils.json_to_sheet(supplier);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'supplier');
    
        // Generate buffer
        XLSX.writeFile(workbook, 'products.xlsx'); // Filename for the download
    };
    return  <Button onClick={downloadExcel} className=" bg-white text-black border hover:text-white ">Download All</Button>
}