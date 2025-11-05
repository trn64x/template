'use client';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import {useEffect, useState} from 'react'
const ModeToggle = () => {
    const[mount,setMount] = useState(false);
    useEffect(()=> {
setMount(true);
    },[])
    const {theme,setTheme} = useTheme();
    if(!mount) return
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className="focus-visible:ring-0 focus-visible:ring-offset-0">
                {theme === "system" ? (<SunMoon></SunMoon>): theme === 'dark' ? <MoonIcon></MoonIcon> : (<SunIcon></SunIcon>) }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuCheckboxItem checked={theme === 'system'} onClick={()=> setTheme('system')}>System</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'dark'} onClick={()=> setTheme('dark')}>Dark</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'light'} onClick={()=> setTheme('light')}>Light</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
 
export default ModeToggle;